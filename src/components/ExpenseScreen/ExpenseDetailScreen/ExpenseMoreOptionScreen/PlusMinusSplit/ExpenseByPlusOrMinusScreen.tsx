import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  ToastAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Colors from '../../../../../constants/Colors';
import ExpenseByPlusOrMinusStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/PlusOrMinusSplit/ExpenseByPlusOrMinusStyles';
import { thumbnails, number2money } from '../../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../../api/api';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  data1?: any[];
  data2?: any[];
  moneyInputs?: any[];
  arrChecked?: any[];
};

class ExpenseByPlusOrMinusScreen extends Component<Props, States> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  state = {
    data1: [],
    data2: [],
    moneyInputs: [],
    arrChecked: [],
  };

  totalMoney: string;
  listUser: any[];

  componentWillMount() {
    this.totalMoney = this.props.navigation.getParam('totalMoney', '0');
    this.listUser = this.props.navigation.getParam('listUser', '');
    this.setState({
      data2: this.listUser,
    });
  }

  deleteFromList(item) {
    let newData1 = this.state.data1.filter(function (obj) {
      return obj !== item;
    });
    this.setState({
      data1: newData1,
    });
  }

  addToList(item) {
    const find = (user) => user === item;
    if (!this.state.data1.some(find)) {
      let newData1 = [...this.state.data1, item];
      this.setState({
        data1: newData1,
      });
    }
  }

  createListUser(list_user) {
    for (let i = 0; i < list_user.length; i++) {
      list_user[i].amount_user = 0;
    }
    let totalInput = 0;
    for (let i = 0; i < this.state.data1.length; i++) {
      totalInput += parseInt(this.state.moneyInputs[i]);
      for (let j = 0; j < list_user.length; j++) {
        if (this.state.data1[i].user_id._id == list_user[j].user_id) {
          list_user[j].amount_user = parseInt(this.state.moneyInputs[i]);
        }
      }
    }
    let remain = parseInt(this.totalMoney) - totalInput;
    if (remain < 0) {
      // ToastAndroid.showWithGravityAndOffset(
      //     'The payment value is not equal to the total cost, please enter again!',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.BOTTOM,
      //     25,
      //     50,
      // );
    } else {
      let numberPeopleSplit = 0;
      for (let i = 0; i < list_user.length; i++) {
        if (this.state.arrChecked[i] == true) numberPeopleSplit++;
      }
      let amount = Math.round(remain / numberPeopleSplit);
      for (let j = 0; j < list_user.length; j++) {
        if (this.state.arrChecked[j] == true) {
          list_user[j].amount_user += amount;
        }
      }
      this.props.navigation.navigate('InputExpenseScreen', { listTypeUser: list_user });
    }
  }

  render() {
    const { navigation } = this.props;
    const list_user = navigation.getParam('list_user', '');
    const userPayer = navigation.getParam('userPayer', []);
    return (
      <View style={ExpenseByPlusOrMinusStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={ExpenseByPlusOrMinusStyles.containerHeader}>
          <View style={ExpenseByPlusOrMinusStyles.header}>
            <TouchableOpacity
              style={ExpenseByPlusOrMinusStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('InputExpenseScreen');
              }}
            >
              <Ionicons name="ios-close" size={45} color={Colors.white} />
            </TouchableOpacity>
            <Text style={ExpenseByPlusOrMinusStyles.addContact}>Chi Tiết</Text>
            <TouchableOpacity
              style={ExpenseByPlusOrMinusStyles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.createListUser(list_user);
              }}
            >
              <Text style={ExpenseByPlusOrMinusStyles.add}>Kết thúc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={ExpenseByPlusOrMinusStyles.categoryTypeGroup}>
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
                ExpenseByPlusOrMinusStyles.equal,
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
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate('ExpenseByNumberSplitScreen', {
                listUser: this.listUser,
                list_user: list_user,
                totalMoney: this.totalMoney,
                userPayer: userPayer,
              });
            }}
          >
            <Text
              style={[
                ExpenseByPlusOrMinusStyles.number,
                [
                  {
                    backgroundColor: Colors.white,
                    color: Colors.tintColor,
                  },
                ],
              ]}
            >
              1.23
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
            <Text
              style={[
                ExpenseByPlusOrMinusStyles.plusOrMinus,
                [
                  {
                    backgroundColor: Colors.tintColor,
                    color: Colors.white,
                  },
                ],
              ]}
            >
              Tùy Chọn
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={ExpenseByPlusOrMinusStyles.categoryList}>
          <View style={ExpenseByPlusOrMinusStyles.flatlist1}>
            {this.state.data1.length > 0 ? (
              <FlatList
                data={this.state.data1}
                extraData={this.state}
                renderItem={({ item, index }) => {
                  const thumbnail =
                    item.user_id.avatar.length > 2
                      ? { uri: `${BASEURL}/images/avatars/${item.user_id.avatar}` }
                      : thumbnails['avatar' + item.user_id.avatar];
                  return (
                    <View style={ExpenseByPlusOrMinusStyles.mainFlatlist}>
                      <View style={ExpenseByPlusOrMinusStyles.containerFlatlist}>
                        <View style={ExpenseByPlusOrMinusStyles.avatar1}>
                          <Image style={ExpenseByPlusOrMinusStyles.image} source={thumbnail} />
                        </View>
                        <View style={ExpenseByPlusOrMinusStyles.name}>
                          <Text style={ExpenseByPlusOrMinusStyles.txt}>{item.user_id.name}</Text>
                        </View>
                        <View style={ExpenseByPlusOrMinusStyles.viewInputMoney}>
                          <View style={ExpenseByPlusOrMinusStyles.viewVND}>
                            <Text style={ExpenseByPlusOrMinusStyles.txtVND}>VND</Text>
                          </View>
                          <View style={ExpenseByPlusOrMinusStyles.viewInput}>
                            <TextInput
                              style={ExpenseByPlusOrMinusStyles.input}
                              onChangeText={async (text) => {
                                text = text.toString().replace(/,/g, '');
                                let { moneyInputs } = this.state;
                                moneyInputs[index] = text;
                                await this.setState({
                                  moneyInputs,
                                });
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
                            />
                            <View style={{ height: 1, backgroundColor: Colors.black }} />
                          </View>
                        </View>
                        <TouchableOpacity
                          style={ExpenseByPlusOrMinusStyles.delete}
                          onPress={() => {
                            this.deleteFromList(item);
                          }}
                        >
                          <Feather name="delete" size={25} />
                        </TouchableOpacity>
                      </View>
                      <View style={ExpenseByPlusOrMinusStyles.underLine} />
                    </View>
                  );
                }}
                keyExtractor={(item) => item.user_id._id.toString()}
              />
            ) : null}
          </View>
          <View style={ExpenseByPlusOrMinusStyles.viewTitle}>
            <Text style={ExpenseByPlusOrMinusStyles.txtTitle}>Vui lòng tùy chọn thành viên tham gia.</Text>
          </View>
          <View style={ExpenseByPlusOrMinusStyles.flatlist2}>
            <FlatList
              data={this.state.data2}
              extraData={this.state}
              renderItem={({ item, index }) => (
                (this.state.arrChecked[index] =
                  this.state.arrChecked[index] === undefined ? true : this.state.arrChecked[index]),
                (
                  <View style={ExpenseByPlusOrMinusStyles.flatlistMember}>
                    <View style={ExpenseByPlusOrMinusStyles.listMember}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={async () => {
                          let { arrChecked } = this.state;
                          if (arrChecked[index] === undefined) arrChecked[index] = true;
                          arrChecked[index] = !arrChecked[index];
                          await this.setState({
                            arrChecked,
                          });
                        }}
                        style={ExpenseByPlusOrMinusStyles.contentLeft}
                      >
                        <View style={ExpenseByPlusOrMinusStyles.imageAvatar}>
                          <Image
                            style={[
                              ExpenseByPlusOrMinusStyles.avatar,
                              { opacity: this.state.arrChecked[index] ? 1 : 0.3 },
                            ]}
                            source={
                              item.user_id.avatar.length > 2
                                ? { uri: `${BASEURL}/images/avatars/${item.user_id.avatar}` }
                                : thumbnails['avatar' + item.user_id.avatar]
                            }
                          />
                        </View>
                        <View style={ExpenseByPlusOrMinusStyles.content}>
                          <Text
                            style={[
                              ExpenseByPlusOrMinusStyles.txt2,
                              {
                                color: this.state.arrChecked[index] ? Colors.black : Colors.gray,
                                fontSize: this.state.arrChecked[index] ? 18 : 16,
                                fontWeight: this.state.arrChecked[index] ? '500' : '400',
                              },
                            ]}
                          >
                            {item.user_id.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={async () => {
                          this.addToList(item);
                        }}
                        style={ExpenseByPlusOrMinusStyles.iconRight}
                      >
                        <Ionicons name="md-add-circle-outline" size={35} color={Colors.mediumseagreen} />
                      </TouchableOpacity>
                    </View>
                    <View style={ExpenseByPlusOrMinusStyles.underLineInput} />
                  </View>
                )
              )}
              keyExtractor={(item) => item.user_id._id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ExpenseByPlusOrMinusScreen);
