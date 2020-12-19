import React, { Component } from 'react';
import { screenWidth } from '../../constants/Dimensions';
import styles from '../../styles/LoginScreenStyle/MainLoginScreenStyle';
import { connect } from 'react-redux';
import ModalNotification from '../components/ModalNotification';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
// @ts-ignore
import username from '../../../assets/images/username.png';
// @ts-ignore
import reactLogo from '../../../assets/images/wego.png';
// @ts-ignore
import password from '../../../assets/images/password.png';
// @ts-ignore
import eyeBlack from '../../../assets/images/eye_black.png';
// @ts-ignore
import emailEnvelope from '../../../assets/images/envelope-shape.png';
import Colors from '../../constants/Colors';
import { BASEURL } from '../../api/api';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../../actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  navigation?: any;
  getDataUser?: any;
};

type States = {
  showPass?: boolean;
  email?: string;
  password?: string;
  modalNotification?: {
    modalVisible?: boolean,
    type?: string,
    title?: string,
    description?: string,
    onPress?: () => void;
  },
};

class MainLoginScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };
  state = {
    showPass: true,
    email: '',
    password: '',
    modalNotification: {
      modalVisible: false,
      type: 'success',
      title: '',
      description: '',
      onPress: () => {}
    },
  };

  showPass = () => {
    this.setState({
      showPass: !this.state.showPass,
    });
  };
  scroll: any;
  secondTextInput: TextInput;

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  login = async () => {
    Keyboard.dismiss();
    if (!this.validateEmail(this.state.email)) {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Email không hợp lệ!',
        description: 'Vui lòng kiểm tra lại email của bạn.',
        modalVisible: true,
      }})
      return;
    }
    if (this.state.password === '') {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Mật khẩu không hợp lệ!',
        description: 'Vui lòng nhập lại mật khẩu.',
        modalVisible: true,
      }})
      return;
    }
    if (this.state.password.length < 5) {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Mật khẩu không hợp lệ!',
        description: 'Mật khẩu phải ít nhất 5 ký tự.',
        modalVisible: true,
      }})
      return;
    }
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.error) {
          if (res.error=='verify') {
            Keyboard.dismiss();
            this.setState({modalNotification: {
              type: 'warning',
              title: "Tài khoản của bạn chưa được xác minh!",
              description: 'Vui lòng xác minh tài khoản để tiếp tục.',
              modalVisible: true,
            }})
          } else {
            this.setState({modalNotification: {
              type: 'error',
              title: res.error,
              description: 'Vui lòng kiểm tra lại.',
              modalVisible: true,
            }})
          }
        } else {
          await AsyncStorage.setItem('jwt', res.token);
          this.getDataUserForRedux();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  onActionModal = () => {
    this.setState({modalNotification: {modalVisible: false}});
    if(this.state.modalNotification.title == 'Tài khoản của bạn chưa được xác minh!'){
      this.props.navigation.navigate('verifyScreen')
    }
  }

  async getDataUserForRedux() {
    const dataUser = await this.props.getDataUser();
    if (dataUser !== null) {
      this.props.navigation.navigate('GroupScreen');
    } else {
      this.setState({modalNotification: {
        type: 'error',
        title: 'Đã có lỗi xảy ra',
        description: 'Vui lòng kiểm tra đăng nhập lần nữa!',
        modalVisible: true,
      }})
    }
  }

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
          onPress={this.onActionModal}
        />
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled" // can click button when is openning keyboard
        >
          <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={'transparent'} translucent />
            <View style={styles.imageBackground}>
              <View style={styles.header}>
                <Image source={reactLogo} style={styles.reactLogo} resizeMode="contain" />
              </View>
              <View>
                <View style={styles.loginContainer}>
                  <View style={styles.login}>
                    <Image source={emailEnvelope} style={styles.email} />
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
                      blurOnSubmit={false}
                    />
                  </View>
                </View>
                <View style={styles.loginContainer}>
                  <View style={styles.login}>
                    <Image source={password} style={styles.password} />
                    <TextInput
                      style={styles.input1}
                      onChangeText={(text) =>
                        this.setState({
                          password: text,
                        })
                      }
                      placeholder={'Password'}
                      secureTextEntry={this.state.showPass}
                      autoCapitalize={'none'}
                      returnKeyType={'done'}
                      autoCorrect={false}
                      placeholderTextColor={Colors.lightgray}
                      underlineColorAndroid="transparent"
                      ref={(input) => {
                        this.secondTextInput = input;
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={this.showPass}>
                      <Image source={eyeBlack} style={styles.eyeBlack} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: screenWidth / 30 }}>
                <View style={styles.buttonLogin}>
                  <TouchableOpacity activeOpacity={0.5} style={styles.buttonLogin1} onPress={this.login}>
                    <Text style={styles.textLogin}>Đăng Nhập</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.footer}>
                    <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('MainSignUpScreen')}>
                      <Text style={styles.textRegister}>Đăng ký tài khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.forgot}
                      onPress={() => navigation.navigate('MainForgotPasswordScreen')}
                    >
                      <Text style={styles.textForgot}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDataUser: getApiDataUser,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(MainLoginScreen);
