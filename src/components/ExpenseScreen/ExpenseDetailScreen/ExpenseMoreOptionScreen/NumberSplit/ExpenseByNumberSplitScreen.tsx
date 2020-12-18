import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StatusBar,
  Keyboard,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { screenWidth } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import ExpenseByNumberSplitScreenStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/NumberSplit/ExpenseByNumberSplitScreenStyles';
import { thumbnails, number2money } from '../../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../../api/api';
import ModalNotification from '../../../../components/ModalNotification';

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
  modalNotification?: {
    modalVisible?: boolean,
    type?: string,
    title?: string,
    description?: string,
    onPress?: () => void;
  },
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
    moneyLeft: parseInt(this.props.navigation.getParam('totalMoney', '0')),
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {}
    },
  };

  async caculateTotalMoney(totalMoney, listUser) {
    let moneyInput = 0;
    for (var i = 0; i < listUser.length; i++) {
      moneyInput +=
        this.state.moneyInputs[i] !== undefined && this.state.moneyInputs[i] !== ''
          ? parseInt(this.state.moneyInputs[i])
          : 0;
    }
    this.setState({
      moneyCurrent: moneyInput,
      moneyLeft: parseInt(totalMoney) - moneyInput,
    });
  }

  createListUser(list_user) {
    Keyboard.dismiss();
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
      this.setState({modalNotification: {
        type: 'error',
        title: 'Số tiền chia không hợp lệ!',
        description: 'Vui lòng chia hết số tiền cần thanh toán',
        modalVisible: true,
      }})
    }
  }

  render() {
    const { navigation } = this.props;
    const list_user = navigation.getParam('list_user', '');
    const userPayer = navigation.getParam('userPayer', []);
    const listUser = this.props.navigation.getParam('listUser', '');
    const totalMoney = this.props.navigation.getParam('totalMoney', '0');
    return (
      <View style={ExpenseByNumberSplitScreenStyles.container}>
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({modalNotification: {modalVisible: false}})}
        />
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
            <Text style={ExpenseByNumberSplitScreenStyles.addContact}>Chi tiết</Text>
            <TouchableOpacity
              style={ExpenseByNumberSplitScreenStyles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.createListUser(list_user);
              }}
            >
              <Text style={ExpenseByNumberSplitScreenStyles.add}>Xong</Text>
            </TouchableOpacity>
          </View>
        </View>
          <View style={ExpenseByNumberSplitScreenStyles.categoryTypeGroup}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                navigation.navigate('ExpenseMoreOptionScreen', {
                  listUser: listUser,
                  list_user: list_user,
                  totalMoney: totalMoney,
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
                  listUser: listUser,
                  list_user: list_user,
                  totalMoney: totalMoney,
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
                Tùy Chọn
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ExpenseByNumberSplitScreenStyles.flatlist}>
            <FlatList
              data={listUser}
              extraData={this.state}
              renderItem={({ item, index }) => {
                const thumbnail =
                  item.user_id.avatar.length > 2
                    ? { uri: `${BASEURL}/images/avatars/${item.user_id.avatar}` }
                    : thumbnails['avatar' + item.user_id.avatar];
                return (
                  <View style={ExpenseByNumberSplitScreenStyles.mainFlatlist}>
                    <View style={ExpenseByNumberSplitScreenStyles.containerFlatlist}>
                      <View style={ExpenseByNumberSplitScreenStyles.avatar}>
                        <Image style={ExpenseByNumberSplitScreenStyles.image} source={thumbnail} />
                      </View>
                      <View style={ExpenseByNumberSplitScreenStyles.name}>
                        <Text numberOfLines={1} style={ExpenseByNumberSplitScreenStyles.txt}>{item.user_id.name}</Text>
                      </View>
                      <View style={ExpenseByNumberSplitScreenStyles.viewInputMoney}>
                        <View style={ExpenseByNumberSplitScreenStyles.viewVND}>
                          <Text style={ExpenseByNumberSplitScreenStyles.txtVND}>VND</Text>
                        </View>
                        <View style={ExpenseByNumberSplitScreenStyles.viewInput}>
                          <TextInput
                            style={ExpenseByNumberSplitScreenStyles.input}
                            onChangeText={async (text) => {
                              text = text.toString().replace(/[^0-9]+/g, '');
                              let { moneyInputs } = this.state;
                              moneyInputs[index] = text;
                              await this.setState({
                                moneyInputs,
                              });
                              this.caculateTotalMoney(totalMoney, listUser);
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
                    </View>
                    <View style={ExpenseByNumberSplitScreenStyles.underLine} />
                  </View>
                );
              }}
              keyExtractor={(item) => item.user_id._id.toString()}
            />
          </View>
        <View style={ExpenseByNumberSplitScreenStyles.footer}>
          <View style={ExpenseByNumberSplitScreenStyles.line1}>
            <Text style={ExpenseByNumberSplitScreenStyles.moneyTotal}>
              {number2money(this.state.moneyCurrent)} VND /
            </Text>
            <Text style={ExpenseByNumberSplitScreenStyles.moneyTotal}>{totalMoney ? ` ${number2money(totalMoney)}` : 0} VND</Text>
          </View>
          <View style={ExpenseByNumberSplitScreenStyles.line2}>
            <Text style={{ fontSize: screenWidth / 24 }}>Đầu ra còn lại: </Text>
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
            ></Text>
            <Text style={{ fontSize: screenWidth / 24, color: 'purple' }}>
              {number2money(this.state.moneyLeft)} VND
            </Text>
            <Text numberOfLines={1} style={{ fontSize: screenWidth / 24 }}> chưa thanh toán</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ExpenseByNumberSplitScreen);
