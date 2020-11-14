import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ImageBackground, Alert, Platform } from 'react-native';
import HeaderTitleComponentStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/HeaderTitleComponentStyles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ListItemHeader from './ListItemHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { screenWidth } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { BASEURL } from '../../../api/api';
import { number2money } from '../../../constants/FunctionCommon';
import DialogInput from 'react-native-dialog-input';

function mapStateToProps(state) {
  return {
    userId: state.dataUser.dataUser._id,
  };
}

type Props = {
  userId?: any;
  itemSelected?: number;
  navigation?: any;
  nameGroup?: string;
  idGroup?: string;
  time?: string;
  amount?: number;
  numberUserInTrip?: number;
  startDay?: string;
  endDay?: string;
};

type States = {
  itemSelected?: any;
  opened?: boolean;
  isDialogVisible?: boolean;
  nameGroup?: any;
};

class HeaderTitleComponent extends Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: 0,
      opened: false,
      isDialogVisible: false,
      nameGroup: '',
    };
  }

  data = [
    {
      id: 0,
      title: 'Overview',
    },
    {
      id: 1,
      title: 'Balances',
    },
    {
      id: 4,
      title: 'Chat',
    },

    {
      id: 5,
      title: 'See the schedule of the trip',
    },
    {
      id: 6,
      title: 'Picture Memories',
    },
    {
      id: 7,
      title: 'Plan Trip',
    },
  ];
  // click icon setting => open menu
  onTriggerPress() {
    this.setState({ opened: true });
  }
  // close menu when click outside view menu
  onBackdropPress() {
    this.setState({ opened: false });
  }
  editGroup = () => {
    this.setState({
      opened: !this.state.opened,
      isDialogVisible: !this.state.isDialogVisible,
    });
  };

  changeNameGroup = async (text) => {
    if (text.length >= 2) {
      await this.setState({
        nameGroup: text,
        isDialogVisible: !this.state.isDialogVisible,
      });
      this.callApiChangeNameGroup();
    } else {
      alert('the group name must least 2 character ');
    }
  };

  callApiChangeNameGroup = async () => {
    let data = await {
      name: this.state.nameGroup,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/trip/update_a_trip/${this.props.idGroup}/${this.props.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result == 'Failed') {
          Alert.alert(res.message);
        } else {
          Alert.alert(
            res.message,
            '',
            [
              {
                text: 'OK',
              },
            ],
            { cancelable: false },
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // function delete group
  removeGroup = () => {
    this.setState({ opened: false });
    Alert.alert(
      'Are you sure you want to delete this group?',
      '',
      [
        {
          text: 'OK',
          onPress: this.callApiRemoveGroup,
        },
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({ opened: false });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  hideDialogInput = () => {
    this.setState({
      isDialogVisible: !this.state.isDialogVisible,
    });
  };

  callApiRemoveGroup = async () => {
    const data = {
      user_id: this.props.userId,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/trip/delete_a_trip/${this.props.idGroup}/${this.props.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result == 'Failed') {
          Alert.alert(res.message);
        } else {
          this.props.navigation.navigate('GroupScreen');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { navigation } = this.props;
    var time = this.props.time.split('-');
    return (
      <MenuProvider>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={'Chỉnh sửa nhóm'}
          message={'Nhập tên nhóm bạn muốn chỉnh sửa'}
          hintInput={'Nhập tên nhóm...'}
          submitInput={(inputText) => {
            this.changeNameGroup(inputText);
          }}
          closeDialog={this.hideDialogInput}
          modalStyle={
            Platform.OS === 'ios'
              ? { backgroundColor: 'rgba(0,0,0,0.9)', position: 'relative', top: -screenWidth / 3.5 }
              : ''
          }
        ></DialogInput>
        <View style={HeaderTitleComponentStyles.container}>
          <ImageBackground
            source={{ uri: 'https://designroast.org/wp-content/uploads/2014/02/pattern-thepatternlibrary.png' }}
            style={HeaderTitleComponentStyles.backgroundImage}
          >
            <View style={HeaderTitleComponentStyles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <View style={HeaderTitleComponentStyles.btnBack}>
                  <Ionicons name="ios-arrow-back" size={32} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Image
                style={HeaderTitleComponentStyles.iconCamera}
                source={require('../../../../assets/images/icon_camera.png')}
              />
              <View style={HeaderTitleComponentStyles.btnSetting}>
                <Menu opened={this.state.opened} onBackdropPress={() => this.onBackdropPress()}>
                  <MenuTrigger
                    onPress={() => this.onTriggerPress()}
                    children={<Ionicons name="ios-settings" size={32} color={Colors.white} />}
                  />
                  <MenuOptions customStyles={optionsStyles}>
                    <MenuOption onSelect={this.editGroup}>
                      <Text style={{ color: '#ff9933' }}>Chỉnh sửa</Text>
                    </MenuOption>
                    <MenuOption onSelect={this.removeGroup}>
                      <Text style={{ color: Colors.orangered }}>Xóa</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
            <View style={HeaderTitleComponentStyles.contentText}>
              <Text style={HeaderTitleComponentStyles.textTitle}>{this.props.nameGroup}</Text>
              <Text style={HeaderTitleComponentStyles.numberPeopleAndTime}>
                {this.props.numberUserInTrip} thành viên tham gia nhóm được tạo - tháng {time[1]} {time[0]}
              </Text>
              {/*<Text style={HeaderTitleComponentStyles.startEndDay}>From {this.props.startDay.toString().split('-').join(' ')} To {this.props.endDay.toString().split('-').join(' ')}</Text>*/}
              <View style={HeaderTitleComponentStyles.owesAndMoney}>
                <Text style={HeaderTitleComponentStyles.owes}>
                  {this.props.amount >= 0 ? 'Bạn Dư : ' : 'Bạn Nợ : '}
                </Text>
                <Text style={HeaderTitleComponentStyles.money}>
                  {this.props.amount >= 0 ? (
                    <Text>{number2money(this.props.amount)}</Text>
                  ) : (
                    <Text>{number2money(this.props.amount * -1)}</Text>
                  )}{' '}
                  VND
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </MenuProvider>
    );
  }
}

export default connect(mapStateToProps)(HeaderTitleComponent);

const optionsStyles = {
  optionsContainer: {
    backgroundColor: Colors.white,
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: Colors.white,
  },
  optionWrapper: {
    backgroundColor: Colors.white,
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: Colors.tintColor,
  },
};
