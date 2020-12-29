import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  Keyboard,
  Modal as ModalOrg,
  ScrollView,
  Image,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  Dimensions,
  Share,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import InputExpenseScreenStyles from '../../../styles/ExpenseScreenStyles/InputExpenseScreenStyles/InputExpenseScreenStyles';
import { bindActionCreators } from 'redux';
import { getApiListUserInTrip, saveTripIdInExpense } from '../../../actions/action';
import { BASEURL } from '../../../api/api';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { screenWidth, screenHeight } from '../../../constants/Dimensions';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalNotification from '../../components/ModalNotification';
import Modal from 'react-native-modal';
import ModalLoading from '../../components/ModalLoading';
import LottieView from 'lottie-react-native';
import { number2money } from '../../../constants/FunctionCommon';

function mapStateToProps(state) {
  return {
    listUserInTrip: state.listUserInTrip.listUserInTrip,
    author: state.dataUser.dataUser._id,
  };
}

type Props = {
  author?: any;
  navigation?: any;
  getListUserInTrip?: any;
  listUserInTrip?: any;
  saveTripId?: any;
};

type States = {
  description?: string;
  money?: string;
  checkDescription?: boolean;
  checkMoney?: boolean;
  checked?: boolean;
  isCheckExpense?: boolean;
  isCheckLocation?: boolean;
  isCheckImage?: boolean;
  latMarker?: number;
  longMarker?: number;
  isEnableAddLocation?: boolean;
  address?: string;
  listImageAdd?: any[];
  isModelVisible?: boolean;
  modalNotification?: {
    modalVisible?: boolean;
    type?: string;
    title?: string;
    description?: string;
    onPress?: () => void;
  };
  modalVisiblePickImage: boolean;
  isLoading?: boolean;
  visibleModalShare?: boolean;
  dataShare?: {
    imgId?: string;
    locationId?: string;
  };
};

