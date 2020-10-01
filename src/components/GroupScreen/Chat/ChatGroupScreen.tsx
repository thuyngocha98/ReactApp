import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, TextInput, YellowBox, ScrollView, Image, Keyboard } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import ChatGroupScreenStyles from '../../../styles/GroupsStyles/ChatGroupScreenStypes/ChatGroupScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons1 from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BASEURL } from '../../../api/api';
import SocketIOClient from 'socket.io-client';
import { thumbnails } from '../../../constants/FunctionCommon';
import { screenWidth } from '../../../constants/Dimensions';
import styles from '../../../styles/FriendsScreenStyles/MainFriendsOweScreenStyle/MainFriendsOweScreenStyle';

type Props = {
  _id?: any;
  navigation?: any;
  nameGroup?: any;
  user?: any[];
};

type States = {
  user_id?: string;
  isMessage?: boolean;
  chatMessage?: any;
  chatMessages?: any;
};

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

class ChatGroupScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null, //works with createStackNavigator but not with createBottomTabNavigator
  };

  socket = SocketIOClient(`${BASEURL}`);
  state = {
    isMessage: false,
    chatMessage: '',
    chatMessages: [],
  };

  tripId = this.props.navigation.getParam('tripId', '');
  nameTrip = this.props.navigation.getParam('nameTrip', '');

  getTotalMessage = async () => {
    await fetch(`${BASEURL}/api/chat/get_messages_by_trip_id/${this.tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({ chatMessages: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  };
  keyboardDidShowListener: any;
  scrollView: ScrollView;

  componentDidMount(): void {
    this.getTotalMessage();
    this.socket.on('chat message', (msg) => {
      if (msg[0].trip_id === this.tripId) {
        this.setState({
          chatMessages: this.state.chatMessages.concat(msg),
        });
      }
    });
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  _keyboardDidShow = () => {
    this._scrollToInput();
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.socket.off('chat message');
  }

  chatMessage = (text) => {
    if (text === '') {
      this.setState({
        isMessage: false,
        chatMessage: text,
      });
    } else {
      this.setState({
        isMessage: true,
        chatMessage: text,
      });
    }
  };

  submitMessage = () => {
    if (this.state.chatMessage.length > 0) {
      this.socket.emit('chat message', [this.tripId, this.props.user._id, this.state.chatMessage]);
      this.setState({ chatMessage: '' });
    }
  };

  customTime(time) {
    let date = new Date(time);
    let hours = '' + date.getHours();
    let tmp = 'AM';
    let minutes = date.getMinutes() + '';
    if (date.getHours() < 10) {
      hours = '0' + date.getHours();
    } else if (date.getHours() >= 12) {
      if (date.getHours() > 12) hours = date.getHours() - 12 + '';
      tmp = 'PM';
    }
    if (date.getMinutes() < 10) minutes = '0' + date.getMinutes();

    return hours + ':' + minutes + ' ' + tmp;
  }

  _scrollToInput() {
    // Add a 'scroll' ref to your ScrollView
    this.scrollView.scrollToEnd({ animated: true });
  }

  render() {
    const lengthMessage = this.state.chatMessage.length;
    const { navigation } = this.props;
    const messages = this.state.chatMessages.map((message, i) =>
      message.user_id_sender._id === this.props.user._id ? (
        <View key={message._id} style={ChatGroupScreenStyles.viewUser}>
          <View style={{ flex: 0.3 }} />
          <View style={ChatGroupScreenStyles.sub1ViewUser}>
            <View style={ChatGroupScreenStyles.viewTextUser}>
              <Text style={ChatGroupScreenStyles.txtMessageUser}>{message.message}</Text>
              <Text style={ChatGroupScreenStyles.txtMessageTimeUser}>{this.customTime(message.create_date)}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View key={message._id} style={ChatGroupScreenStyles.mainViewFriend}>
          <Text style={ChatGroupScreenStyles.txtNameFriend}>{message?.user_id_sender?.name.split(' ')[0]}</Text>
          <View style={ChatGroupScreenStyles.viewFriend}>
            <View style={ChatGroupScreenStyles.sub1ViewFriend}>
              <View style={ChatGroupScreenStyles.viewTextFriend}>
                <Image
                  source={thumbnails['avatar' + message?.user_id_sender?.avatar]}
                  style={{ width: screenWidth / 12, height: screenWidth / 12 }}
                />
              </View>
              <View style={ChatGroupScreenStyles.viewMessageFriend}>
                <Text style={ChatGroupScreenStyles.txtMessageFriend}>{message.message}</Text>
                <Text style={ChatGroupScreenStyles.txtMessageTimeFriend}>{this.customTime(message.create_date)}</Text>
              </View>
            </View>
            <View style={{ flex: 0.3 }} />
          </View>
        </View>
      ),
    );
    return (
      <View style={{ flex: 1 }}>
        <View style={ChatGroupScreenStyles.containerHeader}>
          <View style={ChatGroupScreenStyles.header}>
            <TouchableOpacity
              style={ChatGroupScreenStyles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={32} color={Colors.white} />
            </TouchableOpacity>
            <Text style={ChatGroupScreenStyles.nameGroup}>{this.nameTrip}</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  alert('Ok');
                }}
              >
                <MaterialCommunityIcons name="dots-vertical-circle-outline" size={32} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
        >
          {messages}
        </ScrollView>
        <View style={ChatGroupScreenStyles.footer}>
          {lengthMessage < 1 ? (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={ChatGroupScreenStyles.location} onPress={this.submitMessage}>
                <MaterialIcons name={'location-on'} size={31} color={Colors.tintColor} />
              </TouchableOpacity>
              <TouchableOpacity style={ChatGroupScreenStyles.camera} onPress={this.submitMessage}>
                <FontAwesome name={'camera'} size={26} color={Colors.tintColor} />
              </TouchableOpacity>
              <TouchableOpacity style={ChatGroupScreenStyles.image}>
                <FontAwesome name={'photo'} size={25} color={Colors.tintColor} />
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
          <View style={lengthMessage > 0 ? { flex: 8.5, marginLeft: 10 } : { flex: 6, marginLeft: screenWidth / 5.5 }}>
            <TextInput
              style={ChatGroupScreenStyles.input}
              autoCapitalize={'none'}
              returnKeyType={'next'}
              autoCorrect={false}
              placeholderTextColor={'gray'}
              underlineColorAndroid="transparent"
              placeholder="Soạn tin nhắn"
              value={this.state.chatMessage}
              onChangeText={this.chatMessage}
            />
          </View>
          <View style={{ flex: 1 }}>
            {lengthMessage > 0 ? (
              <TouchableOpacity style={ChatGroupScreenStyles.send} onPress={this.submitMessage}>
                <Ionicons1 name={'ios-send'} size={20} color={Colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={ChatGroupScreenStyles.microphone}>
                <FontAwesome name={'microphone'} size={28} color={Colors.tintColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(ChatGroupScreen);
