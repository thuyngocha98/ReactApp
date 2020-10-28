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
          title={'Edit The Group'}
          message={'Enter the group name you want to change'}
          hintInput={'Enter the group name...'}
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
                      <Text style={{ color: '#ff9933' }}>Edit</Text>
                    </MenuOption>
                    <MenuOption onSelect={this.removeGroup}>
                      <Text style={{ color: Colors.orangered }}>Delete</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
            <View style={HeaderTitleComponentStyles.contentText}>
              <Text style={HeaderTitleComponentStyles.textTitle}>{this.props.nameGroup}</Text>
              <Text style={HeaderTitleComponentStyles.numberPeopleAndTime}>
                {this.props.numberUserInTrip} people • Created thg {time[1]} {time[0]}
              </Text>
              {/*<Text style={HeaderTitleComponentStyles.startEndDay}>From {this.props.startDay.toString().split('-').join(' ')} To {this.props.endDay.toString().split('-').join(' ')}</Text>*/}
              <View style={HeaderTitleComponentStyles.owesAndMoney}>
                <Text style={HeaderTitleComponentStyles.owes}>
                  {this.props.amount >= 0 ? 'You are owned ' : 'You owe '}
                </Text>
                <Text style={HeaderTitleComponentStyles.money}>
                  {this.props.amount >= 0 ? number2money(this.props.amount) : number2money(this.props.amount * -1)} VND
                </Text>
              </View>
            </View>
            <View style={HeaderTitleComponentStyles.flatList}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={this.data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      switch (item.title) {
                        case 'Balances':
                          navigation.navigate('BalanceScreen', { tripId: this.props.idGroup });
                          break;
                        case 'Plan Trip':
                          navigation.navigate('MainPlanInTripScreen', { tripId: this.props.idGroup });
                          break;
                        case 'Picture Memories':
                          navigation.navigate('ShowImagesScreen', { tripId: this.props.idGroup });
                          break;
                        case 'Chat':
                          this.props.navigation.navigate('ChatGroupScreen', {
                            tripId: this.props.idGroup,
                            nameTrip: this.props.nameGroup,
                            navigation: this.props.navigation,
                          });
                          break;
                        case 'See the schedule of the trip':
                          navigation.navigate('MainLocationScreen', { tripId: this.props.idGroup });
                      }
                    }}
                  >
                    <ListItemHeader title={item.title} itemSelected={this.state.itemSelected == item.id} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: screenWidth / 1.096,
                  top: 0,
                  height: screenWidth / 7.48,
                }}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.8, y: 0.5 }}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                  position: 'absolute',
                  left: screenWidth / 1.096,
                  right: 0,
                  top: 0,
                  height: screenWidth / 7.48,
                }}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0.2, y: 0.5 }}
              />
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
