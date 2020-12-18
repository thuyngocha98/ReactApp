import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, TouchableOpacity, Text, Image, FlatList, Modal, Platform, UIManager, LayoutAnimation } from 'react-native';
import Colors from '../../../../constants/Colors';
import { Ionicons, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import DetailTransactionScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailTransactionScreenStyles/DetailTransactionScreenStyles';

// @ts-ignore
import list from '../../../../../assets/images/list.png';
// @ts-ignore
import camera from '../../../../../assets/images/photo-camera.png';
// @ts-ignore
import user from '../../../../../assets/images/user.png';
import ListItemDetailTransaction from './ListItemDetailTransaction';
import { number2money } from '../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../api/api';
import { screenWidth } from '../../../../constants/Dimensions';
import ImageViewer from 'react-native-image-zoom-viewer';
import { transaction } from '../../../../constants/FunctionCommon';
import moment from 'moment';
import localization from 'moment/locale/vi';
moment.updateLocale("vi", localization);
import LottieView from 'lottie-react-native';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  data?: any[];
  loading?: boolean;
  isModelVisible?: boolean;
};
// Check platform android set flag animation layout
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class DetailTransactionScreen extends Component<Props, States> {
  constructor(props) {
    super(props);
    this.transaction = this.props.navigation.getParam('transaction', '');
  }
  state = {
    data: [],
    loading: false,
    isModelVisible: false,
  };
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  transaction: {
    trip_id?: string,
    _id?: string,
    imageURL?: any[],
    create_date?: any,
    avatar?: any,
    amount?: any,
    name?: string,
    address?: string,
    update_date?: any,
  };

  componentDidMount() {
    this.getDataTransaction();
  }

  getDataTransaction = async () => {
    this.setState({ loading: true });
    const data = {
      trip_id: this.transaction.trip_id,
      transaction_id: this.transaction._id,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/transactionUser/get_transaction_user_by_transaction_id_and_trip_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        Platform.OS === 'android' && 
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          data: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log(error);
      });
  };

  toggleModal = () => {
    this.setState({ isModelVisible: !this.state.isModelVisible });
  };

  renderHeader = () => {
    const { navigation } = this.props;
    const nameGroup = navigation.getParam('nameGroup', 'No Name');
    const lengthImage = this.transaction.imageURL.length;
    const avatarTransaction =
      lengthImage > 0
        ? { uri: `${BASEURL}/images/uploads/${this.transaction.imageURL[0]}` }
        : transaction['avatar' + this.transaction.avatar];
    const update_date = this.transaction?.update_date ?
      this.transaction.update_date : this.transaction.create_date;
    return (
      <View>
        <View style={DetailTransactionScreenStyles.details}>
          <View style={{ flexDirection: 'row' }}>
            <View style={DetailTransactionScreenStyles.icons}>
              <Image
                source={avatarTransaction}
                style={
                  lengthImage > 0 ? DetailTransactionScreenStyles.image2 : DetailTransactionScreenStyles.image1
                }
              />
            </View>
            <View style={DetailTransactionScreenStyles.contentDetails}>
              <Text style={DetailTransactionScreenStyles.iconTravel}>{this.transaction?.name}</Text>
              <Text style={DetailTransactionScreenStyles.money}>
                {number2money(this.transaction?.amount)} VND
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: screenWidth/18 }}>
          <View style={DetailTransactionScreenStyles.personAdd}>
            <View style={DetailTransactionScreenStyles.person}>
              <View style={DetailTransactionScreenStyles.nameGroup}>
                <Image
                  style={DetailTransactionScreenStyles.image}
                  source={require('../../../../../assets/images/icon-home.png')}
                />
                <Text numberOfLines={1} style={DetailTransactionScreenStyles.txtAllOf}>Tổng hợp chi phí của {nameGroup}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Text numberOfLines={1} style={DetailTransactionScreenStyles.txtDate}>
                {`Được bạn tạo ngày ${moment(this.transaction.create_date).format('ll')}`}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Text numberOfLines={1} style={DetailTransactionScreenStyles.txtDate}>
                {`Cập nhật cuối cùng ngày ${moment(update_date).format('ll')}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={DetailTransactionScreenStyles.hr} />
      </View>
    );
  }

  renderFooter = () => {
    return (
      <>
        {this.transaction?.address && (
          <View style={DetailTransactionScreenStyles.viewAddress}>
            <Text style={DetailTransactionScreenStyles.txtTitle}>Địa điểm</Text>
            <View style={DetailTransactionScreenStyles.viewTextAddress}>
              
              <Text style={DetailTransactionScreenStyles.txtAddress}>
                {this.transaction?.address}
              </Text>
              <View style={DetailTransactionScreenStyles.viewLottie}>
                <LottieView
                  style={DetailTransactionScreenStyles.lottieMap}
                  source={require('../../../../../assets/lotties/mapmaker.json')}
                  autoPlay
                  loop
                />
              </View>
            </View>
          </View>
        )}
        {this.transaction?.imageURL.length > 0 && (
          <View style={DetailTransactionScreenStyles.viewImages}>
            <Text style={DetailTransactionScreenStyles.txtTitle}>Hình ảnh</Text>
              <View style={DetailTransactionScreenStyles.viewFlatList}>
                <FlatList 
                  data={this.transaction?.imageURL || []}
                  renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => this.toggleModal()}>
                      <Image
                        source={{ uri: `${BASEURL}/images/uploads/${item}` }}
                        style={DetailTransactionScreenStyles.listImages}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
          </View>
        )}
      </>
    );
  }

  render() {
    const { navigation } = this.props;
    const images = this.transaction?.imageURL.map((url) => {
      return { url: `${BASEURL}/images/uploads/${url}` };
    });
    return (
      <View style={DetailTransactionScreenStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <Modal visible={this.state.isModelVisible} transparent={false} onRequestClose={() => this.toggleModal()}>
          <ImageViewer useNativeDriver={true} imageUrls={images} />
          <TouchableOpacity onPress={this.toggleModal} style={DetailTransactionScreenStyles.viewDropModalZoom}>
            <Feather name={'x'} color={Colors.black} size={18} />
          </TouchableOpacity>
        </Modal>
        <View style={DetailTransactionScreenStyles.containerHeader}>
          <View style={DetailTransactionScreenStyles.header}>
            <TouchableOpacity
              style={DetailTransactionScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={30} color={Colors.white} />
            </TouchableOpacity>
            <Text style={DetailTransactionScreenStyles.addContact}>Chi Tiết</Text>
            <TouchableOpacity disabled style={DetailTransactionScreenStyles.save1} activeOpacity={0.5} onPress={() => {}}>
              <AntDesign name={'delete'} size={25} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity disabled style={DetailTransactionScreenStyles.save2} activeOpacity={0.5} onPress={() => {}}>
              <Entypo name={'edit'} color={Colors.white} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListItemDetailTransaction data={item} />}
          keyExtractor={(item) => item._id.toString()}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(DetailTransactionScreen);
