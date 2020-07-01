import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StatusBar,
  Alert,
  Keyboard,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import InputExpenseScreenStyles from '../../../styles/ExpenseScreenStyles/InputExpenseScreenStyles/InputExpenseScreenStyles';
import { bindActionCreators } from 'redux';
import { getApiListUserInTrip, saveTripIdInExpense } from '../../../actions/action';
import { BASEURL } from '../../../api/api';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { CheckBox, Input } from 'react-native-elements';
import { screenWidth } from '../../../constants/Dimensions';

function mapStateToProps(state) {
  return {
    listUserInTrip: state.listUserInTrip.listUserInTrip,
    author: state.dataUser.dataUser._id,
  };
}

type Props = {
  author?: any;
  navigation?: any;
  currenGroup?: any;
  getListUserInTrip?: any;
  listUserInTrip?: any;
  dataGroup?: any;
  saveTripId?: any;
};

type States = {
  description?: string;
  money?: string;
  checkDescription?: boolean;
  checkMoney?: boolean;
  location?: any[];
  checked?: boolean;
  txtLocation?: string;
};

class InputExpenseScreen extends Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      money: '',
      checkDescription: false,
      checkMoney: false,
      location: [],
      checked: false,
      txtLocation: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  _navListener: any;
  idPayer = '';
  listTypeUser = [];

  async componentDidMount() {
    // set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('light-content');
      let data = this.props.navigation.getParam('dataGroup', {});
      if (Object.getOwnPropertyNames(data).length === 0) data = this.props.dataGroup;
      this.props.getListUserInTrip(data._id);
    });
  }

  async permissionAndGetLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert("Hey! You don't enable location ");
      this.setState({ checked: false });
    } else {
      let data = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      await this.setState({ location: [data.coords] });
      this.setState({ checked: true });
    }
  }

  addLocation() {
    if (this.state.location.length == 0) this.permissionAndGetLocation();
    else this.setState({ checked: !this.state.checked });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  // send list_user to split screen (output money)
  async prepareSendListUserToSplit(listTypeUser, idPayer) {
    let list_user = await this.createListUser(listTypeUser, idPayer);
    //get user payer
    let Payer;
    let userPayer = [];
    await list_user.forEach((value) => {
      if (value.type > 0) {
        Payer = value.user_id;
      }
    });
    await this.props.listUserInTrip.forEach((value) => {
      if (value.user_id._id == Payer) {
        userPayer = value;
      }
    });
    this.props.navigation.navigate('ExpenseMoreOptionScreen', {
      list_user: list_user,
      listUser: this.props.listUserInTrip,
      totalMoney: this.state.money.replace(/,/g, ''),
      userPayer: userPayer,
    });
  }

  // send list_user to choose multiple people (input money)
  async prepareSendListUserToChoose(listTypeUser, idPayer) {
    let list_user = await this.createListUser(listTypeUser, idPayer);
    this.props.navigation.navigate('ChoosePayerScreen', {
      list_user: list_user,
      listUser: this.props.listUserInTrip,
      totalMoney: this.state.money.replace(/,/g, ''),
    });
  }

  checkDescription(text) {
    if (text === '') {
      this.setState({
        description: text,
        checkDescription: false,
      });
    } else {
      this.setState({
        description: text,
        checkDescription: true,
      });
    }
  }

  async createListUser(listTypeUser, idPayer) {
    const Money = parseInt(this.state.money.replace(/,/g, ''));
    var Payer = idPayer === '' ? this.props.author : idPayer;
    var list_user = [];
    const listUser = this.props.listUserInTrip;
    const amount_user = Math.round(Money / listUser.length);
    if (listTypeUser.length > 0) {
      list_user = listTypeUser;
    } else {
      await listUser.forEach((value) => {
        if (value.user_id._id === Payer) {
          list_user.push({
            type: Money,
            amount_user: amount_user,
            user_id: value.user_id._id,
          });
        } else {
          list_user.push({
            type: -1,
            amount_user: amount_user,
            user_id: value.user_id._id,
          });
        }
      });
    }
    return list_user;
  }

  checkMoney(text) {
    if (text === '') {
      this.setState({
        money: text,
        checkMoney: false,
      });
    } else {
      text = text.toString().replace(/,/g, '');
      this.setState({
        money: text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        checkMoney: true,
      });
    }
  }

  async createTransaction(tripId, listTypeUser, idPayer) {
    const Money = parseInt(this.state.money.replace(/,/g, ''));
    const Description = this.state.description;
    var list_user = await this.createListUser(listTypeUser, idPayer);
    if (this.state.checkDescription && this.state.checkMoney) {
      const data = {
        name: Description,
        author: this.props.author,
        amount: Money,
        trip_id: tripId,
        list_user: list_user,
        location: this.state.txtLocation.length > 0 ? this.state.location : [],
        address: this.state.txtLocation,
      };
      const json = JSON.stringify(data);
      fetch(`${BASEURL}/api/transaction/insert_new_transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then((response) => response.json())
        .then(async (res) => {
          if (res.result === 'ok') {
            this.setState({
              description: '',
              money: '',
              checkDescription: false,
              checkMoney: false,
            });
            ToastAndroid.showWithGravityAndOffset('Save done!', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            await this.props.saveTripId(tripId);
            await this.setState({ location: [], checked: false, txtLocation: '' });
            await this.props.navigation.setParams({ listTypeUser: [], IdPayer: '' });
            this.props.navigation.navigate('GroupScreen');
          } else {
            ToastAndroid.showWithGravityAndOffset('Save error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Keyboard.dismiss();
      ToastAndroid.showWithGravityAndOffset(
        'Please enter full information!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  render() {
    const { navigation } = this.props;
    this.listTypeUser = navigation.getParam('listTypeUser', []);
    this.idPayer = this.props.navigation.getParam('IdPayer', '');
    var Group = navigation.getParam('dataGroup', {});
    if (Object.getOwnPropertyNames(Group).length === 0) Group = this.props.dataGroup;
    return (
      <View style={InputExpenseScreenStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={InputExpenseScreenStyles.containerHeader}>
          <View style={InputExpenseScreenStyles.header}>
            <TouchableOpacity
              style={InputExpenseScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('MainExpenseScreen', { currentGroup: Group.name });
              }}
            >
              <Ionicons name="ios-close" size={45} color={Colors.white} />
            </TouchableOpacity>
            <Text style={InputExpenseScreenStyles.addContact}>Add an expense</Text>
            <TouchableOpacity
              style={InputExpenseScreenStyles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.createTransaction(Group._id, this.listTypeUser, this.idPayer);
              }}
            >
              <Text
                style={[
                  InputExpenseScreenStyles.add,
                  { opacity: this.state.checkDescription && this.state.checkMoney ? 1 : 0.6 },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={InputExpenseScreenStyles.header1}>
          <Text style={InputExpenseScreenStyles.txt1}>
            With
            <Text style={InputExpenseScreenStyles.txt2}>{' you '}</Text>
            and:
          </Text>
          <TouchableOpacity
            style={InputExpenseScreenStyles.nameGroup}
            onPress={() => {
              navigation.navigate('MainExpenseScreen', { currentGroup: Group.name });
            }}
          >
            <Image style={InputExpenseScreenStyles.image} source={require('../../../../assets/images/icon-home.png')} />
            <Text style={InputExpenseScreenStyles.txtAllOf}>All of {Group.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={InputExpenseScreenStyles.underLine} />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={InputExpenseScreenStyles.sectionInput}>
            <View style={InputExpenseScreenStyles.sectionDescription}>
              <View style={InputExpenseScreenStyles.iconDescription}>
                <MaterialIcons name="description" size={38} color={Colors.blackText} style={{ padding: 5 }} />
              </View>
              <View style={InputExpenseScreenStyles.inputDescription}>
                <TextInput
                  onChangeText={(text) => this.checkDescription(text)}
                  style={InputExpenseScreenStyles.txtInputDescription}
                  placeholder="Enter a description"
                  value={this.state.description}
                  keyboardType="visible-password"
                  autoCorrect={false}
                  autoCapitalize={'words'}
                  autoFocus
                  underlineColorAndroid={'transparent'}
                />
                <View style={InputExpenseScreenStyles.underLineInput} />
              </View>
            </View>
            <View style={InputExpenseScreenStyles.sectionMoney}>
              <View style={InputExpenseScreenStyles.iconMoney}>
                <Text style={InputExpenseScreenStyles.iconvnd}>đ</Text>
              </View>
              <View style={InputExpenseScreenStyles.inputMoney}>
                <TextInput
                  onChangeText={(text) => this.checkMoney(text)}
                  style={InputExpenseScreenStyles.txtInputMoney}
                  value={this.state.money}
                  keyboardType="number-pad"
                  placeholder="0,00"
                  underlineColorAndroid={'transparent'}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <View style={InputExpenseScreenStyles.underLineInput} />
              </View>
            </View>
            <View style={InputExpenseScreenStyles.btnSubmit}>
              <Text style={InputExpenseScreenStyles.text1}>{'Paid by '}</Text>
              <View style={InputExpenseScreenStyles.button}>
                <Text
                  style={InputExpenseScreenStyles.text2}
                  onPress={() =>
                    this.state.checkDescription && this.state.checkMoney
                      ? this.prepareSendListUserToChoose(this.listTypeUser, this.idPayer)
                      : Alert.alert('Please enter full information')
                  }
                >
                  you
                </Text>
              </View>
              <Text style={InputExpenseScreenStyles.text1}>{' and split '}</Text>
              <View style={InputExpenseScreenStyles.button}>
                <Text
                  style={InputExpenseScreenStyles.text2}
                  onPress={() =>
                    this.state.checkDescription && this.state.checkMoney
                      ? this.prepareSendListUserToSplit(this.listTypeUser, this.idPayer)
                      : Alert.alert('Please enter full information')
                  }
                >
                  equally
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginVertical: screenWidth / 36, marginBottom: screenWidth / 24 }}>
              <CheckBox
                size={18}
                containerStyle={{ backgroundColor: '#ffffff', borderColor: '#ffffff', elevation: 3 }}
                checkedColor="rgba(247,189,66,1)"
                title="Add Location"
                checked={this.state.txtLocation.length > 0 ? true : false}
                onPress={() => this.addLocation()}
              />
              {this.state.checked ? (
                <Input
                  inputContainerStyle={{ width: screenWidth / 1.8 }}
                  onChangeText={(value) => this.setState({ txtLocation: value })}
                  value={this.state.txtLocation}
                  keyboardType="visible-password"
                  placeholder="Enter a location"
                  rightIcon={
                    <MaterialIcons
                      name="add-location"
                      size={24}
                      color={this.state.txtLocation.length > 0 ? Colors.tintColor : Colors.blackText}
                    />
                  }
                />
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getListUserInTrip: (tripId) => getApiListUserInTrip(tripId),
      saveTripId: (tripId) => saveTripIdInExpense(tripId),
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputExpenseScreen);
