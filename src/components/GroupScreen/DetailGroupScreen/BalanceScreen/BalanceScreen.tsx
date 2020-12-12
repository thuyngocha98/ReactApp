import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import BalanceScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/BalanceScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import ListItemBalance from './ListItemBalance';
import { screenHeight, screenWidth } from '../../../../constants/Dimensions';
import { BASEURL } from '../../../../api/api';
import ModalNotification from '../../../components/ModalNotification';
import ModalLoading from '../../../components/ModalLoading';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  data?: any[];
  loading?: boolean;
  modalNotification?: {
    modalVisible?: boolean,
    type?: string,
    title?: string,
    description?: string,
    onPress?: () => void,
  },
};

class BalanceScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null
  };

  state = {
    data: [],
    loading: false,
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {},
    },
  };

  componentDidMount() {
    this.getTotalMoneyAllUserInOneTrip();
  }

  trip_id = this.props.navigation.getParam('tripId', '');

  sendMoney = () => {
    this.setState({ loading: true });
    fetch(`${BASEURL}/api/user/send_money_all_mail/${this.trip_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: null,
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({
          modalNotification: {
            type: 'success',
            title: 'Nhắc nhở thành công!',
            description: 'Thông báo nhắc nhở đã được gửi tới email của các thành viên.',
            modalVisible: true,
          },
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({
          modalNotification: {
            type: 'error',
            title: error,
            description: 'Vui lòng kiểm tra lại.',
            modalVisible: true,
          },
          loading: false,
        })
      });
  };

  getTotalMoneyAllUserInOneTrip = async () => {
    this.setState({ loading: true });
    await fetch(`${BASEURL}/api/transactionUser/get_total_money_user/${this.trip_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        await this.setState({
          data: res.listUser,
          loading: false,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  handleRemind = (result: boolean) => {
    if(result){
      this.setState({ modalNotification: {
        type: 'success',
        title: 'Nhắc nhở thành công',
        description: 'Lời nhắc nhở đã được gửi tới email của thành viên',
        modalVisible: true,
      }})
    }else {
      this.setState({ modalNotification: {
        type: 'error',
        title: 'Nhắc nhở thất bại',
        description: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
        modalVisible: true,
      }})
    }
  }

  handleResolve = () => {
    this.setState({ modalNotification: {
      type: 'error',
      title: 'Giải quyết thất bại',
      description: 'Tính năng giải quyết đang trong quá trình phát triển',
      modalVisible: true,
    }})
  }

  handleLoading = (isLoading: boolean) => {
    this.setState({ loading: isLoading});
  }

  render() {
    return (
      <View style={BalanceScreenStyles.container}>
        <ModalLoading  isVisible={this.state.loading} />
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({ modalNotification: {modalVisible : false}})}
        />
        <View style={BalanceScreenStyles.containerHeader}>
          <View style={BalanceScreenStyles.header}>
            <TouchableOpacity
                style={BalanceScreenStyles.cancel}
                activeOpacity={0.5}
                onPress={() => {
                    this.props.navigation.goBack();
                }}
            >
                <Ionicons name="ios-arrow-back" size={32} color={Colors.white} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={BalanceScreenStyles.addContact}>Chi Phí Nhóm</Text>
            <View style={BalanceScreenStyles.save} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => 
              <ListItemBalance 
                data={item} 
                tripId={this.trip_id}
                handleRemind={this.handleRemind}
                handleResolve={this.handleResolve}
                handleLoading={this.handleLoading}
              />
            }
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
        <View style={{ width: '100%', height: screenHeight / 8 }}>
        {this.state.data.length > 0 && 
          <TouchableOpacity
            onPress={() => this.sendMoney()}
            style={{
              flex: 1,
              margin: screenWidth / 24,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: Colors.tintColor,
            }}
          >
            <Text style={{ fontSize: 18, color: Colors.white, fontWeight: 'bold' }}>Nhắc nhở tất cả thành viên</Text>
          </TouchableOpacity>}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(BalanceScreen);
