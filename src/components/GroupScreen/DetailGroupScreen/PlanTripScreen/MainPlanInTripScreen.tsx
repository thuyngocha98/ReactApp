import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { APPBAR_HEIGHT, screenHeight, screenWidth } from '../../../../constants/Dimensions';
import Constants from 'expo-constants';
import Colors from '../../../../constants/Colors';
import { Ionicons, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { BASEURL } from '../../../../api/api';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import ListEmpty from '../../../components/ListEmpty';

function mapStateToProps(state) {
  return {
    userId: state.dataUser.dataUser._id,
  };
}

type Props = {
  navigation?: any;
  userId?: any;
};

type States = {
  data?: any[];
  loading?: boolean;
  dataNoInTrip?: any[];
  loadingNoInTrip?: boolean;
  modalAddVisible?: boolean;
  modalVisible?: boolean;
  itemDelete?: {
    _id: string;
    name: string;
  };
};

export class MainPlanInTripScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: [],
    loading: true,
    dataNoInTrip: [],
    loadingNoInTrip: true,
    modalAddVisible: false,
    modalVisible: false,
    itemDelete: {
      _id: '',
      name: '',
    },
  };

  focusListener: any;

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getListPlanTrip();
    });
  }

  componentWillUnmount() {
    // remove event listener
    this.focusListener.remove();
  }

  toggleModal = () => {
    this.setState({ modalAddVisible: !this.state.modalAddVisible });
  };

  onToggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  getListPlanTrip = () => {
    this.setState({ loading: true });
    let tripId = this.props.navigation.getParam('tripId', '');
    fetch(`${BASEURL}/api/plan/get_plan_by_trip_id/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        alert(error);
      });
  };

  onGetPlanNoInTripByUserId = () => {
    this.setState({ loadingNoInTrip: true });
    let tripId = this.props.navigation.getParam('tripId', '');
    fetch(`${BASEURL}/api/plan/get_plan_no_in_trip_by_user_id/${tripId}/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          dataNoInTrip: [...res.data.map((item) => ({ ...item, selected: false }))],
          loadingNoInTrip: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingNoInTrip: false,
        });
        alert(error);
      });
  };

  onPressAdd = () => {
    this.toggleModal();
    this.onGetPlanNoInTripByUserId();
  };

  onSelectItemAddPlanInTrip = (index) => {
    let newData = [...this.state.dataNoInTrip];
    newData[index].selected = !newData[index].selected;
    this.setState({ dataNoInTrip: newData });
  };

  onAddPlanInTrip = () => {
    let listPlan = this.state.dataNoInTrip.reduce((acc, cur) => {
      if (cur.selected) {
        acc.push(cur._id);
      }
      return acc;
    }, []);
    let json = {
      listPlan,
      tripId: this.props.navigation.getParam('tripId', ''),
    };
    fetch(`${BASEURL}/api/plan/add_plan_in_trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((response) => response.json())
      .then((res) => {
        this.toggleModal();
        this.getListPlanTrip();
      })
      .catch((error) => {
        this.toggleModal();
        alert(error);
      });
  };

  onPressDeletePlan = (item) => {
    this.setState({ itemDelete: item });
    this.onToggleModal();
  };

  onDelete = () => {
    this.setState({ loading: true });
    let tripId = this.props.navigation.getParam('tripId', '');
    fetch(`${BASEURL}/api/plan/remove_plan_in_trip/${this.state.itemDelete._id}/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        alert(error);
      });
    this.onToggleModal();
  };

  renderEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <ListEmpty 
          title={'Nhóm của bạn chưa có lịch trình nào.'}
          titleAction={null}
          action={null}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/**view modal delete */}
        <Modal
          isVisible={this.state.modalVisible}
          style={styles.mainModal}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
          onBackdropPress={this.onToggleModal}
        >
          <View style={styles.viewModal}>
            <Text style={styles.txtTitleModal}>{`Bạn có chắc muốn xóa ${this.state.itemDelete.name}?`}</Text>
            <View style={styles.viewBtnModal}>
              <TouchableOpacity
                onPress={this.onToggleModal}
                style={[styles.btnModal, { borderRightWidth: 1, borderRightColor: Colors.lavender }]}
              >
                <Text style={styles.txtBtnModal}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDelete} style={styles.btnModal}>
                <Text style={styles.txtBtnModal}>Chọn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* view modal save */}
        <Modal
          avoidKeyboard
          animationIn='zoomIn'
          animationOut="zoomOut"
          isVisible={this.state.modalAddVisible}
          style={styles.mainModalSave}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
        >
          <View style={styles.viewModalSave}>
            <Text style={styles.txtTitleModalSave}>Chọn lịch trình chuyến đi</Text>
            {this.state.loadingNoInTrip ? (
              <View style={styles.selectTrip}>
                <ActivityIndicator animating size="small" color={Colors.tintColor} />
              </View>
            ) : this.state.dataNoInTrip.length > 0 ? (
              <>
              <View style={styles.selectTrip}>
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.listTrip}>
                  {this.state.dataNoInTrip.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => this.onSelectItemAddPlanInTrip(index)}
                      key={item._id}
                      style={styles.itemTrip}
                    >
                      <Text style={[styles.txtTrip, { fontWeight: item.selected ? 'bold' : 'normal' }]}>
                        {item.name}
                      </Text>
                      {item.selected ? (
                        <MaterialIcons name="radio-button-checked" size={20} color={Colors.mediumseagreen} />
                      ) : (
                        <MaterialIcons name="radio-button-unchecked" size={20} color={Colors.gray} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.viewBtnModal}>
                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={[styles.btnModal, { borderRightWidth: 1, borderRightColor: Colors.lavender }]}
                >
                  <Text style={styles.txtBtnModal}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onAddPlanInTrip} style={styles.btnModal}>
                  <Text style={styles.txtBtnModal}>Lưu</Text>
                </TouchableOpacity>
              </View>
              </>
            ) : (
              <>
              <Text style={{
                fontSize: 15, 
                color: Colors.black,
                textAlign: 'center',
                marginHorizontal: screenWidth/24
              }}>
                Bạn chưa có lịch trình nào, vui lòng tạo lịch trình của bạn
              </Text>
              <View style={styles.viewBtnModal}>
                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={[styles.btnModal, { borderRightWidth: 1, borderRightColor: Colors.lavender }]}
                >
                  <Text style={styles.txtBtnModal}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleModal} style={styles.btnModal}>
                  <Text style={styles.txtBtnModal}>OK</Text>
                </TouchableOpacity>
              </View>
              </>
            )}
          </View>
        </Modal>
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerLeft}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons name="md-arrow-back" size={28} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kế hoạch du lịch</Text>
            <TouchableOpacity style={styles.headerRight} activeOpacity={0.5} onPress={this.onPressAdd}>
              <Ionicons name="ios-add" size={32} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading ? (
          <View style={styles.activityIndicator}>
            <LottieView
              style={styles.viewLottie}
              source={require('../../../../../assets/lotties/WaveLoading.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <View style={styles.viewList}>
            <Text style={styles.txtRecommend}>Lịch trình của bạn</Text>
            <FlatList
              data={this.state.data}
              ListEmptyComponent={this.renderEmpty}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    this.props.navigation.navigate('DetailPlanInTripScreen', {
                      location: item.location,
                      name: item.name,
                      planId: item._id,
                    })
                  }
                  style={styles.viewPlan}
                >
                  <Text style={styles.txtTitle}>{item.name}</Text>
                  <View style={styles.viewRightItem}>
                    <TouchableOpacity onPress={() => this.onPressDeletePlan(item)} style={styles.btnDelete}>
                      <AntDesign name="delete" size={18} color={Colors.gray} />
                    </TouchableOpacity>
                    <Feather name="chevron-right" size={28} color={Colors.gray} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(MainPlanInTripScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewModal: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: screenWidth / 36,
  },
  txtTitleModal: {
    fontSize: 16,
    color: Colors.blackText,
    paddingBottom: screenWidth / 36,
    paddingHorizontal: screenWidth / 8,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender,
  },
  mainModalSave: {
    justifyContent: 'center',
  },
  viewModalSave: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: screenWidth / 36,
  },
  txtTitleModalSave: {
    fontSize: 16,
    color: Colors.blackText,
    paddingHorizontal: screenWidth / 11,
    textAlign: 'center',
  },
  selectTrip: {
    paddingVertical: screenHeight / 64,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender,
  },
  listTrip: {
    marginTop: screenHeight / 64,
    maxHeight: screenHeight / 4,
  },
  itemTrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth / 72,
    paddingBottom: screenHeight / 64,
  },
  txtTrip: {
    fontSize: 15,
    color: Colors.blackText,
  },
  viewBtnModal: {
    flexDirection: 'row',
  },
  txtBtnModal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackText,
    textAlign: 'center',
    paddingVertical: screenWidth / 36,
  },
  btnModal: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + Constants.statusBarHeight,
    backgroundColor: Colors.tabIconSelected,
  },
  header: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  headerLeft: {
    paddingLeft: screenWidth / 27,
    paddingRight: screenWidth / 24,
    paddingVertical: screenWidth / 72,
  },
  headerRight: {
    paddingLeft: screenWidth / 24,
    paddingRight: screenWidth / 27,
  },
  textHeaderRight: {
    fontSize: 17,
    color: Colors.white,
  },
  viewList: {
    flex: 1,
    padding: screenWidth / 24,
  },
  viewRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnDelete: {
    paddingVertical: screenWidth / 36,
    paddingHorizontal: screenWidth / 24,
  },
  viewPlan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender,
  },
  txtRecommend: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.tintColor,
  },
  txtTitle: {
    fontSize: 15,
    color: Colors.blackText,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLottie: {
    width: screenWidth / 3.6,
    height: screenWidth / 3.6,
  },
  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