const SAVE_SUCCESS = 'Lưu thông tin thành công';
const ASPECT_RATIO = screenWidth / (screenHeight / 1.97);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// Check platform android set flag animation layout
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class InputExpenseScreen extends Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      money: '',
      checkDescription: false,
      checkMoney: false,
      checked: false,
      isCheckExpense: false,
      isCheckLocation: false,
      isCheckImage: false,
      latMarker: 0,
      longMarker: 0,
      isEnableAddLocation: false,
      address: '',
      listImageAdd: [],
      isModelVisible: false,
      modalNotification: {
        modalVisible: false,
        type: 'success',
        title: '',
        description: '',
        onPress: () => {},
      },
      modalVisiblePickImage: false,
      isLoading: false,
      visibleModalShare: false,
      dataShare: {
        imgId: '',
        locationId: '',
      },
    };
  }

  static navigationOptions = () => {
    return {
      header: null,
    };
  };
  _navListener: any;
  idPayer = '';
  listTypeUser = [];

  async componentDidMount() {
    // set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('light-content');
      let data = this.props.navigation.getParam('dataGroup', {});
      this.props.getListUserInTrip(data._id);
      let isCheck = this.props.navigation.getParam('isCheck', '1');
      Platform.OS === 'android' && LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (isCheck === '1') this.setState({ isCheckExpense: true });
      else if (isCheck === '2') {
        this.onGetMyCurrentLocation();
      } else this.setState({ isCheckImage: true });
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  // send list_user to split screen (output money)
  async prepareSendListUserToSplit(listTypeUser, idPayer) {
    let list_user = await this.createListUser(listTypeUser, idPayer);
    //get user payer
    let Payer;
    let userPayer = [];
    await list_user.forEach((value) => {
      if (value.type > 0) {
        Payer = value.user_id;
      }
    });
    await this.props.listUserInTrip.forEach((value) => {
      if (value.user_id._id == Payer) {
        userPayer = value;
      }
    });
    this.props.navigation.navigate('ExpenseMoreOptionScreen', {
      list_user: list_user,
      listUser: this.props.listUserInTrip,
      totalMoney: this.state.money.replace(/[^0-9]+/g, ''),
      userPayer: userPayer,
    });
  }

  // send list_user to choose multiple people (input money)
  async prepareSendListUserToChoose(listTypeUser, idPayer) {
    let list_user = await this.createListUser(listTypeUser, idPayer);
    this.props.navigation.navigate('ChoosePayerScreen', {
      list_user: list_user,
      listUser: this.props.listUserInTrip,
      totalMoney: this.state.money.replace(/[^0-9]+/g, ''),
    });
  }

  checkDescription(text) {
    if (text === '') {
      this.setState({
        description: text,
        checkDescription: false,
      });
    } else {
      this.setState({
        description: text,
        checkDescription: true,
      });
    }
  }

  checkMoney(text) {
    let onlyNumber = text.replace(/[^0-9]+/g, '');
    if (onlyNumber === '') {
      this.setState({
        money: onlyNumber,
        checkMoney: false,
      });
    } else {
      this.setState({
        money: number2money(parseInt(onlyNumber)),
        checkMoney: true,
      });
    }
  }

  async createListUser(listTypeUser, idPayer) {
    const Money = parseInt(this.state.money.replace(/[^0-9]+/g, ''));
    var Payer = idPayer === '' ? this.props.author : idPayer;
    var list_user = [];
    const listUser = this.props.listUserInTrip;
    const amount_user = Math.round(Money / listUser.length);
    if (listTypeUser.length > 0) {
      list_user = listTypeUser;
    } else {
      await listUser.forEach((value) => {
        if (value.user_id._id === Payer) {
          list_user.push({
            type: Money,
            amount_user: amount_user,
            user_id: value.user_id._id,
          });
        } else {
          list_user.push({
            type: -1,
            amount_user: amount_user,
            user_id: value.user_id._id,
          });
        }
      });
    }
    return list_user;
  }

  async createTransaction(tripId, listTypeUser, idPayer) {
    Keyboard.dismiss();
    const Money = parseInt(this.state.money.replace(/[^0-9]+/g, ''));
    const Description = this.state.description;
    var list_user = await this.createListUser(listTypeUser, idPayer);
    if (this.state.checkDescription !== this.state.checkMoney) {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Thông tin không hợp lệ.',
          description: 'Vui lòng nhập đầy đủ thông tin.',
          modalVisible: true,
        },
      });
    } else {
      this.setState({ isLoading: true });
      var bodyFormData = new FormData();
      var dataExpense = {};
      var dataLocation = {};
      if (this.state.checkDescription) {
        dataExpense = {
          name: Description,
          author: this.props.author,
          amount: Money,
          trip_id: tripId,
          list_user: list_user,
        };
      }
      if (this.state.isEnableAddLocation) {
        dataLocation = {
          author: this.props.author,
          latitude: this.state.latMarker,
          longitude: this.state.longMarker,
          address: this.state.address,
        };
      }
      if (this.state.listImageAdd?.length > 0) {
        this.state.listImageAdd.forEach((image) => {
          let photo = {
            uri: image.url,
            name: image.name,
            type: image.type,
          };
          bodyFormData.append('image', photo);
        });
      }

      bodyFormData.append('dataExpense', JSON.stringify(dataExpense));
      bodyFormData.append('dataLocation', JSON.stringify(dataLocation));
      bodyFormData.append('trip_id', tripId);
      fetch(`${BASEURL}/api/transaction/insert_new_transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyFormData,
      })
        .then((response) => response.json())
        .then(async (res) => {
          if (res.result === 'ok') {
            this.setInputExpenseAgain();
            await this.props.saveTripId(tripId);
            if (res?.idForShare && res?.idForShare.imgId.length > 0) {
              this.setState({
                dataShare: res.idForShare,
                isLoading: false,
                visibleModalShare: true,
              });
            } else {
              this.setState({
                isLoading: false,
                modalNotification: {
                  type: 'success',
                  title: SAVE_SUCCESS,
                  description: 'Thông tin của bạn đã được lưu thành công.',
                  modalVisible: true,
                },
              });
            }
          } else {
            this.setState({
              isLoading: false,
              modalNotification: {
                type: 'error',
                title: 'Đã xảy ra lỗi',
                description: 'Lưu thông tin không thành công, xin vui lòng thử lại.',
                modalVisible: true,
              },
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            modalNotification: {
              type: 'error',
              title: 'Đã xảy ra lỗi',
              description: error,
              modalVisible: true,
            },
          });
        });
    }
  }

  onActionModal = () => {
    this.setState({ modalNotification: { modalVisible: false } });
    if (this.state.modalNotification.title == SAVE_SUCCESS) {
      this.props.navigation.goBack();
    }
  };

  async setInputExpenseAgain() {
    this.setState({
      description: '',
      money: '',
      checkDescription: false,
      checkMoney: false,
    });
    await this.props.navigation.setParams({ listTypeUser: [], IdPayer: '' });
  }

  async onChangeMarker(e) {
    await this.setState({
      latMarker: e.nativeEvent.coordinate.latitude,
      longMarker: e.nativeEvent.coordinate.longitude,
    });
    let address = await Location.reverseGeocodeAsync({
      latitude: this.state.latMarker,
      longitude: this.state.longMarker,
    });
    this.setState({
      address:
        (address[0]?.street ? address[0]?.street + ', ' : '') +
        (address[0]?.city ? address[0]?.city + ', ' : '') +
        (address[0]?.region ? address[0]?.region : ''),
    });
  }

  async onShowHideViewLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        modalNotification: {
          type: 'warning',
          title: 'Bạn đã không cấp quyền sử dụng vị trí',
          description: 'Bạn không thể sử dụng tính năng vị trí.',
          modalVisible: true,
        },
      });
    } else {
      Platform.OS === 'android' && LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (this.state.isCheckLocation) this.setState({ isCheckLocation: false });
      else {
        if (!this.state.latMarker) {
          let currentPosition = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          let address = await Location.reverseGeocodeAsync({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
          });
          this.setState({
            isCheckLocation: true,
            isEnableAddLocation: true,
            latMarker: currentPosition.coords.latitude,
            longMarker: currentPosition.coords.longitude,
            address:
              (address[0]?.street ? address[0]?.street + ', ' : '') +
              (address[0]?.city ? address[0]?.city + ', ' : '') +
              (address[0]?.region ? address[0]?.region : ''),
          });
        } else this.setState({ isCheckLocation: true });
      }
    }
  }

  async onGetMyCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        modalNotification: {
          type: 'warning',
          title: 'Bạn đã không cấp quyền sử dụng vị trí',
          description: 'Bạn không thể sử dụng tính năng vị trí.',
          modalVisible: true,
        },
      });
    } else {
      let currentPosition = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let address = await Location.reverseGeocodeAsync({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      Platform.OS === 'android' && LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        isCheckLocation: true,
        isEnableAddLocation: true,
        latMarker: currentPosition.coords.latitude,
        longMarker: currentPosition.coords.longitude,
        address:
          (address[0]?.street ? address[0]?.street + ', ' : '') +
          (address[0]?.city ? address[0]?.city + ', ' : '') +
          (address[0]?.region ? address[0]?.region : ''),
      });
    }
  }

  _pickImage = async () => {
    this.toggleModalPickImage();
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      this.setState({
        modalNotification: {
          type: 'warning',
          title: 'Bạn chưa cấp quyền sử dụng thư viện',
          description: 'Bạn không thể sử dụng tính năng chọn ảnh.',
          modalVisible: true,
        },
      });
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let listImage = this.state.listImageAdd.concat({
          id: this.state.listImageAdd?.length + 1,
          url: localUri,
          name: filename,
          type,
        });
        this.setState({ listImageAdd: listImage });
      }
    }
  };

  _pickImageCamera = async () => {
    this.toggleModalPickImage();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      this.setState({
        modalNotification: {
          type: 'warning',
          title: 'Bạn chưa cấp quyền sử dụng camera',
          description: 'Bạn không thể sử dụng tính năng chụp ảnh.',
          modalVisible: true,
        },
      });
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let listImage = this.state.listImageAdd.concat({
          id: this.state.listImageAdd?.length + 1,
          url: localUri,
          name: filename,
          type,
        });
        this.setState({ listImageAdd: listImage });
      }
    }
  };

  _deleteImage = (index) => {
    let listImage = [...this.state.listImageAdd];
    listImage.splice(index, 1);
    this.setState({ listImageAdd: listImage });
  };

  toggleModal = () => {
    this.setState({ isModelVisible: !this.state.isModelVisible });
  };

  toggleModalPickImage = () => {
    this.setState({ modalVisiblePickImage: !this.state.modalVisiblePickImage });
  };

  toggleExpense = () => {
    Platform.OS === 'android' && LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isCheckExpense: !this.state.isCheckExpense });
  };

  toggleImage = () => {
    Platform.OS === 'android' && LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isCheckImage: !this.state.isCheckImage });
  };

  onPressShare = async () => {
    this.setState({
      visibleModalShare: false,
      listImageAdd: [],
      isEnableAddLocation: false,
      isCheckImage: false,
      isCheckLocation: false,
    }, async () => {
      try {
        const result = await Share.share(
          {
            ...Platform.select({
              ios: {
                message: 'Chia sẻ một khoảnh khắc : ',
                url: `${BASEURL}/api/index/shareSocial/${this.props.author}/${this.state.dataShare.imgId}/${this.state.dataShare.locationId}`,
              },
              android: {
                message: `${BASEURL}/api/index/shareSocial/${this.props.author}/${this.state.dataShare.imgId}/${this.state.dataShare.locationId}`,
              },
            }),
            title: 'Wow, did you see that?',
          },
          {
            ...Platform.select({
              ios: {
                // iOS only:
                excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
              },
              android: {
                // Android only:
                dialogTitle: 'Chia sẻ với',
              },
            }),
          },
        );
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    });
  };

  handleSelectInput = () => {
    Keyboard.dismiss();
    if (this.state.checkDescription && this.state.checkMoney) {
      this.prepareSendListUserToChoose(this.listTypeUser, this.idPayer);
    } else {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Đã có lỗi xảy ra',
          description: 'Hãy nhập đầy đủ thông tin chi phí và thử lại.',
          modalVisible: true,
        },
      })
    }
  }

  handleSelectOutput = () => {
    Keyboard.dismiss();
    if (this.state.checkDescription && this.state.checkMoney) {
      this.prepareSendListUserToSplit(this.listTypeUser, this.idPayer);
    } else {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Đã có lỗi xảy ra',
          description: 'Hãy nhập đầy đủ thông tin chi phí và thử lại.',
          modalVisible: true,
        },
      })
    }
  }

  render() {
    const { navigation } = this.props;
    this.listTypeUser = navigation.getParam('listTypeUser', []);
    this.idPayer = this.props.navigation.getParam('IdPayer', '');
    var Group = navigation.getParam('dataGroup', {});
    return (
      <View style={InputExpenseScreenStyles.container}>
        <ModalLoading isVisible={this.state.isLoading} />
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={this.onActionModal}
        />
        {/* view modal share */}
        <Modal
          avoidKeyboard
          animationIn="zoomIn"
          animationOut="fadeOut"
          animationOutTiming={10}
          isVisible={this.state.visibleModalShare}
          style={InputExpenseScreenStyles.mainModalShare}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
        >
          <View style={InputExpenseScreenStyles.viewModalShare}>
            <LottieView
              style={InputExpenseScreenStyles.viewLottieShare}
              source={require('../../../../assets/lotties/share.json')}
              autoPlay
              loop
            />
            <Text style={InputExpenseScreenStyles.txtTitleShare}>Tải lên thành công</Text>
            <Text style={InputExpenseScreenStyles.descShare}>Bạn có muốn chia sẻ hình ảnh?</Text>
            <View style={InputExpenseScreenStyles.viewBtnShare}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={InputExpenseScreenStyles.btnShare}
              >
                <Text style={InputExpenseScreenStyles.txtBtnCancelShare}>Hủy bỏ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressShare} style={InputExpenseScreenStyles.btnShare}>
                <Text style={InputExpenseScreenStyles.txtBtnOKShare}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalVisiblePickImage}
          style={InputExpenseScreenStyles.mainModal}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
          onBackdropPress={this.toggleModalPickImage}
        >
          <View style={InputExpenseScreenStyles.viewModal}>
            <Text style={InputExpenseScreenStyles.txtTitleModal}>{`Thêm ảnh từ`}</Text>
            <View style={InputExpenseScreenStyles.viewBtnModal}>
              <TouchableOpacity
                onPress={this._pickImage}
                style={[InputExpenseScreenStyles.btnModal, { borderRightWidth: 1, borderRightColor: Colors.lavender }]}
              >
                <Text style={InputExpenseScreenStyles.txtBtnModal}>Thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImageCamera} style={InputExpenseScreenStyles.btnModal}>
                <Text style={InputExpenseScreenStyles.txtBtnModal}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <ModalOrg visible={this.state.isModelVisible} onRequestClose={this.toggleModal}>
          <ImageViewer useNativeDriver={true} imageUrls={this.state.listImageAdd} />
          <TouchableOpacity onPress={this.toggleModal} style={InputExpenseScreenStyles.viewDropModalZoom}>
            <Feather name={'x'} color={Colors.black} size={18} />
          </TouchableOpacity>
        </ModalOrg>
        {/* view header */}
        <View style={InputExpenseScreenStyles.containerHeader}>
          <View style={InputExpenseScreenStyles.header}>
            <TouchableOpacity
              style={InputExpenseScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={async () => {
                await this.props.navigation.setParams({ listTypeUser: [], IdPayer: '' });
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-close" size={45} color={Colors.white} />
            </TouchableOpacity>
            <Text style={InputExpenseScreenStyles.addContact}>Thêm danh mục</Text>
            <TouchableOpacity
              style={InputExpenseScreenStyles.save}
              activeOpacity={0.5}
              disabled={
                !this.state.checkDescription && !this.state.isEnableAddLocation && this.state.listImageAdd?.length === 0
              }
              onPress={() => {
                this.createTransaction(Group._id, this.listTypeUser, this.idPayer);
              }}
            >
              <Text
                style={[
                  InputExpenseScreenStyles.add,
                  {
                    opacity:
                      (this.state.checkDescription && this.state.checkMoney) ||
                      this.state.isEnableAddLocation ||
                      this.state.listImageAdd.length > 0
                        ? 1
                        : 0.6,
                  },
                ]}
              >
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* view add expense */}
          <TouchableOpacity onPress={this.toggleExpense} style={InputExpenseScreenStyles.viewRowItem}>
            <View style={InputExpenseScreenStyles.viewIconAndTitleItem}>
              <MaterialIcons name={'note-add'} color={Colors.tintColor} size={screenWidth / 14} />
              <Text style={InputExpenseScreenStyles.txtTitleItem}>Chi phí</Text>
            </View>
            <View style={this.state.isCheckExpense ? InputExpenseScreenStyles.viewIconRightItem : null}>
              <FontAwesome
                name={'angle-right'}
                color={this.state.checkDescription && this.state.checkMoney ? Colors.tintColor : Colors.gray}
                size={screenWidth / 12}
              />
            </View>
          </TouchableOpacity>
          {this.state.isCheckExpense ? (
            <View style={InputExpenseScreenStyles.sectionInput}>
              <View style={InputExpenseScreenStyles.viewSetAgain}>
                <TouchableOpacity
                  onPress={() => this.setInputExpenseAgain()}
                  style={InputExpenseScreenStyles.btnSetAgain}
                >
                  <Text style={InputExpenseScreenStyles.txtSetAgain}>Đặt lại</Text>
                  <FontAwesome name="repeat" size={10} color={Colors.gray} />
                </TouchableOpacity>
              </View>
              <View style={InputExpenseScreenStyles.sectionDescription}>
                <View style={InputExpenseScreenStyles.iconDescription}>
                  <MaterialIcons 
                    name="description" 
                    size={26} 
                    color={Colors.blackText} 
                    style={{ 
                      paddingHorizontal: screenWidth / 66,
                      paddingVertical: screenWidth / 90, 
                    }}
                  />
                </View>
                <View style={InputExpenseScreenStyles.inputDescription}>
                  <TextInput
                    onChangeText={(text) => this.checkDescription(text)}
                    style={InputExpenseScreenStyles.txtInputDescription}
                    placeholder="Nhập miêu tả"
                    value={this.state.description}
                    keyboardType="visible-password"
                    autoCorrect={false}
                    maxLength={100}
                    autoCapitalize={'words'}
                    underlineColorAndroid={'transparent'}
                  />
                  <View style={InputExpenseScreenStyles.underLineInput} />
                </View>
              </View>
              <View style={InputExpenseScreenStyles.sectionMoney}>
                <View style={InputExpenseScreenStyles.iconMoney}>
                  <Text style={InputExpenseScreenStyles.iconvnd}>đ</Text>
                </View>
                <View style={InputExpenseScreenStyles.inputMoney}>
                  <TextInput
                    onChangeText={(text) => this.checkMoney(text)}
                    style={InputExpenseScreenStyles.txtInputMoney}
                    value={this.state.money}
                    keyboardType="number-pad"
                    placeholder="0,00"
                    maxLength={13}
                    underlineColorAndroid={'transparent'}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  <View style={InputExpenseScreenStyles.underLineInput} />
                </View>
              </View>
              <View style={InputExpenseScreenStyles.btnSubmit}>
                <Text style={InputExpenseScreenStyles.text1}></Text>
                <View style={InputExpenseScreenStyles.button}>
                  <Text
                    style={InputExpenseScreenStyles.text2}
                    onPress={this.handleSelectInput}
                  >
                    Chọn thành viên thanh toán (đầu vào)
                  </Text>
                </View>
                <View style={InputExpenseScreenStyles.button}>
                  <Text
                    style={InputExpenseScreenStyles.text3}
                    onPress={this.handleSelectOutput}
                  >
                    Chọn thành viên tham gia (đầu ra)
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          <View style={InputExpenseScreenStyles.line} />
          {/* view add location */}
          <TouchableOpacity onPress={() => this.onShowHideViewLocation()} style={InputExpenseScreenStyles.viewRowItem}>
            <View style={InputExpenseScreenStyles.viewIconAndTitleItem}>
              <MaterialIcons name={'add-location'} color={Colors.splitWise} size={screenWidth / 14} />
              <Text style={InputExpenseScreenStyles.txtTitleItem}>Vị trí</Text>
            </View>
            <View style={this.state.isCheckLocation ? InputExpenseScreenStyles.viewIconRightItem : null}>
              <FontAwesome
                name={'angle-right'}
                color={this.state.isEnableAddLocation ? Colors.tintColor : Colors.gray}
                size={screenWidth / 12}
              />
            </View>
          </TouchableOpacity>
          {this.state.isCheckLocation ? (
            <View style={InputExpenseScreenStyles.viewMainAddLocation}>
              <View style={InputExpenseScreenStyles.viewHeaderAddLocation}>
                <View style={InputExpenseScreenStyles.viewEnableLocation}>
                  <Text style={InputExpenseScreenStyles.txtSetAgain}>Cho phép thêm vị trí</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({ isEnableAddLocation: !this.state.isEnableAddLocation })}
                    style={
                      this.state.isEnableAddLocation
                        ? InputExpenseScreenStyles.viewEnableSwitch
                        : InputExpenseScreenStyles.viewNoneEnableSwitch
                    }
                  >
                    <View style={InputExpenseScreenStyles.viewCircleSwitch} />
                  </TouchableOpacity>
                </View>
                <View style={InputExpenseScreenStyles.viewInputTitleLocation}>
                  <TextInput
                    onChangeText={(text) => this.setState({ address: text })}
                    style={InputExpenseScreenStyles.inputLocation}
                    placeholder="Nhập tên địa điểm"
                    value={this.state.address}
                  />
                  <View style={InputExpenseScreenStyles.underLineInput1} />
                </View>
              </View>
              <View style={InputExpenseScreenStyles.viewAddLocation}>
                <TouchableOpacity
                  onPress={() => this.onGetMyCurrentLocation()}
                  style={InputExpenseScreenStyles.viewGetCurrentLocation}
                >
                  <MaterialIcons name={'my-location'} color={Colors.black} size={screenWidth / 25} />
                </TouchableOpacity>
                <MapView
                  style={InputExpenseScreenStyles.mapStyle}
                  initialRegion={{
                    latitude: this.state.latMarker,
                    longitude: this.state.longMarker,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  onPress={(e) => this.onChangeMarker(e)}
                >
                  <Marker
                    draggable
                    onDragEnd={(e) => this.onChangeMarker(e)}
                    coordinate={{ latitude: this.state.latMarker, longitude: this.state.longMarker }}
                  >
                    <MaterialIcons name={'location-on'} color={Colors.splitWise} size={screenWidth / 12} />
                  </Marker>
                </MapView>
              </View>
            </View>
          ) : null}
          <View style={InputExpenseScreenStyles.line} />
          {/* view add image */}
          <TouchableOpacity onPress={this.toggleImage} style={InputExpenseScreenStyles.viewRowItem}>
            <View style={InputExpenseScreenStyles.viewIconAndTitleItem}>
              <MaterialIcons name={'library-add'} color={Colors.mediumseagreen} size={screenWidth / 14} />
              <Text style={InputExpenseScreenStyles.txtTitleItem}>Hình ảnh</Text>
            </View>
            <View style={this.state.isCheckImage ? InputExpenseScreenStyles.viewIconRightItem : null}>
              <FontAwesome
                name={'angle-right'}
                color={this.state.listImageAdd?.length > 0 ? Colors.tintColor : Colors.gray}
                size={screenWidth / 12}
              />
            </View>
          </TouchableOpacity>
          {this.state.isCheckImage ? (
            <View style={InputExpenseScreenStyles.viewAddImage}>
              <TouchableOpacity onPress={this.toggleModalPickImage} style={InputExpenseScreenStyles.viewIconAdd}>
                <Image
                  source={require('../../../../assets/images/uploadImage.png')}
                  style={InputExpenseScreenStyles.iconAdd}
                />
                <Text style={InputExpenseScreenStyles.txtAddImage}>Thêm hình ảnh</Text>
              </TouchableOpacity>
              <View style={InputExpenseScreenStyles.viewShowImage}>
                <FlatList
                  data={this.state.listImageAdd}
                  extraData={this.state}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={InputExpenseScreenStyles.showImage}>
                      <TouchableOpacity
                        onPress={() => this._deleteImage(index)}
                        style={InputExpenseScreenStyles.viewDeleteImage}
                      >
                        <Feather name={'x'} color={Colors.black} size={11} />
                      </TouchableOpacity>
                      <TouchableOpacity  style={InputExpenseScreenStyles.viewImageAdd} onPress={() => this.toggleModal()}>
                        <Image source={{ uri: item.url }} style={InputExpenseScreenStyles.imageAdd} />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          ) : null}
          <View style={InputExpenseScreenStyles.line} />
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getListUserInTrip: (tripId) => getApiListUserInTrip(tripId),
      saveTripId: (tripId) => saveTripIdInExpense(tripId),
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputExpenseScreen);
