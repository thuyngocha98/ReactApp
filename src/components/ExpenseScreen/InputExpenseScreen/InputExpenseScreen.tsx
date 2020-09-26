import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  Alert,
  Keyboard,
  ToastAndroid,
  ScrollView,
  Image,
  FlatList,
  Modal,
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
};

const ASPECT_RATIO = screenWidth / (screenHeight / 1.97);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
      totalMoney: this.state.money.replace(/,/g, ''),
      userPayer: userPayer,
    });
  }

  // send list_user to choose multiple people (input money)
  async prepareSendListUserToChoose(listTypeUser, idPayer) {
    let list_user = await this.createListUser(listTypeUser, idPayer);
    this.props.navigation.navigate('ChoosePayerScreen', {
      list_user: list_user,
      listUser: this.props.listUserInTrip,
      totalMoney: this.state.money.replace(/,/g, ''),
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
    if (text === '') {
      this.setState({
        money: text,
        checkMoney: false,
      });
    } else {
      text = text.toString().replace(/,/g, '');
      this.setState({
        money: text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        checkMoney: true,
      });
    }
  }

  async createListUser(listTypeUser, idPayer) {
    const Money = parseInt(this.state.money.replace(/,/g, ''));
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
    const Money = parseInt(this.state.money.replace(/,/g, ''));
    const Description = this.state.description;
    var list_user = await this.createListUser(listTypeUser, idPayer);
    if (this.state.checkDescription !== this.state.checkMoney) {
      Keyboard.dismiss();
      ToastAndroid.showWithGravityAndOffset(
        'Please enter the full expense information !',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      if (!this.state.checkDescription && !this.state.isEnableAddLocation && this.state.listImageAdd?.length === 0) {
        Keyboard.dismiss();
        ToastAndroid.showWithGravityAndOffset(
          'Please enter additional information !',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return;
      }
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
      console.log(this.state.listImageAdd);

      bodyFormData.append('dataExpense', JSON.stringify(dataExpense));
      bodyFormData.append('dataLocation', JSON.stringify(dataLocation));
      bodyFormData.append('trip_id', tripId);
      console.log(bodyFormData);
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
            ToastAndroid.showWithGravityAndOffset('Save done!', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            await this.props.saveTripId(tripId);
            this.props.navigation.goBack();
          } else {
            ToastAndroid.showWithGravityAndOffset('Save error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

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
      alert("Hey! You don't enable location ");
    } else {
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
      alert("Hey! You don't enable location ");
    } else {
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
    }
  }

  _pickImage = async () => {
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
  };

  _deleteImage = (index) => {
    let listImage = [...this.state.listImageAdd];
    listImage.splice(index, 1);
    this.setState({ listImageAdd: listImage });
  };

  toggleModal = () => {
    this.setState({ isModelVisible: !this.state.isModelVisible });
  };

  render() {
    const { navigation } = this.props;
    this.listTypeUser = navigation.getParam('listTypeUser', []);
    this.idPayer = this.props.navigation.getParam('IdPayer', '');
    var Group = navigation.getParam('dataGroup', {});
    return (
      <View style={InputExpenseScreenStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <Modal visible={this.state.isModelVisible} transparent={false} onRequestClose={() => this.toggleModal()}>
          <ImageViewer imageUrls={this.state.listImageAdd} />
        </Modal>
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
            <Text style={InputExpenseScreenStyles.addContact}>Add categories</Text>
            <TouchableOpacity
              style={InputExpenseScreenStyles.save}
              activeOpacity={0.5}
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
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* view add expense */}
          <TouchableOpacity
            onPress={() => this.setState({ isCheckExpense: !this.state.isCheckExpense })}
            style={InputExpenseScreenStyles.viewRowItem}
          >
            <View style={InputExpenseScreenStyles.viewIconAndTitleItem}>
              <MaterialIcons name={'note-add'} color={Colors.tintColor} size={screenWidth / 14} />
              <Text style={InputExpenseScreenStyles.txtTitleItem}>Add Expense</Text>
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
                  <Text style={InputExpenseScreenStyles.txtSetAgain}>Set again</Text>
                  <FontAwesome name="repeat" size={10} color={Colors.gray} />
                </TouchableOpacity>
              </View>
              <View style={InputExpenseScreenStyles.sectionDescription}>
                <View style={InputExpenseScreenStyles.iconDescription}>
                  <MaterialIcons name="description" size={26} color={Colors.blackText} style={{ padding: 5 }} />
                </View>
                <View style={InputExpenseScreenStyles.inputDescription}>
                  <TextInput
                    onChangeText={(text) => this.checkDescription(text)}
                    style={InputExpenseScreenStyles.txtInputDescription}
                    placeholder="Enter a description"
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
                <Text style={InputExpenseScreenStyles.text1}>{'Paid by '}</Text>
                <View style={InputExpenseScreenStyles.button}>
                  <Text
                    style={InputExpenseScreenStyles.text2}
                    onPress={() =>
                      this.state.checkDescription && this.state.checkMoney
                        ? this.prepareSendListUserToChoose(this.listTypeUser, this.idPayer)
                        : Alert.alert('Please enter full information')
                    }
                  >
                    you
                  </Text>
                </View>
                <Text style={InputExpenseScreenStyles.text1}>{' and split '}</Text>
                <View style={InputExpenseScreenStyles.button}>
                  <Text
                    style={InputExpenseScreenStyles.text2}
                    onPress={() =>
                      this.state.checkDescription && this.state.checkMoney
                        ? this.prepareSendListUserToSplit(this.listTypeUser, this.idPayer)
                        : Alert.alert('Please enter full information')
                    }
                  >
                    equally
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
              <Text style={InputExpenseScreenStyles.txtTitleItem}>Add Location</Text>
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
                  <Text style={InputExpenseScreenStyles.txtSetAgain}>Enable add location</Text>
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
                    placeholder="Enter title location"
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
          <TouchableOpacity
            onPress={() => this.setState({ isCheckImage: !this.state.isCheckImage })}
            style={InputExpenseScreenStyles.viewRowItem}
          >
            <View style={InputExpenseScreenStyles.viewIconAndTitleItem}>
              <MaterialIcons name={'library-add'} color={Colors.mediumseagreen} size={screenWidth / 14} />
              <Text style={InputExpenseScreenStyles.txtTitleItem}>Add Image</Text>
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
              <TouchableOpacity onPress={() => this._pickImage()} style={InputExpenseScreenStyles.viewIconAdd}>
                <Image
                  source={{
                    uri:
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Icons8_flat_add_image.svg/1024px-Icons8_flat_add_image.svg.png',
                  }}
                  style={InputExpenseScreenStyles.iconAdd}
                />
              </TouchableOpacity>
              <View style={InputExpenseScreenStyles.viewShowImage}>
                <FlatList
                  data={this.state.listImageAdd}
                  extraData={this.state}
                  horizontal
                  renderItem={({ item, index }) => (
                    <View style={InputExpenseScreenStyles.showImage}>
                      <TouchableOpacity
                        onPress={() => this._deleteImage(index)}
                        style={InputExpenseScreenStyles.viewDeleteImage}
                      >
                        <Feather name={'x'} color={Colors.black} size={11} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.toggleModal()}>
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
