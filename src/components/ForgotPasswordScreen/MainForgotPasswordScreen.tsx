import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  Keyboard,
} from 'react-native';
import styles from '../../styles/ForgotPasswordScreenStyles/MainForgotPasswordScreenStyle';
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
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenWidth } from '../../constants/Dimensions';
import DialogBox from 'react-native-dialogbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons1 from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigation?: any;
};
class MainForgotPasswordScreen extends Component<Props> {
  static navigationOptions = {
    header: null,
  };
  state = {
    email: '',
    pinCode: '',
    password: '',
    repeatPassword: '',
  };
  emailTextInput: TextInput;
  scroll: JSX.Element;
  pinCodeTextInput: any;
  passTextInput: any;
  rePassTextInput: TextInput;
  dialogbox: any;

  componentWillUnmount() {
    this.setState({
      email: '',
      pinCode: '',
      password: '',
      repeatPassword: '',
    });
  }

  handleOnPress(title, content) {
    // alert
    Keyboard.dismiss();
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

  onChangePassword = async () => {
    if (!this.validateEmail(this.state.email)) {
      this.handleOnPress('Error!', ['Email invalid!', 'Please check again.']);
      return;
    }
    if (this.state.password === '') {
      this.handleOnPress('Error!', ['Password invalid!', 'Please enter password.']);
      return;
    }
    if (this.state.password.length < 5) {
      this.handleOnPress('Error!', ['Password invalid!', 'Password must be at least 5 characters.']);
      return;
    }
    const data = {
      email: this.state.email,
    };
    if (this.state.password === this.state.repeatPassword) {
      const data = {
        email: this.state.email,
        password: this.state.password,
        pinCode: this.state.pinCode,
      };
      const json = JSON.stringify(data);
      fetch(`${BASEURL}/api/forgotPassword`, {
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
            AsyncStorage.removeItem('jwt');
            this.dialogbox.tip({
              title: 'Alert!',
              content: [res.result, "Let's go!"],
              btn: {
                text: 'OK',
                style: { fontWeight: '500', fontSize: 20, color: '#044de0' },
                callback: () => {
                  this.props.navigation.navigate('MainLoginScreen');
                },
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.handleOnPress('Error!', ['Confirm password incorrect', 'Please check again.']);
    }
  };

  sendMailGetCode = async () => {
    if (!this.validateEmail(this.state.email)) {
      this.handleOnPress('Error!', ['Email invalid!', 'Please check again.']);
      return;
    }
    const data = {
      email: this.state.email,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/sendMailGetCode`, {
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
          this.handleOnPress('Alert!', ['Sent Mail!', 'Please check your email.']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                  value={this.state.email}
                  placeholder={'Email '}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  keyboardType="email-address"
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightgray}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() => {
                    this.pinCodeTextInput.focus();
                  }}
                  blurOnSubmit={false}
                  onFocus={() => {
                    this._scrollToInput(0);
                  }}
                />
              </View>
              <TouchableOpacity style={styles.send} onPress={this.sendMailGetCode}>
                <Text style={styles.txtSend}>gửi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.user}>
                <MaterialIcons
                  name="confirmation-number"
                  size={25}
                  color={'gray'}
                  style={{ marginLeft: -screenWidth / 180 }}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    this.setState({
                      pinCode: text,
                    })
                  }
                  placeholder={'Mã PIN '}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  keyboardType="number-pad"
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightgray}
                  underlineColorAndroid="transparent"
                  ref={(input) => {
                    this.pinCodeTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.passTextInput.focus();
                  }}
                  blurOnSubmit={false}
                  onFocus={() => {
                    this._scrollToInput(screenWidth / 20.55);
                  }}
                />
              </View>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.user}>
                <MaterialIcons1
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
                  placeholder={'Mật khẩu mới '}
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
            <View style={styles.userContainer}>
              <View style={styles.user}>
                <Ionicons
                  name="md-key"
                  size={screenWidth / 14}
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
                  onFocus={() => {
                    this._scrollToInput(screenWidth / 2.5);
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonChange}>
              <TouchableOpacity activeOpacity={0.5} style={styles.buttonChange1} onPress={this.onChangePassword}>
                <Text style={styles.textChange}>Xác nhận thay đổi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonLogin}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonLogin1}
                onPress={() => navigation.navigate('MainLoginScreen')}
              >
                <Text style={styles.textLogin}>Đăng nhập </Text>
              </TouchableOpacity>
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

export default MainForgotPasswordScreen;
