import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Colors from '../../../constants/Colors';
import DetailGroupScreenStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailGroupScreenStyles';
import HeaderTitleComponent from './HeaderTitleComponent';
import { screenHeight, screenWidth } from '../../../constants/Dimensions';
import ListItemContent from './ListItemContent';
import { BASEURL } from '../../../api/api';
import { bindActionCreators } from 'redux';
import { saveTripIdInExpense } from '../../../actions/action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { TabView, SceneMap } from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
// @ts-ignore
import picture from '../../../../assets/images/pictures.png';
// @ts-ignore
import balance from '../../../../assets/images/balance.png';
// @ts-ignore
import destination from '../../../../assets/images/destination.png';
// @ts-ignore
import map from '../../../../assets/images/map.png';
// @ts-ignore
import groupChat from '../../../../assets/images/group-chat.png';
// @ts-ignore
import plus from '../../../../assets/images/plus.png';
import ModalNotification from '../../components/ModalNotification';
import ListEmpty from '../../components/ListEmpty';
function mapStateToProps(state) {
  return {
    userId: state.dataUser.dataUser._id,
  };
}

type Props = {
  userId?: any;
  navigation?: any;
  saveTripId?: any;
  idGroup?: string;
};

type States = {
  data?: any[];
  loading?: boolean;
  numberUserInTrip?: number;
  modalVisible?: boolean;
  routes?: any;
  index?: any;
  modalDeleteVisible?: boolean;
  modalNotification?: {
    modalVisible?: boolean;
    type?: string;
    title?: string;
    description?: string;
    onPress?: () => void;
  };
};

class DetailGroupScreen extends Component<Props, States> {
  state = {
    data: [],
    loading: false,
    numberUserInTrip: 0,
    modalVisible: false,
    index: 0,
    modalDeleteVisible: false,
    routes: [
      { key: 'first', title: 'Tổng quan' },
      { key: 'second', title: 'Xem chi tiết' },
    ],
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {},
    },
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  _navListener: any;

  dataTrip = this.props.navigation.getParam('dataTrip', '');

