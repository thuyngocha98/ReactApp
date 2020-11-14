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

function mapStateToProps(state) {
  return {};
}

type Props = {
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
};

class DetailGroupScreen extends Component<Props, States> {
  state = {
    data: [],
    loading: false,
    numberUserInTrip: 0,
    modalVisible: false,
    index: 0,
    routes: [
      { key: 'first', title: 'Tổng quan' },
      { key: 'second', title: 'Giao dịch' },
    ],
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

  render() {
    const navigation = this.props.navigation;
    const time = this.dataTrip.create_date.split('-');
    return (
      <View style={DetailGroupScreenStyles.mainContainer}>
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
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={DetailGroupScreenStyles.header}>
          <HeaderTitleComponent
            navigation={this.props.navigation}
            nameGroup={this.dataTrip.name}
            idGroup={this.dataTrip._id}
            // startDay={this.dataTrip.startDay}
            // endDay={this.dataTrip.endDay}
            time={this.dataTrip.create_date}
            amount={this.dataTrip.oweUser}
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MainLocationScreen', { tripId: this.dataTrip._id });
                    }}
                  >
                    <View style={DetailGroupScreenStyles.overView}>
                      <Image style={DetailGroupScreenStyles.imageOverView} source={map} />
                      <Text style={{ marginLeft: screenWidth / 20 }}>Những địa điểm mà nhóm đã đi qua</Text>
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
                  <View style={DetailGroupScreenStyles.dateTitle}>
                    <Text style={DetailGroupScreenStyles.date}>tháng {time[1] + ' ' + time[0]}</Text>
                  </View>
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

        {this.state.modalVisible ? null : (
          <TouchableOpacity
            style={DetailGroupScreenStyles.addTrip}
            activeOpacity={0.5}
            onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
          >
            <MaterialIcons name={'add'} color={Colors.white} size={screenWidth / 9} />
          </TouchableOpacity>
        )}
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
