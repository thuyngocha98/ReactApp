import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Alert } from 'react-native';
import Colors from '../../../../constants/Colors';
import { TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import ChooseMultiplePeopleScreenStyles from '../../../../styles/ExpenseScreenStyles/ChoosePayerScreenStyles/ChooseMultiplePeopleScreenStyles/ChooseMultiplePeopleScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import { thumbnails, number2money } from '../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../api/api';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  moneyInputs?: any[];
  moneyCurrent?: number;
  moneyLeft?: number;
};

class ChooseMultiplePeopleScreen extends Component<Props, States> {
  totalMoney: string;
  listUser: any[];
  state = {
    moneyInputs: [],
    moneyCurrent: 0,
    moneyLeft: 0,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  componentWillMount() {
    this.totalMoney = this.props.navigation.getParam('totalMoney', '0');
    this.listUser = this.props.navigation.getParam('listUser', '');
    this.setState({
      moneyLeft: parseInt(this.totalMoney),
    });
  }

  async caculateTotalMoney() {
    let moneyInput = 0;
    for (var i = 0; i < this.listUser.length; i++) {
      moneyInput +=
        this.state.moneyInputs[i] !== undefined && this.state.moneyInputs[i] !== ''
          ? parseInt(this.state.moneyInputs[i])
          : 0;
    }
    this.setState({
      moneyCurrent: moneyInput,
      moneyLeft: parseInt(this.totalMoney) - moneyInput,
    });
  }

  async functionDone(list_user) {
    let listTypeUser = [];
    for (let i = 0; i < list_user.length; i++) {
      if (Number.isInteger(parseInt(this.state.moneyInputs[i]))) {
        list_user[i].type = parseInt(this.state.moneyInputs[i]);
      } else {
        list_user[i].type = -1;
      }
    }

    this.props.navigation.navigate('InputExpenseScreen', { listTypeUser: list_user });
  }

  render() {
    const { navigation } = this.props;
    const listUser = navigation.getParam('listUser', '');
    const list_user = navigation.getParam('list_user', '');
    return (
      <View style={ChooseMultiplePeopleScreenStyles.container}>
        <View style={ChooseMultiplePeopleScreenStyles.containerHeader}>
          <View style={ChooseMultiplePeopleScreenStyles.header}>
            <TouchableOpacity
              style={ChooseMultiplePeopleScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={30} color={Colors.white} />
              <Text style={ChooseMultiplePeopleScreenStyles.textCancel}>Choose payer</Text>
            </TouchableOpacity>
            <Text style={ChooseMultiplePeopleScreenStyles.addContact}>Enter paid amounts</Text>
            <TouchableOpacity
              style={ChooseMultiplePeopleScreenStyles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.state.moneyLeft === 0
                  ? this.functionDone(list_user)
                  : Alert.alert('The payment values do not add up to the total cost.');
              }}
            >
              <Text style={ChooseMultiplePeopleScreenStyles.add}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={ChooseMultiplePeopleScreenStyles.flatlist}>
          <FlatList
            data={listUser}
            extraData={this.state}
            renderItem={({ item, index }) => {
              const thumbnail =
                item.user_id.avatar.length > 2
                  ? { uri: `${BASEURL}/images/avatars/${item.user_id.avatar}` }
                  : thumbnails['avatar' + item.user_id.avatar];
              return (
                <View style={ChooseMultiplePeopleScreenStyles.mainFlatlist}>
                  <View style={ChooseMultiplePeopleScreenStyles.containerFlatlist}>
                    <View style={ChooseMultiplePeopleScreenStyles.avatar}>
                      <Image style={ChooseMultiplePeopleScreenStyles.image} source={thumbnail} />
                    </View>
                    <View style={ChooseMultiplePeopleScreenStyles.name}>
                      <Text style={ChooseMultiplePeopleScreenStyles.txt}>{item.user_id.name}</Text>
                    </View>
                    <View style={ChooseMultiplePeopleScreenStyles.viewInputMoney}>
                      <View style={ChooseMultiplePeopleScreenStyles.viewVND}>
                        <Text style={ChooseMultiplePeopleScreenStyles.txtVND}>VND</Text>
                      </View>
                      <View style={ChooseMultiplePeopleScreenStyles.viewInput}>
                        <TextInput
                          style={ChooseMultiplePeopleScreenStyles.input}
                          onChangeText={async (text) => {
                            text = text.toString().replace(/,/g, '');
                            let { moneyInputs } = this.state;
                            moneyInputs[index] = text;
                            await this.setState({
                              moneyInputs,
                            });
                            this.caculateTotalMoney();
                          }}
                          value={
                            this.state.moneyInputs[index] !== undefined && this.state.moneyInputs[index] !== ''
                              ? number2money(parseInt(this.state.moneyInputs[index]))
                              : ''
                          }
                          placeholder="0,00"
                          maxLength={13}
                          keyboardType="number-pad"
                          autoCorrect={false}
                          underlineColorAndroid={'transparent'}
                        />
                        <View style={{ height: 1, backgroundColor: Colors.black }} />
                      </View>
                    </View>
                  </View>
                  <View style={ChooseMultiplePeopleScreenStyles.underLine} />
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={ChooseMultiplePeopleScreenStyles.footer}>
          <View style={ChooseMultiplePeopleScreenStyles.line1}>
            <Text style={ChooseMultiplePeopleScreenStyles.moneyTotal}>
              {number2money(this.state.moneyCurrent)} VND of
            </Text>
            <Text style={ChooseMultiplePeopleScreenStyles.moneyTotal}>{` ${number2money(this.totalMoney)}`} VND</Text>
          </View>
          <View style={ChooseMultiplePeopleScreenStyles.line2}>
            <Text
              style={[
                ChooseMultiplePeopleScreenStyles.moneyLeft,
                {
                  color:
                    this.state.moneyLeft > 0
                      ? Colors.black
                      : this.state.moneyLeft == 0
                      ? Colors.mediumseagreen
                      : Colors.orangered,
                },
              ]}
            >
              {number2money(this.state.moneyLeft)} VND left
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ChooseMultiplePeopleScreen);