  componentDidMount() {
    // set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      this.getTransactionByTripId();
      this.props.saveTripId('');
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  addImage() {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.props.navigation.navigate('AddImagesScreen', { tripId: this.dataTrip._id });
  }

  getTransactionByTripId = async () => {
    this.setState({ loading: true });
    await fetch(`${BASEURL}/api/transaction/get_transaction_by_trip_id/${this.dataTrip._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        await this.setState({
          numberUserInTrip: res.numberUser,
          data: res.data.reverse(),
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert(error);
      });
  };

  _ItemSeparatorComponent = () => {
    return <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />;
  };

  goToAddScreen(isCheck) {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.props.navigation.navigate('InputExpenseScreen', { dataGroup: this.dataTrip, isCheck: isCheck });
  }

  setIndex = async (index) => {
    this.setState({
      index,
    });
  };

  onPress = (visible) => {
    this.setState({ modalDeleteVisible: visible });
  };

  toggleDeleteModal = () => {
    this.setState({ modalDeleteVisible: !this.state.modalDeleteVisible });
  };

  callApiRemoveGroup = async () => {
    const data = {
      user_id: this.props.userId,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/trip/delete_a_trip/${this.dataTrip._id}/${this.props.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result == 'Failed') {
          this.setState({
            modalNotification: {
              type: 'error',
              title: res.message,
              description: 'Vui lòng kiểm tra lại.',
              modalVisible: true,
            },
          });
        } else {
          this.props.navigation.navigate('GroupScreen');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDeleteGroup = () => {
    this.toggleDeleteModal();
    this.callApiRemoveGroup();
  };

  seePlace = (trip) => {
    Alert.alert(
      `${trip.name}`,
      'Những địa điểm nhóm đi qua',
      [
        {
          text: 'Xem dạng lưới',
          onPress: () => this.props.navigation.navigate('PlaceGridScreen', { tripId: trip._id }),
        },
        {
          text: 'Xem trên bản đồ',
          onPress: () => this.props.navigation.navigate('MainLocationScreen', { tripId: trip._id }),
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const lengthItemTransaction = this.state.data.length;
    const navigation = this.props.navigation;
    const time = this.dataTrip.create_date.split('-');
    return (
      <View style={DetailGroupScreenStyles.mainContainer}>
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({ modalNotification: { modalVisible: false } })}
        />
        {/* view modal */}
        <Modal
          isVisible={this.state.modalVisible}
          style={DetailGroupScreenStyles.mainModal}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
          onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
        >
          <View style={DetailGroupScreenStyles.viewModal}>
            <TouchableOpacity onPress={() => this.goToAddScreen('1')} style={DetailGroupScreenStyles.viewItemModal}>
              <MaterialIcons name={'note-add'} color={Colors.tintColor} size={screenWidth / 14} />
              <Text style={DetailGroupScreenStyles.txtItemModal}>Thêm chi phí</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goToAddScreen('2')} style={DetailGroupScreenStyles.viewItemModal}>
              <MaterialIcons name={'add-location'} color={Colors.splitWise} size={screenWidth / 14} />
              <Text style={DetailGroupScreenStyles.txtItemModal}>Thêm vị trí</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goToAddScreen('3')} style={DetailGroupScreenStyles.viewItemModal}>
              <MaterialIcons name={'library-add'} color={Colors.mediumseagreen} size={screenWidth / 14} />
              <Text style={DetailGroupScreenStyles.txtItemModal}>Thêm hình ảnh</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalDeleteVisible}
          style={DetailGroupScreenStyles.mainDeleteModal}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
          onBackdropPress={this.toggleDeleteModal}
        >
          <View style={DetailGroupScreenStyles.viewDeleteModal}>
            <Text style={DetailGroupScreenStyles.txtTitleDeleteModal}>{`Bạn có chắc muốn xóa nhóm này?`}</Text>
            <View style={DetailGroupScreenStyles.viewBtnDeleteModal}>
              <TouchableOpacity
                onPress={this.toggleDeleteModal}
                style={[
                  DetailGroupScreenStyles.btnDeleteModal,
                  { borderRightWidth: 1, borderRightColor: Colors.lavender },
                ]}
              >
                <Text style={DetailGroupScreenStyles.txtBtnDeleteModal}>Hủy bỏ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDeleteGroup} style={DetailGroupScreenStyles.btnDeleteModal}>
                <Text style={DetailGroupScreenStyles.txtBtnDeleteModal}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={DetailGroupScreenStyles.header}>
          <HeaderTitleComponent
            navigation={this.props.navigation}
            nameGroup={this.dataTrip.name}
            idGroup={this.dataTrip._id}
            dataTrip={this.dataTrip}
            // startDay={this.dataTrip.startDay}
            // endDay={this.dataTrip.endDay}
            time={this.dataTrip.create_date}
            amount={this.dataTrip.oweUser}
            onPress={this.onPress}
            numberUserInTrip={this.state.numberUserInTrip}
          />
        </View>
        <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? -screenWidth / 60 : -screenHeight / 20 }}>
          <TabView
            navigationState={{ index: this.state.index, routes: this.state.routes }}
            renderScene={SceneMap({
              first: () => (
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('InputExpenseScreen', { dataGroup: this.dataTrip });
                    }}
                  >
                    <View style={[DetailGroupScreenStyles.overView, { marginTop: screenHeight / 40 }]}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={plus} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Tạo mới</Text>
                      <View style={{ flex: 1 }} />
                      <AntDesign name={'right'} size={screenWidth / 28} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MainPlanInTripScreen', { tripId: this.dataTrip._id });
                    }}
                  >
                    <View style={[DetailGroupScreenStyles.overView, { marginTop: screenHeight / 40 }]}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={destination} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Lịch trình chuyến đi</Text>
                      <View style={{ flex: 1 }} />
                      <AntDesign name={'right'} size={screenWidth / 28} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.seePlace(this.dataTrip)}>
                    <View style={DetailGroupScreenStyles.overView}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={map} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Những địa điểm nhóm đã đi qua</Text>
                      <View style={{ flex: 1 }} />
                      <AntDesign name={'right'} size={screenWidth / 28} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ShowImagesScreen', { tripId: this.dataTrip._id });
                    }}
                  >
                    <View style={DetailGroupScreenStyles.overView}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={picture} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Hình ảnh chuyến đi</Text>
                      <View style={{ flex: 1 }} />
                      <AntDesign name={'right'} size={screenWidth / 28} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatGroupScreen', {
                        tripId: this.dataTrip._id,
                        nameTrip: this.dataTrip.name,
                        navigation: this.props.navigation,
                      });
                    }}
                  >
                    <View style={DetailGroupScreenStyles.overView}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={groupChat} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Nhắn tin nhóm</Text>
                      <View style={{ flex: 1 }} />
                      <AntDesign name={'right'} size={screenWidth / 28} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('BalanceScreen', { tripId: this.dataTrip._id });
                    }}
                  >
                    <View style={DetailGroupScreenStyles.overView}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={balance} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Tổng số dư giao dịch</Text>
                      <View style={{ flex: 1 }} />
                      <AntDesign name={'right'} size={screenWidth / 28} />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              ),
              second: () => (
                <View>
                  {lengthItemTransaction > 0 ? (
                    <View style={DetailGroupScreenStyles.dateTitle}>
                      <Text style={DetailGroupScreenStyles.date}>tháng {time[1] + ' ' + time[0]}</Text>
                    </View>
                  ) : (
                    <View style={{ marginBottom: screenWidth / 5 }} />
                  )}
                  {this.state.loading ? (
                    <View style={DetailGroupScreenStyles.activityIndicator}>
                      <LottieView
                        style={DetailGroupScreenStyles.viewLottie}
                        source={require('../../../../assets/lotties/WaveLoading.json')}
                        autoPlay
                        loop
                      />
                    </View>
                  ) : (
                    <FlatList
                      data={this.state.data}
                      scrollEnabled
                      keyExtractor={(item, index) => index.toString()}
                      ListEmptyComponent={() => (
                        <View style={DetailGroupScreenStyles.viewEmpty}>
                          <ListEmpty
                            title={'Hiện tại chưa có sự kiện nào được ghi lại'}
                            titleAction={'Bắt đầu thêm sự kiện mới'}
                            action={() => this.setState({ modalVisible: !this.state.modalVisible })}
                          />
                        </View>
                      )}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('DetaiTransactionScreen', {
                              nameGroup: this.dataTrip.name,
                              transaction: item,
                            });
                          }}
                        >
                          <ListItemContent data={item} />
                        </TouchableOpacity>
                      )}
                    />
                  )}
                </View>
              ),
            })}
            onIndexChange={(index) => this.setIndex(index)}
            initialLayout={{ width: screenWidth }}
          />
        </View>
        {lengthItemTransaction > 0 ? (
          this.state.index == 1 ? (
            this.state.modalVisible ? null : (
              <TouchableOpacity
                style={DetailGroupScreenStyles.addTrip}
                activeOpacity={0.5}
                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
              >
                <MaterialIcons name={'add'} color={Colors.white} size={screenWidth / 9} />
              </TouchableOpacity>
            )
          ) : null
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveTripId: (tripId) => saveTripIdInExpense(tripId),
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGroupScreen);
