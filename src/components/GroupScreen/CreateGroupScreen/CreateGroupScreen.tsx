import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../constants/Colors';
import CreateGroupScreenStyles from '../../../styles/GroupsStyles/CreateGroupScreenStyles/CreateGroupScreenStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import ModalNotification from '../../components/ModalNotification';

function mapStateToProps(state) {
  return {
    userId: state.dataUser.dataUser._id,
  };
}

type Props = {
  userId?: any;
  navigation?: any;
  date?: any;
};

type States = {
  name?: string;
  checkInputName?: boolean;
  isDateTimePickerVisible?: boolean;
  isDateTimePickerVisible1?: boolean;
  startDay?: string;
  endDay?: string;
  show?: boolean;
  show1?: boolean;
  date?: any;
  dateString?: any;
  dataTrip?: any[];
  indexSelectTrip?: number;
  loadingTrip?: boolean;
  modalNotification?: {
    modalVisible?: boolean,
    type?: string,
    title?: string,
    description?: string,
    onPress?: () => void;
  },
};

class CreateGroupScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };
  state = {
    name: '',
    checkInputName: false,
    isDateTimePickerVisible: false,
    isDateTimePickerVisible1: false,
    startDay: 'Chọn ngày bắt đầu',
    endDay: 'Chọn ngày kết thúc',
    show: false,
    show1: false,
    dateString: moment(new Date()).format('YYYY-MM-DD'),
    date: new Date(),
    dataTrip: [],
    indexSelectTrip: -1,
    loadingTrip: false,
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {}
    },
  };

  _navListener: any;

  componentDidMount() {
    this.getListTrip();
    // set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  _checkInputName(text) {
    if (text === '') {
      this.setState({
        checkInputName: false,
        name: text,
      });
    } else {
      this.setState({
        checkInputName: true,
        name: text,
      });
    }
  }

  // Date time picker start day
  checkCondition() {
    if(this.state.checkInputName) {
      Keyboard.dismiss();
      let listPlan = this.state.dataTrip.reduce((acc, cur) => {
        if (cur.isSelect) {
          acc.push(cur._id);
        }
        return acc;
      }, []);
      if (this.state.checkInputName) {
        if (this.state.startDay !== 'Chọn ngày bắt đầu') {
          if (this.state.endDay !== 'Chọn ngày kết thúc') {
            this.props.navigation.navigate('AddMemberGroupScreen', {
              nameGroup: this.state.name,
              startDay: this.state.startDay,
              endDay: this.state.endDay,
              listPlan: listPlan,
            });
          } else {
            this.setState({modalNotification: {
              type: 'error',
              title: 'Bạn chưa chọn ngày kết thúc',
              description: 'Vui lòng chọn ngày kết thúc.',
              modalVisible: true,
            }})
          }
        } else {
          this.setState({modalNotification: {
            type: 'error',
            title: 'Bạn chưa chọn ngày bắt đầu',
            description: 'Vui lòng chọn ngày bắt đầu.',
            modalVisible: true,
          }})
        }
      } else {
        this.setState({modalNotification: {
          type: 'error',
          title: 'Tên nhóm không hợp lệ!',
          description: 'Vui lòng nhập lại tên nhóm.',
          modalVisible: true,
        }})
      }
    }
  }

  onChange = (event: any, selectedDate: any) => {
    if (event.type === 'dismissed') {
      Keyboard.dismiss();
      this.setState({
        show: !this.state.show,
      });
    } else {
      this.setState({
        startDay: moment(selectedDate).format('YYYY-MM-DD'),
        show: !this.state.show,
      });
    }
  };

  showOverlay = () => {
    Keyboard.dismiss();
    this.setState({ show: true });
  };

  hideOverlay = () => {
    this.setState({ show: false });
  };

  onChange1 = (event: any, selectedDate: any) => {
    if (event.type === 'dismissed') {
      Keyboard.dismiss();
      this.setState({
        show1: !this.state.show1,
      });
    } else {
      this.setState({
        endDay: moment(selectedDate).format('YYYY-MM-DD'),
        show1: !this.state.show1,
      });
    }
  };

  showOverlay1 = () => {
    Keyboard.dismiss();
    this.setState({ show1: true });
  };

  hideOverlay1 = () => {
    this.setState({ show1: false });
  };

  getListTrip = () => {
    this.setState({ loadingTrip: true });
    fetch(`${BASEURL}/api/plan/get_all_plan/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          dataTrip: res.data.map((item) => ({ ...item, isSelect: false })),
          loadingTrip: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingTrip: false,
        });
        console.log(error);
      });
  };

  onSelectPlanTrip = (index) => {
    let newData = this.state.dataTrip;
    newData[index].isSelect = !newData[index].isSelect;
    this.setState({ dataTrip: [...newData] });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={CreateGroupScreenStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({ modalNotification: { modalVisible: false}})}
        />
        <View style={CreateGroupScreenStyles.containerHeader}>
          <View style={CreateGroupScreenStyles.header}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={CreateGroupScreenStyles.cancel}>Hủy</Text>
            </TouchableOpacity>
            <Text style={CreateGroupScreenStyles.addContact}>Tạo nhóm mới</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.checkCondition();
              }}
            >
              <Text style={[CreateGroupScreenStyles.add, { opacity: this.state.checkInputName ? 1 : 0.5 }]}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
        <View style={CreateGroupScreenStyles.categoryGroupName}>
          <Image
            style={CreateGroupScreenStyles.iconCamera}
            source={require('../../../../assets/images/icon_camera.png')}
          />
          <View style={CreateGroupScreenStyles.nameAndDetail}>
            <Text style={CreateGroupScreenStyles.groupName}>Tên Nhóm</Text>
            <TextInput
              style={CreateGroupScreenStyles.detail}
              onChangeText={(text) => {
                this._checkInputName(text);
              }}
              value={this.state.name}
              maxLength={50}
              autoCapitalize="words"
              placeholder={'Nhập tên nhóm'}
              autoFocus={true}
              keyboardType="default"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={CreateGroupScreenStyles.pickDate}>
          <TouchableOpacity onPress={this.showOverlay} style={CreateGroupScreenStyles.chooseDay}>
            <Text style={CreateGroupScreenStyles.contentChooseDay}>
              {this.state.startDay !== 'Chọn ngày bắt đầu' ? 'Từ ' + this.state.startDay : this.state.startDay}
            </Text>
          </TouchableOpacity>
          <View>
            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
                style={{ backgroundColor: 'white' }}
              />
            )}
          </View>
        </View>
        <View style={CreateGroupScreenStyles.pickDate1}>
          <TouchableOpacity onPress={this.showOverlay1} style={CreateGroupScreenStyles.chooseDay}>
            <Text style={CreateGroupScreenStyles.contentChooseDay}>
              {this.state.endDay !== 'Chọn ngày kết thúc' ? 'Đến ' + this.state.endDay : this.state.endDay}
            </Text>
          </TouchableOpacity>
          <View>
            {this.state.show1 && (
              <DateTimePicker
                value={this.state.date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.onChange1}
                style={{ backgroundColor: 'white' }}
              />
            )}
          </View>
        </View>
        <View style={CreateGroupScreenStyles.pickDate}>
          {this.state.dataTrip.length > 0 && <Text style={CreateGroupScreenStyles.groupName}>Chọn lịch trình</Text>}
          {this.state.loadingTrip ? (
            <View style={CreateGroupScreenStyles.selectTrip}>
              <ActivityIndicator animating size="small" color={Colors.tintColor} />
            </View>
          ) : (
            <View style={CreateGroupScreenStyles.listTrip}>
              {this.state.dataTrip.map((item, index) => (
                <TouchableOpacity
                  onPress={() => this.onSelectPlanTrip(index)}
                  key={item._id}
                  style={CreateGroupScreenStyles.itemTrip}
                >
                  <Text style={[CreateGroupScreenStyles.txtTrip, { fontWeight: item.isSelect ? 'bold' : 'normal' }]}>
                    {item.name}
                  </Text>
                  {item.isSelect ? (
                    <MaterialIcons name="radio-button-checked" size={24} color={Colors.mediumseagreen} />
                  ) : (
                    <MaterialIcons name="radio-button-unchecked" size={24} color={Colors.gray} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(CreateGroupScreen);
