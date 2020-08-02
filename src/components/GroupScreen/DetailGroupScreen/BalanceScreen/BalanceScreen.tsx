import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import { View, TouchableOpacity, Text, StatusBar, Image, Button, Alert, FlatList } from 'react-native';
import BalanceScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/BalanceScreenStyles';
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import ListItemBalance from './ListItemBalance';
import { APPBAR_HEIGHT } from '../../../../constants/Dimensions';
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
      title: 'Group balances',
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
            <Text style={BalanceScreenStyles.textHeaderLeft}>Cancel</Text>
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
    console.log(this.state.data);
    return (
      <View style={BalanceScreenStyles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListItemBalance data={item} tripId={this.trip_id} />}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(BalanceScreen);
