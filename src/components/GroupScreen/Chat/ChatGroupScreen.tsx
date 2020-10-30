import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  TextInput,
  YellowBox,
  ScrollView,
  Image,
  Keyboard,
  Platform,
  Alert,
  Slider,
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import ChatGroupScreenStyles from '../../../styles/GroupsStyles/ChatGroupScreenStypes/ChatGroupScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons1 from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { BASEURL } from '../../../api/api';
import SocketIOClient from 'socket.io-client';
import { thumbnails } from '../../../constants/FunctionCommon';
import { screenWidth, screenHeight } from '../../../constants/Dimensions';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as Location from 'expo-location';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';

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
  imageMessage?: any;
  isRecording?: any;
  recording?: boolean;
  recordingDuration?: any;
  soundPosition?: any;
  soundDuration: any;
  muted?: boolean;
  isLoading?: boolean;
  shouldCorrectPitch?: boolean;
  isPlaybackAllowed?: boolean;
  typeAudio?: Number;
  shouldPlay?: boolean;
  isPlaying?: boolean;
  volume?: any;
  rate?: any;
  fileUrl?: any;
  heightScroll?: Number;
  y?: Number;
  isShareLocation?: boolean;
  isStopLocation?: boolean;
  isGetLocation?: boolean;
  location?: any;
  objectLocation?: any;
  currentLocation?: any;
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

  private audioRecording: Audio.Recording | null;
  private sound: Audio.Sound | null;

  constructor(props) {
    super(props);
    this.audioRecording = null;
    this.sound = null;
    this.state = {
      isMessage: false,
      chatMessage: '',
      chatMessages: [],
      imageMessage: '',
      isRecording: false,
      recording: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      isPlaybackAllowed: false,
      shouldPlay: false,
      isPlaying: false,
      isLoading: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      fileUrl: null,
      heightScroll: 0,
      y: 0,
      isShareLocation: false,
      isStopLocation: false,
      isGetLocation: false,
      location: null,
      objectLocation: null,
      currentLocation: null,
    };
  }

  recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  socket = SocketIOClient(`${BASEURL}`);

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

  componentDidMount = async () => {
    this.getTotalMessage();
    this.socket.on('chat message', async (msg) => {
      if (msg.trip_id === this.tripId) {
        if (msg.type === 3) {
          if (msg.location.isShareLocation) {
            if (msg.user_id_sender._id === this.props.user._id) {
              this.setState({
                objectLocation: msg,
              });
            }
            await this.setState({
              chatMessages: this.state.chatMessages.concat(msg),
            });
          } else {
            let a = [];
            let b = a.concat(msg);
            console.log(b);
            let stopLocation = this.state.chatMessages.map((obj) => b.find((o) => o._id === obj._id) || obj);
            this.setState({
              chatMessages: stopLocation,
            });
            a = [];
          }
        } else {
          await this.setState({
            chatMessages: this.state.chatMessages.concat(msg),
          });
        }
      }
    });
    let location = await Location.getCurrentPositionAsync({});
    let currentLocation = await {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    await this.setState({
      currentLocation,
    });
  };

  UNSAFE_componentWillMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  };

  _keyboardDidShow = () => {
    this._scrollToInput();
  };

  componentWillUnmount = async () => {
    this.keyboardDidShowListener.remove();
    this.socket.off('chat message');
  };

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

  imagePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let image = {
          url: localUri,
          name: filename,
          type,
        };
        this.setState({ imageMessage: image });
      }
      this.saveImagePhoto();
    }
  };

  imageCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let image = {
          url: localUri,
          name: filename,
          type,
        };
        this.setState({ imageMessage: image });
      }
      this.saveImagePhoto();
    }
  };

  saveImagePhoto = async () => {
    let bodyFormData = new FormData();
    if (this.state.imageMessage !== '') {
      let photo = {
        uri: this.state.imageMessage.url,
        name: this.state.imageMessage.name,
        type: this.state.imageMessage.type,
      };
      bodyFormData.append('image', photo);
      bodyFormData.append('tripId', this.tripId);
      bodyFormData.append('userId', this.props.user._id);
      await fetch(`${BASEURL}/api/chat/save_image_chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyFormData,
      })
        .then((response) => response.json())
        .then((res) => {
          this.socket.emit('image message', res.data);
          this.setState({
            imageMessage: '',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  stopRecording = async () => {};

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

  audioMessage = async () => {
    Keyboard.dismiss();
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Sorry, we need audio recording permissions to make this work!');
    } else {
      if (this.state.recording) {
        await this.audioRecording.stopAndUnloadAsync();
      }
      this.setState({
        recording: false,
        isRecording: !this.state.isRecording,
      });
    }
  };

  private _getMMSSFromMillis(millis: number) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number) => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  private _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  private _updateScreenForSoundStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis ?? null,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
      });
    }
  };

  private _stopRecordingAndEnablePlayback = async () => {
    const { sound, status } = await this.audioRecording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus,
    );
    this.sound = sound;
  };

  updateScreenForRecordingStatus = async (status: Audio.RecordingStatus) => {
    if (status.isRecording) {
      this.setState({
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        recordingDuration: null,
      });
      if (!this.state.recording) {
        this._stopRecordingAndEnablePlayback();
      }
    } else {
    }
  };

  private _stopPlaybackAndBeginRecording = async () => {
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    if (this.audioRecording !== null) {
      this.audioRecording.setOnRecordingStatusUpdate(null);
      this.audioRecording = null;
    }

    const { isRecording } = this.state;
    if (isRecording) {
      await this.setState({
        recording: !this.state.recording,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      recording.setOnRecordingStatusUpdate(this.updateScreenForRecordingStatus);
      this.audioRecording = recording;
      await this.audioRecording.startAsync();
    }
  };

  cancelRecording = async () => {
    this.setState({
      recording: !this.state.recording,
    });
    await this.audioRecording.stopAndUnloadAsync();
    if (this.audioRecording !== null) {
      this.audioRecording.setOnRecordingStatusUpdate(null);
      this.audioRecording = null;
    }
  };

  sendAudioRecording = async () => {
    this.setState({
      recording: !this.state.recording,
    });
    await this.audioRecording.stopAndUnloadAsync();
    if (this.audioRecording !== null) {
      this.audioRecording.setOnRecordingStatusUpdate(null);
      this.audioRecording = null;
    }

    setTimeout(() => {
      this.getDataAudioRecording();
    }, 50);
  };

  getDataAudioRecording = async () => {
    console.log(this.state.soundDuration);
    // await fetch(`${BASEURL}/api/chat/save_image_chat`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: null,
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     this.socket.emit('image message', res.data);
    //     this.setState({
    //       imageMessage: '',
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  playSlider = async () => {
    this.setState({
      isPlaybackAllowed: !this.state.isPlaybackAllowed,
    });
  };

  scroll: JSX.Element;

  _scrollToInput = () => {
    // Add a 'scroll' ref to your ScrollView
    this.scrollView.scrollToEnd({ animated: true });
  };

  find_dimesions = async (layout) => {
    const { height } = layout;
    if (this.state.isRecording === false) {
      await this.setState({
        heightScroll: screenHeight - height - screenWidth / 4,
      });
    }
  };

  find_dimesions1 = async (layout) => {
    const { height } = layout;
    if (this.state.isRecording) {
      await this.setState({
        y: height,
      });
    } else {
      this.setState({
        y: 0,
      });
    }
  };

  shareLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    } else {
      await this.setState({
        isGetLocation: !this.state.isGetLocation,
        isShareLocation: !this.state.isShareLocation,
      });
    }
  };

  isStartShareLocation = async () => {
    if (this.state.isGetLocation) {
      let shareLocation = await Location.getCurrentPositionAsync({});
      await this.setState({
        isStopLocation: !this.state.isStopLocation,
        location: shareLocation.coords,
      });
    }
    this.socket.emit('startLocation', [this.tripId, this.props.user._id, this.state.location]);
    this.setState({
      location: '',
    });
  };

  isStopShareLocation = async () => {
    console.log(this.state.objectLocation);
    if (this.state.isGetLocation) {
      let shareLocation = await Location.getCurrentPositionAsync({});
      await this.setState({
        isStopLocation: !this.state.isStopLocation,
        location: shareLocation.coords,
      });
    }

    if (this.state.objectLocation) {
      this.socket.emit('stopLocation', this.state.objectLocation);
      this.setState({
        objectLocation: null,
      });
    }
  };

  directionMap = async (location) => {
    this.props.navigation.navigate('MainDirectionScreen', {
      currentLocation: this.state.currentLocation,
      destinationLocation: location,
    });

    let coordinates = [];
    coordinates = coordinates.concat(this.state.currentLocation);
    let directionLocation = {
      latitude: location.latitude,
      longitude: location.longtitude,
    };
    coordinates = coordinates.concat(directionLocation);
    const data = JSON.stringify(coordinates);
    await fetch(`${BASEURL}/api/placeLocation/directions_between_two_point`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then(async (res) => {})
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    const lengthMessage = this.state.chatMessage.length;
    const { navigation } = this.props;
    const messages = this.state.chatMessages.map((message, i) =>
      message.user_id_sender._id === this.props.user._id ? (
        <View key={message._id} style={ChatGroupScreenStyles.viewUser}>
          <View style={{ flex: 0.3 }} />
          {message.type === 1 ? (
            <View style={ChatGroupScreenStyles.sub1ViewUser}>
              <View style={ChatGroupScreenStyles.viewTextUser}>
                <Text style={ChatGroupScreenStyles.txtMessageUser}>{message.message}</Text>
                <Text style={ChatGroupScreenStyles.txtMessageTimeUser}>{this.customTime(message.create_date)}</Text>
              </View>
            </View>
          ) : message.type === 2 ? (
            <View>
              <View style={ChatGroupScreenStyles.backgroundImageChat}>
                <Image
                  source={{ uri: `${BASEURL}/images/chatImages/${message.imageURL}` }}
                  style={ChatGroupScreenStyles.imageChat}
                />
              </View>
              <View>
                <Text style={ChatGroupScreenStyles.timeImageChat}>{this.customTime(message.create_date)}</Text>
              </View>
            </View>
          ) : message.type === 3 ? (
            <View>
              {message.location.isShareLocation ? (
                <View style={ChatGroupScreenStyles.bgShareLocation}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={ChatGroupScreenStyles.send1}>
                      <Ionicons1 name={'ios-send'} size={20} color={Colors.white} />
                    </View>
                    <View>
                      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Vị trí trực tiếp</Text>
                      <Text style={{ opacity: 0.6, fontSize: 12 }}>
                        {message.user_id_sender.name} đã bắt đầu chia sẻ
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={ChatGroupScreenStyles.seeLocation}
                      onPress={() => this.directionMap(message.location)}
                    >
                      <Text>Xem vị trí </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={ChatGroupScreenStyles.endLocation}>
                  <Text style={{ fontWeight: 'bold' }}>Chia sẻ vị trí đã kết thúc</Text>
                  <Text style={{ opacity: 0.6, fontSize: 12, marginTop: 5 }}>
                    Cập nhật lần cuối : {moment(message.update_date).format('lll')}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={ChatGroupScreenStyles.playbackContainer}>
              <TouchableOpacity onPress={this.playSlider}>
                {this.state.isPlaybackAllowed ? (
                  <Fontisto name={'pause'} color={Colors.white} size={15} />
                ) : (
                  <View style={{ marginLeft: 2 }}>
                    <FontAwesome5 name={'caret-right'} color={Colors.white} size={30} />
                  </View>
                )}
              </TouchableOpacity>
              <View>
                <Text style={{ color: Colors.white }}>1:23</Text>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View key={message._id} style={ChatGroupScreenStyles.mainViewFriend}>
          <Text style={ChatGroupScreenStyles.txtNameFriend}>{message?.user_id_sender?.name.split(' ')[0]}</Text>
          <View style={ChatGroupScreenStyles.viewFriend}>
            <View style={ChatGroupScreenStyles.sub1ViewFriend}>
              <View style={ChatGroupScreenStyles.viewTextFriend}>
                <Image
                  source={
                    message.user_id_sender.avatar.length < 2
                      ? thumbnails['avatar' + message?.user_id_sender?.avatar]
                      : { uri: `${BASEURL}/images/avatars/${message?.user_id_sender?.avatar}` }
                  }
                  style={{ width: screenWidth / 12, height: screenWidth / 12 }}
                />
              </View>
              {message.type === 1 ? (
                <View style={ChatGroupScreenStyles.viewMessageFriend}>
                  <Text style={ChatGroupScreenStyles.txtMessageFriend}>{message.message}</Text>
                  <Text style={ChatGroupScreenStyles.txtMessageTimeFriend}>{this.customTime(message.create_date)}</Text>
                </View>
              ) : message.type === 2 ? (
                <View>
                  <View style={ChatGroupScreenStyles.backgroundImageChat}>
                    <Image
                      source={{ uri: `${BASEURL}/images/chatImages/${message.imageURL}` }}
                      style={ChatGroupScreenStyles.imageChat}
                    />
                  </View>
                  <View>
                    <Text style={ChatGroupScreenStyles.timeImageChat}>{this.customTime(message.create_date)}</Text>
                  </View>
                </View>
              ) : message.type === 3 ? (
                <View>
                  {message.location.isShareLocation ? (
                    <View style={ChatGroupScreenStyles.bgShareLocation}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={ChatGroupScreenStyles.send1}>
                          <Ionicons1 name={'ios-send'} size={20} color={Colors.white} />
                        </View>
                        <View>
                          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Vị trí trực tiếp</Text>
                          <Text style={{ opacity: 0.6, fontSize: 12 }}>
                            {message.user_id_sender.name} đã bắt đầu chia sẻ
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={ChatGroupScreenStyles.seeLocation}
                          onPress={() => this.directionMap(message.location)}
                        >
                          <Text>Xem vị trí </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={ChatGroupScreenStyles.endLocation}>
                      <Text style={{ fontWeight: 'bold' }}>Chia sẻ vị trí đã kết thúc</Text>
                      <Text style={{ opacity: 0.6, fontSize: 12, marginTop: 5 }}>
                        Cập nhật lần cuối : {moment(message.update_date).format('lll')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View></View>
              )}
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
        {Platform.OS === 'android' ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() => this._scrollToInput()}
            >
              {messages}
            </ScrollView>
            <View
              style={ChatGroupScreenStyles.footer}
              onLayout={(event) => {
                this.find_dimesions(event.nativeEvent.layout);
              }}
            >
              {lengthMessage < 1 ? (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity style={ChatGroupScreenStyles.location} onPress={this.shareLocation}>
                    <MaterialIcons name={'location-on'} size={31} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.camera} onPress={this.imageCamera}>
                    <FontAwesome name={'camera'} size={26} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.image} onPress={this.imagePhoto}>
                    <FontAwesome name={'photo'} size={25} color={Colors.tintColor} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
              <View
                style={lengthMessage > 0 ? { flex: 8.5, marginLeft: 10 } : { flex: 6, marginLeft: screenWidth / 5 }}
              >
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
              {/* <View style={{}}/> */}
              <View style={{ flex: 1 }}>
                {lengthMessage > 0 ? (
                  <TouchableOpacity style={ChatGroupScreenStyles.send} onPress={this.submitMessage}>
                    <Ionicons1 name={'ios-send'} size={20} color={Colors.white} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={ChatGroupScreenStyles.microphone} onPress={this.audioMessage}>
                    <FontAwesome name={'microphone'} size={28} color={Colors.tintColor} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {this.state.isShareLocation ? (
              <View>
                {this.state.isStopLocation ? (
                  <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStopShareLocation}>
                    <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                      Stop share live location
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStartShareLocation}>
                    <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                      Start share live location
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        ) : (
          <KeyboardAwareView>
            <ScrollView
              style={{ flex: 1 }}
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() => this._scrollToInput()}
            >
              {messages}
            </ScrollView>
            <View
              style={ChatGroupScreenStyles.footer}
              onLayout={(event) => {
                this.find_dimesions(event.nativeEvent.layout);
              }}
            >
              {lengthMessage < 1 ? (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity style={ChatGroupScreenStyles.location} onPress={this.shareLocation}>
                    <MaterialIcons name={'location-on'} size={31} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.camera} onPress={this.imageCamera}>
                    <FontAwesome name={'camera'} size={26} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.image} onPress={this.imagePhoto}>
                    <FontAwesome name={'photo'} size={25} color={Colors.tintColor} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
              <View
                style={lengthMessage > 0 ? { flex: 8.5, marginLeft: 10 } : { flex: 6, marginLeft: screenWidth / 5 }}
              >
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
                  <TouchableOpacity style={ChatGroupScreenStyles.microphone} onPress={this.audioMessage}>
                    <FontAwesome name={'microphone'} size={28} color={Colors.tintColor} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              {this.state.isShareLocation ? (
                <View>
                  {this.state.isStopLocation ? (
                    <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStopShareLocation}>
                      <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                        Stop share live location
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStartShareLocation}>
                      <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                        Start share live location
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
            </View>
          </KeyboardAwareView>
        )}
        {this.state.isRecording ? (
          <View style={ChatGroupScreenStyles.audioRecording}>
            {this.state.recording === false ? (
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}></View>
                <View>
                  <TouchableOpacity style={ChatGroupScreenStyles.bgAudio} onPress={this._stopPlaybackAndBeginRecording}>
                    <Text style={ChatGroupScreenStyles.textAudio}>Ghi âm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View style={ChatGroupScreenStyles.timingRecording}>
                  <Text style={{ alignContent: 'center', fontSize: screenWidth / 8, marginTop: screenWidth / 50 }}>
                    {this._getRecordingTimestamp()}
                  </Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={ChatGroupScreenStyles.footerRecording}>
                  <TouchableOpacity style={ChatGroupScreenStyles.cancleRecording} onPress={this.cancelRecording}>
                    <Text style={ChatGroupScreenStyles.contentCancleRecording}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.sendRecording} onPress={this.sendAudioRecording}>
                    <Text style={ChatGroupScreenStyles.contentSendRecording}>Gửi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(ChatGroupScreen);
