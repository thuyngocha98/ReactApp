import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { OpenMapDirections } from 'react-native-navigation-directions';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  YellowBox,
  ScrollView,
  Image,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import ChatGroupScreenStyles from '../../../styles/GroupsStyles/ChatGroupScreenStypes/ChatGroupScreenStyles';
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
import ModalLoading from '../../components/ModalLoading';

type Props = {
  _id?: any;
  navigation?: any;
  nameGroup?: any;
  user?: {
    _id?: string;
  };
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
  positionMillis?: any;
  idPositionMillis?: any;
  muted?: boolean;
  isLoading?: boolean;
  shouldCorrectPitch?: boolean;
  isPlaybackAllowed?: boolean;
  typeAudio?: Number;
  shouldPlay?: boolean;
  isPlaying?: boolean;
  dataAudio?: any;
  volume?: any;
  rate?: any;
  fileUrl?: any;
  isShareLocation?: boolean;
  isStopLocation?: boolean;
  isGetLocation?: boolean;
  location?: any;
  objectLocation?: any;
  currentLocation?: any;
  finalDurationAudio?: any;
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
      positionMillis: null,
      idPositionMillis: null,
      shouldPlay: true,
      isPlaying: false,
      dataAudio: null,
      isLoading: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      fileUrl: null,
      isShareLocation: false,
      isStopLocation: false,
      isGetLocation: false,
      location: null,
      objectLocation: null,
      currentLocation: null,
      finalDurationAudio: 0,
    };
  }

  recordingOptions = {
    android: {
      audioEncoder: 3,
      bitRate: 128000,
      extension: '.m4a',
      numberOfChannels: 2,
      outputFormat: 2,
      sampleRate: 44100,
    },
    ios: {
      audioQuality: 127,
      bitRate: 128000,
      extension: '.wav',
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
      numberOfChannels: 2,
      sampleRate: 44100,
    },
  };
  socket = SocketIOClient(`${BASEURL}`);

  tripId = this.props.navigation.getParam('tripId', '');
  nameTrip = this.props.navigation.getParam('nameTrip', '');

  getTotalMessage = async () => {
    this.setState({ isLoading: true });
    await fetch(`${BASEURL}/api/chat/get_messages_by_trip_id/${this.tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({ 
          chatMessages: res.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        alert(error);
      });
  };
  keyboardDidShowListener: any;
  scrollView: ScrollView;

  componentDidMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
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
  };

  handlePressLocation = () => {
    Keyboard.dismiss();
    this.setState({
      isShareLocation: !this.state.isShareLocation,
    });
  };

  handlePressRecording = () => {
    Keyboard.dismiss();
    this.setState({
      isRecording: !this.state.isRecording,
    });
  };

  _keyboardDidShow = () => {
    this.setState({
      isShareLocation: false,
      isRecording: false,
    }, () =>  this._scrollToInput());
  };

  componentWillUnmount = () => {
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
      this.setState({
        isShareLocation: false,
        isRecording: false,
      });
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
        this.setState({
          imageMessage: image,
        });
      }
      this.saveImagePhoto();
    }
  };

  imageCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      this.setState({
        isRecording: false,
        isShareLocation: false,
      });
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
        this.setState({
          imageMessage: image,
        });
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
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Sorry, we need audio recording permissions to make this work!');
    } else {
      if (this.state.recording) {
        await this.audioRecording.stopAndUnloadAsync();
      }
      this.handlePressRecording();
      this.setState({
        isShareLocation: false,
        recording: false,
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

  private _getMMSSFromMillisPlayOrPause(millis: number) {
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
    return minutes + ':' + padWithZero(seconds);
  }

  private _getRecordingTimestampPauseOrPlay(soundPosition) {
    if (soundPosition != null) {
      return `${this._getMMSSFromMillisPlayOrPause(soundPosition)}`;
    }
    return `${this._getMMSSFromMillisPlayOrPause(0)}`;
  }

  private _updateScreenForSoundStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis ?? null,
        soundPosition: status.positionMillis,
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
    let audio = this.audioRecording;
    if (audio) {
      const info = await FileSystem.getInfoAsync(audio.getURI() || '');
      let uriParts = info.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      let dataAudio = {
        uri: info.uri,
        name: `recording.${fileType}`,
        type: `audio/x-${fileType}`,
      };
      if (dataAudio) {
        this.setState({
          dataAudio,
          finalDurationAudio: audio._finalDurationMillis,
        });
      }

      const { sound, status } = await audio.createNewLoadedSoundAsync(
        {
          isLooping: true,
          isMuted: this.state.muted,
          volume: this.state.volume,
          rate: this.state.rate,
          shouldCorrectPitch: this.state.shouldCorrectPitch,
        },
        this._updateScreenForSoundStatus,
      );
    }
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

  private _updateScreenForSoundAudioStatus = async (status: AVPlaybackStatus) => {
    // console.log(status);
    if (status.isLoaded) {
      if (status.shouldPlay) {
        this.setState({
          positionMillis: status.durationMillis - status.positionMillis,
          shouldPlay: status.shouldPlay,
        });
      }
    }
    if (status['durationMillis'] === status['positionMillis']) {
      this.sound.setOnPlaybackStatusUpdate(null);
      this.setState({
        shouldPlay: false,
      });
      await this.sound.unloadAsync();
      this.sound = null;
    }
  };

  private _stopPlaybackAndBeginRecording = async () => {
    if (this.sound !== null) {
      this.sound.setOnPlaybackStatusUpdate(null);
      await this.sound.unloadAsync();
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
      await recording.prepareToRecordAsync(this.recordingOptions);
      recording.setOnRecordingStatusUpdate(this.updateScreenForRecordingStatus);
      this.audioRecording = recording;
      await this.audioRecording.startAsync();
    }
  };

  cancelRecording = async () => {
    this.audioRecording.setOnRecordingStatusUpdate(null);
    await this.audioRecording.stopAndUnloadAsync();
    this.audioRecording = null;
    this.setState({
      recording: !this.state.recording,
      recordingDuration: null,
    });
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
    }, 200);
  };

  getDataAudioRecording = async () => {
    let { dataAudio, finalDurationAudio } = this.state;
    let bodyFormData = new FormData();
    if (dataAudio) {
      if (finalDurationAudio) {
        bodyFormData.append('audio', dataAudio);
        bodyFormData.append('tripId', this.tripId);
        bodyFormData.append('userId', this.props.user._id);
        bodyFormData.append('soundDuration', finalDurationAudio);
        bodyFormData.append('soundPosition', 0);
        await fetch(`${BASEURL}/api/chat/save_audio_recording`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: bodyFormData,
        })
          .then((response) => response.json())
          .then((res) => {
            this.socket.emit('audio recording', res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  playAudio = async (id, audio) => {
    if (this.sound) {
      if (this.state.idPositionMillis === id) {
        await this.sound.playAsync();
      } else {
        this.sound.setOnPlaybackStatusUpdate(null);
        await this.sound.stopAsync();
        this.sound = null;
        this.setState({
          idPositionMillis: id,
        });
        const soundObject = new Audio.Sound();
        let file = `${BASEURL}/images/audioRecordings/${audio.audioURL}`;
        await soundObject.loadAsync({ uri: file });
        soundObject.setOnPlaybackStatusUpdate(this._updateScreenForSoundAudioStatus);
        this.sound = await soundObject;
        await this.sound.playAsync();
      }
    } else {
      await this.setState({
        idPositionMillis: id,
      });
      const soundObject = new Audio.Sound();
      let file = await `${BASEURL}/images/audioRecordings/${audio.audioURL}`;
      await soundObject.loadAsync({ uri: file });
      soundObject.setOnPlaybackStatusUpdate(this._updateScreenForSoundAudioStatus);
      this.sound = await soundObject;
      await this.sound.playAsync();
    }
  };

  pauseAudio = async (id, audio) => {
    await this.sound.pauseAsync()
    this.setState({
      shouldPlay: false,
    });
  };
  scroll: JSX.Element;

  _scrollToInput = () => {
    // Add a 'scroll' ref to your ScrollView
    this.scrollView.scrollToEnd({ animated: true });
  };

  shareLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    } else {
      this.handlePressLocation();
      this.setState({
        isRecording: false,
        isGetLocation: !this.state.isGetLocation,
      });
      let currentLocation = await Location.getCurrentPositionAsync({});
      let data = {
        userId: this.props.user._id,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      await fetch(`${BASEURL}/api/locationUser/create_or_update_location_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (res) => {})
        .catch((error) => {
          alert(error);
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

  directionMap = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    } else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      let data = {
        userId: this.props.user._id,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      await fetch(`${BASEURL}/api/locationUser/create_or_update_location_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (res) => {})
        .catch((error) => {
          alert(error);
        });
    }
    this.props.navigation.navigate('MainDirectionScreen', { tripId: this.tripId });
  };
  _callShowDirections = async (location) => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    } else {
      let locationUser = await Location.getCurrentPositionAsync();
      let currentLocation = await {
        latitude: locationUser.coords.latitude,
        longitude: locationUser.coords.longitude,
      };

      const startPoint = {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude,
      };

      const endPoint = {
        longitude: location.longtitude,
        latitude: location.latitude,
      };

      const transportPlan = 'd';
      console.log(startPoint);
      console.log(endPoint);

      OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
        console.log(res);
      });
    }
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
                      onPress={() => this._callShowDirections(message.location)}
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
              {message._id === this.state.idPositionMillis ? (
                this.state.shouldPlay ? (
                  <TouchableOpacity onPress={() => this.pauseAudio(message._id, message.audio)}>
                    <Fontisto name={'pause'} color={Colors.white} size={15} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => this.playAudio(message._id, message.audio)}>
                    <View style={{ marginLeft: 2 }}>
                      <FontAwesome5 name={'caret-right'} color={Colors.white} size={30} />
                    </View>
                  </TouchableOpacity>
                )
              ) : message.audio.isPlaying ? (
                <TouchableOpacity onPress={() => this.pauseAudio(message._id, message.audio)}>
                  <Fontisto name={'pause'} color={Colors.white} size={15} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.playAudio(message._id, message.audio)}>
                  <View style={{ marginLeft: 2 }}>
                    <FontAwesome5 name={'caret-right'} color={Colors.white} size={30} />
                  </View>
                </TouchableOpacity>
              )}
              <View>
                <Text style={{ color: Colors.white }}>
                  {this.state.positionMillis
                    ? message._id === this.state.idPositionMillis
                      ? this._getRecordingTimestampPauseOrPlay(this.state.positionMillis)
                      : this._getRecordingTimestampPauseOrPlay(message.audio.soundDuration)
                    : this._getRecordingTimestampPauseOrPlay(message.audio.soundDuration)}
                </Text>
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
                          onPress={() => this._callShowDirections(message.location)}
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
                <View style={ChatGroupScreenStyles.playbackContainerReceived}>
                  {message._id === this.state.idPositionMillis ? (
                    this.state.shouldPlay ? (
                      <TouchableOpacity onPress={() => this.pauseAudio(message._id, message.audio)}>
                        <Fontisto name={'pause'} color={Colors.black} size={screenWidth / 32} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => this.playAudio(message._id, message.audio)}>
                        <FontAwesome5 name={'caret-right'} color={Colors.black} size={screenWidth / 16} />
                      </TouchableOpacity>
                    )
                  ) : message.audio.isPlaying ? (
                    <TouchableOpacity onPress={() => this.pauseAudio(message._id, message.audio)}>
                      <Fontisto name={'pause'} color={Colors.black} size={screenWidth / 32} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => this.playAudio(message._id, message.audio)}>
                      <FontAwesome5 name={'caret-right'} color={Colors.black} size={screenWidth / 16} />
                    </TouchableOpacity>
                  )}

                  <View>
                    <Text style={{ color: Colors.black }}>
                      {this.state.positionMillis
                        ? message._id === this.state.idPositionMillis
                          ? this._getRecordingTimestampPauseOrPlay(this.state.positionMillis)
                          : this._getRecordingTimestampPauseOrPlay(message.audio.soundDuration)
                        : this._getRecordingTimestampPauseOrPlay(message.audio.soundDuration)}
                    </Text>
                  </View>
                </View>
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
            <View style={ChatGroupScreenStyles.cancel}/>
          </View>
        </View>
        {Platform.OS === 'android' ? (
          <View style={{ flex: 1 }}>
            <ModalLoading isVisible={this.state.isLoading}/>
            <ScrollView
              style={{ flex: 1 }}
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onLayout={(evt) => {
                this._scrollToInput()
              }}
              onContentSizeChange={() => this._scrollToInput()}
            >
              {messages}
            </ScrollView>
            <View style={ChatGroupScreenStyles.footer}>
              {lengthMessage < 1 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.shareLocation}>
                    <MaterialIcons name={'location-on'} size={screenWidth / 14} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.imageCamera}>
                    <FontAwesome name={'camera'} size={screenWidth / 16} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.imagePhoto}>
                    <FontAwesome name={'photo'} size={screenWidth / 16} color={Colors.tintColor} />
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={ChatGroupScreenStyles.containerInput}>
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
              <View>
                {lengthMessage > 0 ? (
                  <TouchableOpacity style={ChatGroupScreenStyles.send} onPress={this.submitMessage}>
                    <Ionicons1 name={'ios-send'} size={screenWidth / 20} color={Colors.white} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.audioMessage}>
                    <FontAwesome name={'microphone'} size={screenWidth / 16} color={Colors.tintColor} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {this.state.isShareLocation ? (
              <View>
                <View style={ChatGroupScreenStyles.separator} />
                {this.state.isStopLocation ? (
                  <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStopShareLocation}>
                    <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                      Kết thúc chia sẻ vị trí
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStartShareLocation}>
                      <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                        Bắt đầu chia sẻ vị trí
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.directionMap}>
                      <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                        Xem vị trí các thành viên
                      </Text>
                    </TouchableOpacity>
                  </View>
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
              onLayout={(evt) => {
                this._scrollToInput()
              }}
              onContentSizeChange={() => this._scrollToInput()}
            >
              {messages}
            </ScrollView>
            <View style={ChatGroupScreenStyles.footer}>
              {lengthMessage < 1 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.shareLocation}>
                    <MaterialIcons name={'location-on'} size={screenWidth / 14} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.imageCamera}>
                    <FontAwesome name={'camera'} size={screenWidth / 16} color={Colors.tintColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.imagePhoto}>
                    <FontAwesome name={'photo'} size={screenWidth / 16} color={Colors.tintColor} />
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={ChatGroupScreenStyles.containerInput}>
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
              <View>
                {lengthMessage > 0 ? (
                  <TouchableOpacity style={ChatGroupScreenStyles.send} onPress={this.submitMessage}>
                    <Ionicons1 name={'ios-send'} size={screenWidth / 20} color={Colors.white} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={ChatGroupScreenStyles.iconFooter} onPress={this.audioMessage}>
                    <FontAwesome name={'microphone'} size={screenWidth / 16} color={Colors.tintColor} />
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
                        Dừng chia sẻ vị trí
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.isStartShareLocation}>
                        <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                          Bắt đầu chia sẻ vị trí
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={ChatGroupScreenStyles.shareLocation} onPress={this.directionMap}>
                        <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold', opacity: 0.9 }}>
                          Xem vị trí các thành viên
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          </KeyboardAwareView>
        )}
        {this.state.isRecording ? (
          <View style={ChatGroupScreenStyles.audioRecording}>
            <View style={ChatGroupScreenStyles.separator} />
            {this.state.recording === false ? (
              <View style={{ flex: 1 }}>
                <View style={ChatGroupScreenStyles.timingRecording}>
                  <Text style={ChatGroupScreenStyles.txtTimeRecording}>
                    {`00:00`}
                  </Text>
                </View>
                <View style={{ flex: 1 }}/>
                <View>
                  <TouchableOpacity style={ChatGroupScreenStyles.bgAudio} onPress={this._stopPlaybackAndBeginRecording}>
                    <Text style={ChatGroupScreenStyles.textAudio}>Ghi âm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View style={ChatGroupScreenStyles.timingRecording}>
                  <Text style={ChatGroupScreenStyles.txtTimeRecording}>
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
