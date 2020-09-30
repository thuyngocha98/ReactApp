import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  Keyboard,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import ListItemNumberSplit from './ListItemNumberSplit';
import { APPBAR_HEIGHT } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import ExpenseByNumberSplitScreenStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/NumberSplit/ExpenseByNumberSplitScreenStyles';
import { thumbnails, number2money } from '../../../../../constants/FunctionCommon';
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

class ExpenseByNumberSplitScreen extends Component<Props, States> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  state = {
    moneyInputs: [],
    moneyCurrent: 0,
    moneyLeft: 0,
  };
  totalMoney: string;
  listUser: any[];

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

  createListUser(list_user, totalMoney) {
    if (this.state.moneyLeft === 0) {
      for (let i = 0; i < list_user.length; i++) {
        if (this.state.moneyInputs[i] !== undefined && this.state.moneyInputs[i] !== '') {
          list_user[i].amount_user = this.state.moneyInputs[i];
        } else {
          list_user[i].amount_user = 0;
        }
      }
      this.props.navigation.navigate('InputExpenseScreen', { listTypeUser: list_user });
    } else {
    }
  }

  scroll: JSX.Element;
  _scrollToInput(position) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToPosition(position, position, true);
  }

  render() {
    const { navigation } = this.props;
    const list_user = navigation.getParam('list_user', '');
    const userPayer = navigation.getParam('userPayer', []);
    return (
      <View style={ExpenseByNumberSplitScreenStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={ExpenseByNumberSplitScreenStyles.containerHeader}>
          <View style={ExpenseByNumberSplitScreenStyles.header}>
            <TouchableOpacity
              style={ExpenseByNumberSplitScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('InputExpenseScreen');
              }}
            >
              <Ionicons name="ios-close" size={45} color={Colors.white} />
            </TouchableOpacity>
            <Text style={ExpenseByNumberSplitScreenStyles.addContact}>Expense details</Text>
            <TouchableOpacity
              style={ExpenseByNumberSplitScreenStyles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.createListUser(list_user, this.totalMoney);
              }}
            >
              <Text style={ExpenseByNumberSplitScreenStyles.add}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAwareScrollView
          style={{ flex: 1, flexDirection: 'column' }}
          innerRef={(ref) => {
            this.scroll = ref;
          }}
          keyboardShouldPersistTaps="always" // can click button when is openning keyboard
        >
          <View style={ExpenseByNumberSplitScreenStyles.categoryTypeGroup}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                navigation.navigate('ExpenseMoreOptionScreen', {
                  listUser: this.listUser,
                  list_user: list_user,
                  totalMoney: this.totalMoney,
                  userPayer: userPayer,
                });
              }}
            >
              <Text
                style={[
                  ExpenseByNumberSplitScreenStyles.equal,
                  [
                    {
                      backgroundColor: Colors.white,
                      color: Colors.tintColor,
                    },
                  ],
                ]}
              >
                {' '}
                ={' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
              <Text
                style={[
                  ExpenseByNumberSplitScreenStyles.number,
                  [
                    {
                      backgroundColor: Colors.tintColor,
                      color: Colors.white,
                    },
                  ],
                ]}
              >
                1.23
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                navigation.navigate('ExpenseByPlusOrMinusScreen', {
                  listUser: this.listUser,
                  list_user: list_user,
                  totalMoney: this.totalMoney,
                  userPayer: userPayer,
                });
              }}
            >
              <Text
                style={[
                  ExpenseByNumberSplitScreenStyles.plusOrMinus,
                  [
                    {
                      backgroundColor: Colors.white,
                      color: Colors.tintColor,
                    },
                  ],
                ]}
              >
                custom
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ExpenseByNumberSplitScreenStyles.flatlist}>
            <FlatList
              data={this.listUser}
              extraData={this.state}
              renderItem={({ item, index }) => {
                const thumbnail =
                  item.user_id.avatar.length > 2
                    ? { uri: `data:image/png;base64,${item.user_id.avatar}` }
                    : thumbnails['avatar' + item.user_id.avatar];
                return (
                  <View style={ExpenseByNumberSplitScreenStyles.mainFlatlist}>
                    <View style={ExpenseByNumberSplitScreenStyles.containerFlatlist}>
                      <View style={ExpenseByNumberSplitScreenStyles.avatar}>
                        <Image style={ExpenseByNumberSplitScreenStyles.image} source={thumbnail} />
                      </View>
                      <View style={ExpenseByNumberSplitScreenStyles.name}>
                        <Text style={ExpenseByNumberSplitScreenStyles.txt}>{item.user_id.name}</Text>
                      </View>
                      <View style={ExpenseByNumberSplitScreenStyles.viewInputMoney}>
                        <View style={ExpenseByNumberSplitScreenStyles.viewVND}>
                          <Text style={ExpenseByNumberSplitScreenStyles.txtVND}>VND</Text>
                        </View>
                        <View style={ExpenseByNumberSplitScreenStyles.viewInput}>
                          <TextInput
                            style={ExpenseByNumberSplitScreenStyles.input}
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
                            keyboardType="number-pad"
                            autoCorrect={false}
                            underlineColorAndroid={'transparent'}
                            onFocus={() => {
                              this._scrollToInput(index * 75);
                            }}
                          />
                          <View style={{ height: 1, backgroundColor: Colors.black }} />
                        </View>
                      </View>
                    </View>
                    <View style={ExpenseByNumberSplitScreenStyles.underLine} />
                  </View>
                );
              }}
              keyExtractor={(item) => item.user_id._id.toString()}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={ExpenseByNumberSplitScreenStyles.footer}>
          <View style={ExpenseByNumberSplitScreenStyles.line1}>
            <Text style={ExpenseByNumberSplitScreenStyles.moneyTotal}>
              {number2money(this.state.moneyCurrent)} VND of
            </Text>
            <Text style={ExpenseByNumberSplitScreenStyles.moneyTotal}>{` ${number2money(this.totalMoney)}`} VND</Text>
          </View>
          <View style={ExpenseByNumberSplitScreenStyles.line2}>
            <Text
              style={[
                ExpenseByNumberSplitScreenStyles.moneyLeft,
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

export default connect(mapStateToProps)(ExpenseByNumberSplitScreen);
