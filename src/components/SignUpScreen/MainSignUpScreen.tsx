import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '../../styles/SignUpScreenStyle/MainSignUpScreenStyle';
// @ts-ignore
import reactLogo from '../../../assets/images/wego.png';
// @ts-ignore
import signUpUser from '../../../assets/images/signUpUser.png';
// @ts-ignore
import email from '../../../assets/images/envelope.png';
// @ts-ignore
import lock from '../../../assets/images/lock.png';
// @ts-ignore
import key from '../../../assets/images/key.png';
import { BASEURL } from '../../api/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import { screenWidth } from '../../constants/Dimensions';
import DialogBox from 'react-native-dialogbox';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

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
    tokenNotification: ''
  };
  scroll: any;
  emailTextInput: TextInput;
  passTextInput: TextInput;
  rePassTextInput: TextInput;
  dialogbox: any;

  componentWillUnmount() {
    this.setState({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
  }

  handleOnPress(title, content) {
    Keyboard.dismiss();
    // alert
    this.dialogbox.tip({
      title: title,
      content: content,
      btn: {
        text: 'OK',
        style: { fontWeight: '500', fontSize: 20, color: '#044de0' },
      },
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
            alert('Failed to get push token for push notification!');
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({tokenNotification: token});
    } else {
        alert('Must use physical device for Push Notifications');
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
    if (this.state.name.length < 2) {
      this.handleOnPress('Error!', ['Name invalid!', 'Name must be at least 2 characters.']);
    } else if (!this.validateEmail(this.state.email)) {
      this.handleOnPress('Error!', ['Email invalid!', 'Please check again.']);
    } else if (this.state.password === '') {
      this.handleOnPress('Error!', ['Password invalid!', 'Please enter password.']);
      return;
    } else if (this.state.password.length < 5) {
      this.handleOnPress('Error!', ['Password invalid!', 'Password must be at least 5 characters.']);
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
              this.handleOnPress('Error!', [res.error, 'Please check again.']);
            } else {
              this.props.navigation.navigate('verifyScreen');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.handleOnPress('Error!', ['Confirm password incorrect', 'Please check again.']);
      }
    }
  };

  // screen scroll when click on textInput
  _scrollToInput(position) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToPosition(1, position, true);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === 'ios'}
          style={{ flex: 1 }}
          innerRef={(ref) => {
            this.scroll = ref;
          }}
          keyboardShouldPersistTaps="always" // can click button when is openning keyboard
        >
          <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={'transparent'} translucent />
            <View>
              <View style={styles.header}>
                <Image source={reactLogo} style={styles.reactLogo} />
              </View>
            </View>
            <View>
              <View style={styles.userContainer}>
                <View style={styles.user}>
                  <Image source={signUpUser} style={styles.userName} />
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) =>
                      this.setState({
                        name: text,
                      })
                    }
                    placeholder={'Name'}
                    autoCapitalize={'words'}
                    returnKeyType={'next'}
                    maxLength={30}
                    keyboardType="default"
                    autoCorrect={false}
                    placeholderTextColor={Colors.lightgray}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={() => {
                      this.emailTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    onFocus={() => {
                      this._scrollToInput(0);
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={styles.userContainer}>
                <View style={styles.user}>
                  <Image source={email} style={styles.userName} />
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) =>
                      this.setState({
                        email: text,
                      })
                    }
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
                    onSubmitEditing={() => {
                      this.passTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    onFocus={() => {
                      this._scrollToInput(screenWidth / 8);
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={styles.userContainer}>
                <View style={styles.user}>
                  <Image source={lock} style={styles.userName} />
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) =>
                      this.setState({
                        password: text,
                      })
                    }
                    placeholder={'Password '}
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
                    onSubmitEditing={() => {
                      this.rePassTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    onFocus={() => {
                      this._scrollToInput(screenWidth / 5.1375);
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={styles.userContainer}>
                <View style={styles.user}>
                  <Image source={key} style={styles.userName} />
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) =>
                      this.setState({
                        repeatPassword: text,
                      })
                    }
                    placeholder={'Confirm Password'}
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
                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    onFocus={() => {
                      this._scrollToInput(screenWidth / 2.5);
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={styles.buttonSignUp}>
                <TouchableOpacity activeOpacity={0.5} style={styles.buttonSignUp1} onPress={this.signUp}>
                  <Text style={styles.textSignUp}>Sign Up</Text>
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
                  <Text style={styles.textLogin}>Login </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <DialogBox
          ref={(dialogbox) => {
            this.dialogbox = dialogbox;
          }}
          isOverlayClickClose={false}
          style={{ backgroundColor: '#333' }}
        />
      </View>
    );
  }
}

export default MainSignUpScreen;
