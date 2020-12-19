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
import { screenWidth } from '../../constants/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons1 from 'react-native-vector-icons/MaterialIcons';
import ModalNotification from '../components/ModalNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

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
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {},
    },
  };
  emailTextInput: TextInput;
  scroll: JSX.Element;
  pinCodeTextInput: any;
  passTextInput: any;
  rePassTextInput: TextInput;

  componentWillUnmount() {
    this.setState({
      email: '',
      pinCode: '',
      password: '',
      repeatPassword: '',
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onChangePassword = async () => {
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Email không đúng!',
          description: 'Vui lòng kiểm tra lại.',
          modalVisible: true,
        },
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Mật khẩu không đúng!',
          description: 'Vui lòng kiểm tra lại.',
          modalVisible: true,
        },
      });
      return;
    }
    if (this.state.password.length < 5) {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Mật khẩu không đúng!',
          description: 'Vui lòng kiểm tra lại.',
          modalVisible: true,
        },
      });
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
            this.setState({
              modalNotification: {
                type: 'error',
                title: 'Mã pin không đúng!',
                description: 'Vui lòng kiểm tra lại.',
                modalVisible: true,
              },
            });
          } else {
            AsyncStorage.removeItem('jwt');
            this.setState({
              modalNotification: {
                type: 'success',
                title: 'Thay đổi mật khẩu thành công!',
                description: 'Bạn có thể đăng nhập.',
                modalVisible: true,
                onPress: () => {
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
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Xác nhận mật khẩu không đúng!',
          description: 'Vui lòng kiểm tra lại.',
          modalVisible: true,
        },
      });
    }
  };

  sendMailGetCode = async () => {
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Email không đúng!',
          description: 'Vui lòng kiểm tra lại.',
          modalVisible: true,
        },
      });
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
          this.setState({
            modalNotification: {
              type: 'error',
              title: 'Email không đúng!',
              description: 'Vui lòng kiểm tra lại.',
              modalVisible: true,
            },
          });
        } else {
          this.setState({
            modalNotification: {
              type: 'success',
              title: 'Mã pin đã được gửi!',
              description: 'Vui lòng kiểm tra email của bạn.',
              modalVisible: true,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          onPress={() => this.setState({ modalNotification: { modalVisible: false } })}
        />
        <ScrollView
          style={{ flex: 1 }}
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
                  blurOnSubmit={false}
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
                  blurOnSubmit={false}
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
                  blurOnSubmit={false}
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
        </ScrollView>
      </View>
    );
  }
}

export default MainForgotPasswordScreen;
