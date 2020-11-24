import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import BalanceScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/BalanceScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import ListItemBalance from './ListItemBalance';
import { APPBAR_HEIGHT, screenHeight, screenWidth } from '../../../../constants/Dimensions';
import { BASEURL } from '../../../../api/api';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  data?: any[];
  loading?: boolean;
};

class BalanceScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chi Phí Nhóm',
      headerStyle: {
        elevation: 0,
        textAlign: 'center',
        backgroundColor: Colors.tintColor,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20,
      },
      headerRight: <View style={BalanceScreenStyles.headerRight}></View>,
      headerLeft: (
        <View style={BalanceScreenStyles.headerLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="ios-arrow-back" size={32} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.getTotalMoneyAllUserInOneTrip();
  }

  trip_id = this.props.navigation.getParam('tripId', '');

  sendMoney = () => {
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
        // ToastAndroid.showWithGravityAndOffset('Export done', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      })
      .catch((error) => {
        // ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      });
  };

  getTotalMoneyAllUserInOneTrip = async () => {
    console.log(this.trip_id);
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

  render() {
    return (
      <View style={BalanceScreenStyles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <ListItemBalance data={item} tripId={this.trip_id} />}
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
