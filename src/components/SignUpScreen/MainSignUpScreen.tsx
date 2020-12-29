import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '../../styles/SignUpScreenStyle/MainSignUpScreenStyle';
// @ts-ignore
import reactLogo from '../../../assets/images/wego.png';
import { BASEURL } from '../../api/api';
import Colors from '../../constants/Colors';
import { screenWidth } from '../../constants/Dimensions';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalNotification from '../components/ModalNotification';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  navigation?: any;
};

class MainSignUpScreen extends Component<Props> {
  static navigationOptions = {
    header: null,
  };
  state = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    tokenNotification: '',
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {}
    },
  };
  scroll: any;
  emailTextInput: TextInput;
  passTextInput: TextInput;
  rePassTextInput: TextInput;

  componentWillUnmount() {
    this.setState({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        this.setState({modalNotification: {
          type: 'warning',
          title: 'Warning',
          description: 'Failed to get push token for push notification!',
          modalVisible: true,
        }})
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      this.setState({ tokenNotification: token });
    } else {
      this.setState({modalNotification: {
        type: 'warning',
        title: 'Warning',
        description: 'Must use physical device for Push Notifications!',
        modalVisible: true,
      }})
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  signUp = async () => {
    await this.registerForPushNotificationsAsync();
    Keyboard.dismiss();
    if (this.state.name.length < 2) {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Tên không hợp lệ!',
        description: 'Tên phải có ít nhất 2 ký tự.',
        modalVisible: true,
      }})
    } else if (!this.validateEmail(this.state.email)) {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Email không hợp lệ!',
        description: 'Vui lòng kiểm tra lại.',
        modalVisible: true,
      }})
    } else if (this.state.password === '') {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Mật khẩu không hợp lệ!',
        description: 'Vui lòng nhập lại mật khẩu.',
        modalVisible: true,
      }})
      return;
    } else if (this.state.password.length < 5) {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Mật khẩu không hợp lệ!',
        description: 'Mật khẩu phải có ít nhất 5 ký tự.',
        modalVisible: true,
      }})
      return;
    } else {
      if (this.state.password === this.state.repeatPassword) {
        const data = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          isCustom: false,
          token_notification: this.state.tokenNotification,
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/user/insert_a_user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: json,
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.error) {
              this.setState({modalNotification: {
                type: 'error',
                title: res.error,
                description: 'Vui lòng kiểm tra lại.',
                modalVisible: true,
              }})
            } else {
              if (res.result == 'ok') {
                this.props.navigation.navigate('verifyScreen');
              }
            }
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        this.setState({modalNotification: {
          type: 'error',
          title: 'Xác nhận mật khẩu không đúng!',
          description: 'Vui lòng kiểm tra lại.',
          modalVisible: true,
        }})
      }
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({modalNotification: {modalVisible: false}})}
        />
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled" // can click button when is openning keyboard
        >
          <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={'transparent'} translucent />
            <View style={styles.header}>
              <Image source={reactLogo} style={styles.reactLogo} />
            </View>
            <View style={styles.userContainer}>
              <View style={styles.user}>
                <Ionicons name="md-person" size={screenWidth / 15} color="gray" />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    this.setState({
                      name: text,
                    })
                  }
                  placeholder={'Tên '}
                  autoCapitalize={'words'}
                  returnKeyType={'next'}
                  maxLength={50}
                  keyboardType="default"
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightgray}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.user}>
                <MaterialIcons
                  name="email"
                  size={screenWidth / 16}
                  style={{ marginLeft: -screenWidth / 170 }}
                  color="gray"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    this.setState({
                      email: text,
                    })
                  }
                  maxLength={50}
                  placeholder={'Email '}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  keyboardType="email-address"
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightgray}
                  underlineColorAndroid="transparent"
                  ref={(input) => {
                    this.emailTextInput = input;
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.user}>
                <MaterialIcons
                  name="lock"
                  size={screenWidth / 16}
                  style={{ marginLeft: -screenWidth / 100, marginBottom: screenWidth / screenWidth }}
                  color="gray"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                    })
                  }
                  maxLength={40}
                  placeholder={'Mật khẩu'}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  keyboardType="default"
                  secureTextEntry
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightgray}
                  underlineColorAndroid="transparent"
                  ref={(input) => {
                    this.passTextInput = input;
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.userContainer1}>
              <View style={styles.user}>
                <Ionicons
                  name="md-key"
                  size={screenWidth / 16}
                  color="gray"
                  style={{ marginBottom: -screenWidth / 150 }}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    this.setState({
                      repeatPassword: text,
                    })
                  }
                  maxLength={40}
                  placeholder={'Xác nhận mật khẩu'}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  keyboardType="default"
                  secureTextEntry
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightgray}
                  underlineColorAndroid="transparent"
                  ref={(input) => {
                    this.rePassTextInput = input;
                  }}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View>
              <View style={styles.buttonSignUp}>
                <TouchableOpacity activeOpacity={0.5} style={styles.buttonSignUp1} onPress={this.signUp}>
                  <Text style={styles.textSignUp}>Đăng Ký</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.buttonLogin}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonLogin1}
                  onPress={() => navigation.navigate('MainLoginScreen')}
                >
                  <Text style={styles.textLogin}>Đăng Nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MainSignUpScreen;
