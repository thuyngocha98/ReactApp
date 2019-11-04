import React, { Component } from 'react';
import { screenWidth, screenHeight } from "../../constants/Dimensions";
import styles from "../../styles/LoginScreenStyle/MainLoginScreenStyle";
import { connect } from 'react-redux';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Image, TouchableOpacity, AsyncStorage, Alert, findNodeHandle, ScrollView
} from "react-native";
// @ts-ignore
import username from "../../../assets/images/username.png";
// @ts-ignore
import reactLogo from "../../../assets/images/wego.png";
// @ts-ignore
import password from "../../../assets/images/password.png";
// @ts-ignore
import eyeBlack from "../../../assets/images/eye_black.png";
// @ts-ignore
import emailEnvelope from "../../../assets/images/envelope-shape.png";
import Layout from "../../constants/Layout";
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BASEURL } from '../../api/api';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../../actions/action';
type Props = {
    navigation?: any,
    getDataUser?: any,
}

class MainLoginScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    state = {
        showPass: true,
        email: '',
        password: '',
    };

    showPass = () => {
        this.setState({
            showPass: !this.state.showPass
        })
    };
    scroll: any;
    secondTextInput: TextInput;

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login = async () => {
        if (!this.validateEmail(this.state.email)) {
            Alert.alert("Email invalid!");
            return;
        }
        if (this.state.password === "") {
            Alert.alert("Please enter password!");
            return;
        }
        if (this.state.password.length < 5) {
            Alert.alert("Password must be at least 5 characters!");
            return;
        }
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: json
        })
            .then((response) => response.json())
            .then(async (res) => {
                if (res.error) {
                    Alert.alert(res.error);
                } else {
                    await AsyncStorage.setItem('jwt', res.token);
                    this.getDataUserForRedux();
                }
            })
            .catch((error) => {
                alert(error);
            });
    };

    async getDataUserForRedux() {
        const dataUser = await this.props.getDataUser();
        if (dataUser !== null) {
            this.props.navigation.navigate('GroupScreen');
        }
        else{
            Alert.alert("Something error. Please login again!")
        }
    }



    _scrollToInput(position) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToPosition(position, position, true)
    }

    render() {
        const { navigation } = this.props;
        return (
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                innerRef={ref => { this.scroll = ref }}
                keyboardShouldPersistTaps='always' // can click button when is openning keyboard
            >
                <View style={styles.mainContainer}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent />
                    <View style={styles.imageBackground}>
                        <View style={styles.header}>
                            <Image source={reactLogo} style={styles.reactLogo} resizeMode='contain' />
                        </View>
                        <View>
                            <View style={styles.loginContainer}>
                                <View style={styles.login}>
                                    <Image source={emailEnvelope} style={styles.email} />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={text => this.setState({
                                            email: text
                                        })}
                                        placeholder={'Email '}
                                        autoCapitalize={'none'}
                                        returnKeyType={'next'}
                                        keyboardType='email-address'
                                        autoCorrect={false}
                                        placeholderTextColor={Colors.lightgray}
                                        underlineColorAndroid="transparent"
                                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                        blurOnSubmit={false}
                                        onFocus={() => {
                                            this._scrollToInput(0)
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.loginContainer}>
                                <View style={styles.login}>
                                    <Image source={password} style={styles.password} />
                                    <TextInput
                                        style={styles.input1}
                                        onChangeText={text => this.setState({
                                            password: text
                                        })}
                                        placeholder={'Password'}
                                        secureTextEntry={this.state.showPass}
                                        autoCapitalize={'none'}
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        placeholderTextColor={Colors.lightgray}
                                        underlineColorAndroid="transparent"
                                        ref={(input) => { this.secondTextInput = input; }}
                                        onFocus={() => {
                                            this._scrollToInput(screenWidth / 5.48)
                                        }}
                                    />
                                    <TouchableOpacity activeOpacity={0.5} onPress={this.showPass}>
                                        <Image
                                            source={eyeBlack}
                                            style={styles.eyeBlack}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: screenWidth / 30 }}>
                            <View style={styles.buttonLogin}>
                                <TouchableOpacity activeOpacity={0.5} style={styles.buttonLogin1} onPress={this.login}>
                                    <Text style={styles.textLogin}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View style={styles.footer} >
                                    <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('MainSignUpScreen')}>
                                        <Text style={styles.textRegister}>Create Account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('MainForgotPasswordScreen')}>
                                        <Text style={styles.textForgot}>Forgot Password</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getDataUser: getApiDataUser
    }, dispatch);
}


export default connect(null, mapDispatchToProps)(MainLoginScreen);
