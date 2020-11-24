import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../../constants/Colors';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import ExpenseMoreOptionScreenStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/EqualSplit/ExpenseMoreOptionScreenStyles';
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
  arrChecked?: any[];
  moneySingle?: number;
  numberPeople?: number;
  checkAll?: boolean;
  modalNotification?: {
    modalVisible?: boolean,
    type?: string,
    title?: string,
    description?: string,
    onPress?: () => void;
  },
};

class ExpenseMoreOptionScreen extends Component<Props, States> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      arrChecked: [],
      moneySingle: 0,
      numberPeople: 0,
      checkAll: true,
      modalNotification: {
        modalVisible: false,
        type: 'success',
        title: '',
        description: '',
        onPress: () => {}
      },
    };
  }

  componentDidMount() {
    let totalMoney = this.props.navigation.getParam('totalMoney', '');
    let list_user = this.props.navigation.getParam('list_user', '');
    this.checkRealTime(list_user, totalMoney);
  }

  checkRealTime(list_user, totalMoney) {
    var numberPeopleSplit = 0;
    for (let i = 0; i < list_user.length; i++) {
      if (this.state.arrChecked[i] == true) numberPeopleSplit++;
    }

    if (numberPeopleSplit < list_user.length) {
      const amount_user = Math.round(totalMoney / numberPeopleSplit);
      this.setState({
        moneySingle: amount_user,
        numberPeople: numberPeopleSplit,
        checkAll: false,
      });
    } else {
      const amount_user = Math.round(totalMoney / list_user.length);
      this.setState({
        moneySingle: amount_user,
        numberPeople: list_user.length,
        checkAll: true,
      });
    }
  }

  createListUser(list_user, totalMoney) {
    if(this.state.moneySingle !== Infinity){
      var numberPeopleSplit = 0;
      for (let i = 0; i < list_user.length; i++) {
        if (this.state.arrChecked[i] == true) numberPeopleSplit++;
      }

      if (numberPeopleSplit < list_user.length) {
        const amount_user = Math.round(totalMoney / numberPeopleSplit);
        for (let i = 0; i < list_user.length; i++) {
          if (this.state.arrChecked[i] == true) list_user[i].amount_user = amount_user;
          else list_user[i].amount_user = 0;
        }
      }

      this.props.navigation.navigate('InputExpenseScreen', { listTypeUser: list_user });
    }else {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Số tiền chia đều không hợp lệ!',
        description: 'Vui lòng chọn thành viên chia tiền',
        modalVisible: true,
      }})
    }
  }

  render() {
    const { navigation } = this.props;
    const listUser = navigation.getParam('listUser', '');
    const totalMoney = navigation.getParam('totalMoney', '');
    const list_user = navigation.getParam('list_user', '');
    const userPayer = navigation.getParam('userPayer', []);
    const thumbnail =
      userPayer.user_id.avatar.length > 2
        ? { uri: `${BASEURL}/images/avatars/${userPayer.user_id.avatar}` }
        : thumbnails['avatar' + userPayer.user_id.avatar];

    return (
      <View style={ExpenseMoreOptionScreenStyles.container}>
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({modalNotification: {modalVisible: false}})}
        />
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={ExpenseMoreOptionScreenStyles.containerHeader}>
          <View style={ExpenseMoreOptionScreenStyles.header}>
            <TouchableOpacity
              style={ExpenseMoreOptionScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('InputExpenseScreen');
              }}
            >
              <Ionicons name="ios-close" size={45} color={Colors.white} />
            </TouchableOpacity>
            <Text style={ExpenseMoreOptionScreenStyles.addContact}>Chi tiết</Text>
            <TouchableOpacity
              style={ExpenseMoreOptionScreenStyles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.createListUser(list_user, totalMoney);
              }}
            >
              <Text style={ExpenseMoreOptionScreenStyles.add}>Xong</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={ExpenseMoreOptionScreenStyles.paidBy}>
          <View style={ExpenseMoreOptionScreenStyles.imageAvatar}>
            <Image style={ExpenseMoreOptionScreenStyles.avatar} source={thumbnail} />
          </View>
          <View style={ExpenseMoreOptionScreenStyles.content}>
            <Text style={ExpenseMoreOptionScreenStyles.txt1}>
              {`Thành viên thanh toán:  `}
            </Text>
            <Text style={ExpenseMoreOptionScreenStyles.txt2}>{userPayer.user_id.name}</Text>
          </View>
        </View>
        <View style={ExpenseMoreOptionScreenStyles.underLineInput} />
        <View style={ExpenseMoreOptionScreenStyles.contentSplit}>
          <Text style={ExpenseMoreOptionScreenStyles.title1}>Chia đều</Text>
          <Text style={ExpenseMoreOptionScreenStyles.title2}>Chọn người tham gia, số tiền sẽ được chia đều.</Text>
        </View>
        <View style={ExpenseMoreOptionScreenStyles.categoryTypeGroup}>
          <TouchableOpacity style={ExpenseMoreOptionScreenStyles.viewTabView} onPress={() => {}}>
            <Text
              style={[
                ExpenseMoreOptionScreenStyles.equal,
                [
                  {
                    backgroundColor: Colors.tintColor,
                    color: Colors.white,
                  },
                ],
              ]}
            >
              {' '}
              ={' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ExpenseMoreOptionScreenStyles.viewTabView}
            onPress={() => {
              navigation.navigate('ExpenseByNumberSplitScreen', {
                listUser: listUser,
                list_user: list_user,
                totalMoney: totalMoney,
                userPayer: userPayer,
                thumbnail: thumbnail,
              });
            }}
          >
            <Text
              style={[
                ExpenseMoreOptionScreenStyles.number,
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
          <TouchableOpacity
            style={ExpenseMoreOptionScreenStyles.viewTabView}
            onPress={() => {
              navigation.navigate('ExpenseByPlusOrMinusScreen', {
                listUser: listUser,
                list_user: list_user,
                totalMoney: totalMoney,
                userPayer: userPayer,
                thumbnail: thumbnail,
              });
            }}
          >
            <Text
              style={[
                ExpenseMoreOptionScreenStyles.plusOrMinus,
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
        <View style={ExpenseMoreOptionScreenStyles.flatlist}>
          <FlatList
            data={listUser}
            extraData={this.state}
            renderItem={({ item, index }) => (
              (this.state.arrChecked[index] =
                this.state.arrChecked[index] === undefined ? true : this.state.arrChecked[index]),
              (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let { arrChecked } = this.state;
                    if (arrChecked[index] === undefined) arrChecked[index] = true;
                    arrChecked[index] = !arrChecked[index];
                    await this.setState({
                      arrChecked,
                    });
                    this.checkRealTime(list_user, totalMoney);
                  }}
                >
                  <View style={ExpenseMoreOptionScreenStyles.flatlistMember}>
                    <View style={ExpenseMoreOptionScreenStyles.listMember}>
                      <View style={ExpenseMoreOptionScreenStyles.imageAvatar}>
                        <Image
                          style={[
                            ExpenseMoreOptionScreenStyles.avatar,
                            { opacity: this.state.arrChecked[index] ? 1 : 0.3 },
                          ]}
                          source={
                            item.user_id.avatar.length > 2
                              ? { uri: `${BASEURL}/images/avatars/${item.user_id.avatar}` }
                              : thumbnails['avatar' + item.user_id.avatar]
                          }
                        />
                      </View>
                      <View style={ExpenseMoreOptionScreenStyles.content}>
                        <Text
                          style={[
                            ExpenseMoreOptionScreenStyles.txt2,
                            { color: this.state.arrChecked[index] ? Colors.black : Colors.gray },
                          ]}
                        >
                          {item.user_id.name}
                        </Text>
                      </View>
                      <View style={ExpenseMoreOptionScreenStyles.iconRight}>
                        <Ionicons
                          name="ios-checkmark-circle"
                          size={30}
                          color={this.state.arrChecked[index] ? Colors.mediumseagreen : Colors.gray}
                        />
                      </View>
                    </View>
                    <View style={ExpenseMoreOptionScreenStyles.underLineInput} />
                  </View>
                </TouchableOpacity>
              )
            )}
            keyExtractor={(item) => item.user_id._id.toString()}
          />
        </View>
        {!this.state.modalNotification.modalVisible && 
        <View style={ExpenseMoreOptionScreenStyles.viewTabBar}>
          <View style={ExpenseMoreOptionScreenStyles.tabBar}>
            <View style={ExpenseMoreOptionScreenStyles.contentBar}>
              <Text style={ExpenseMoreOptionScreenStyles.moneyPerson}>
                {number2money(this.state.moneySingle)} VND/người
              </Text>
              <Text style={ExpenseMoreOptionScreenStyles.numberPeople}>
                {`(` + this.state.numberPeople + ` thành viên)`}
              </Text>
            </View>
            <View style={ExpenseMoreOptionScreenStyles.viewSeparate}>
              <View style={ExpenseMoreOptionScreenStyles.separate} />
            </View>
            <View style={ExpenseMoreOptionScreenStyles.all}>
              <Text style={ExpenseMoreOptionScreenStyles.txtAll}>Tất Cả</Text>
              <View style={ExpenseMoreOptionScreenStyles.iconAll}>
                <Ionicons
                  name="ios-checkmark-circle"
                  size={30}
                  color={this.state.checkAll ? Colors.mediumseagreen : Colors.gray}
                />
              </View>
            </View>
          </View>
        </View>}
      </View>
    );
  }
}

export default connect(mapStateToProps)(ExpenseMoreOptionScreen);
