import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ImageBackground, Alert, ToastAndroid } from 'react-native';
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
  opened?: boolean;
};

class HeaderTitleComponent extends Component<Props, States> {
  state = {
    itemSelected: 0,
    opened: false,
  };

  data = [
    {
      id: 0,
      title: 'Overview',
    },
    {
      id: 1,
      title: 'Balances',
    },
    // {
    //   id: 2,
    //   title: 'Totals',
    // },
    // {
    //   id: 3,
    //   title: 'Images',
    // },
    {
      id: 4,
      title: 'Exports Money Send Mail',
    },

    {
      id: 5,
      title: 'See the schedule of the trip',
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
        if (res == "You don't have permission to delete") {
          Alert.alert("You don't have permission to delete");
        } else {
          this.props.navigation.navigate('GroupScreen');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  sendMoney = () => {
    fetch(`${BASEURL}/api/user/send_money_all_mail/${this.props.idGroup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: null,
    })
      .then((response) => response.json())
      .then(async (res) => {
        ToastAndroid.showWithGravityAndOffset('Export done', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      });
  };

  render() {
    const { navigation } = this.props;
    var time = this.props.time.split('-');
    return (
      <MenuProvider>
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
                    <MenuOption
                      onSelect={() => {
                        alert(`Edit`), this.setState({ opened: false });
                      }}
                      text="Edit"
                    />
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
                        // case 'Totals':
                        //   navigation.navigate('TotalScreen', { nameGroup: this.props.nameGroup });
                        //   break;
                        // case 'Images':
                        //   navigation.navigate('ShowImagesScreen', { tripId: this.props.idGroup });
                        //   break;
                        case 'Exports Money Send Mail':
                          this.sendMoney();
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
