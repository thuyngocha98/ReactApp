import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView, AsyncStorage, Alert
} from "react-native";
import styles from '../../styles/ForgotPasswordScreenStyles/MainForgotPasswordScreenStyle'
// @ts-ignore
import reactLogo from "../../../assets/images/Reactlogo.png";
// @ts-ignore
import signUpUser from "../../../assets/images/signUpUser.png";
// @ts-ignore
import email from "../../../assets/images/envelope.png";
// @ts-ignore
import lock from "../../../assets/images/lock.png";
// @ts-ignore
import key from "../../../assets/images/key.png";

import { BASEURL } from '../../api/api';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenWidth } from '../../constants/Dimensions';
type Props = {
    navigation?: any
};
class MainForgotPasswordScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    state = {
        email: '',
        pinCode: '',
        password: '',
        repeatPassword: ''
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
            repeatPassword: ''
        })
    }

    onChangePassword = async () => {
        if (this.state.password === this.state.repeatPassword) {
            const data = {
                email: this.state.email,
                password: this.state.password,
                pinCode: this.state.pinCode
            };
            const json = JSON.stringify(data);
            fetch(`${BASEURL}/api/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: json
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.error) {
                        Alert.alert(res.error);
                    } else {
                        AsyncStorage.removeItem('jwt');
                        Alert.alert(
                            'Change Password',
                            res.result,
                            [{
                                text: 'OK', onPress: () => {
                                        this.props.navigation.navigate("MainLoginScreen")
                                }},
                            ],
                            { cancelable: false },
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Alert.alert('Confirm password incorrect');
        }
    };

    sendMailGetCode = async () => {
        const data = {
            email: this.state.email,
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/sendMailGetCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: json
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    Alert.alert(res.error);
                } else {
                    Alert.alert(
                        'Sent Mail',
                        res.result + "\nPlease check your email",
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // screen scroll when click on textInput
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
                    <View>
                        <View style={styles.header}>
                            <Image source={reactLogo} style={styles.reactLogo} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.userContainer}>
                            <View style={styles.user}>
                                <Image source={email} style={styles.userName} />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.setState({
                                        email: text
                                    })}
                                    value={this.state.email}
                                    placeholder={'Email '}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    keyboardType='email-address'
                                    autoCorrect={false}
                                    placeholderTextColor={Colors.lightgray}
                                    underlineColorAndroid="transparent"
                                    onSubmitEditing={() => { this.pinCodeTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    onFocus={() => {
                                        this._scrollToInput(0)
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.send} onPress={this.sendMailGetCode}>
                                <Text style={styles.txtSend}>send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={styles.userContainer}>
                            <View style={styles.user}>
                                <MaterialIcons name="confirmation-number" size={25} color={Colors.blackText} />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.setState({
                                        pinCode: text
                                    })}
                                    placeholder={'PIN Code '}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    keyboardType='number-pad'
                                    autoCorrect={false}
                                    placeholderTextColor={Colors.lightgray}
                                    underlineColorAndroid="transparent"
                                    ref={(input) => { this.pinCodeTextInput = input; }}
                                    onSubmitEditing={() => { this.passTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    onFocus={() => {
                                        this._scrollToInput(screenWidth/20.55)
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
                                    onChangeText={text => this.setState({
                                        password: text
                                    })}
                                    placeholder={'Password '}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    keyboardType='default'
                                    secureTextEntry
                                    autoCorrect={false}
                                    placeholderTextColor={Colors.lightgray}
                                    underlineColorAndroid="transparent"
                                    ref={(input) => { this.passTextInput = input; }}
                                    onSubmitEditing={() => { this.rePassTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    onFocus={() => {
                                        this._scrollToInput(screenWidth/5.1375)
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
                                    onChangeText={text => this.setState({
                                        repeatPassword: text
                                    })}
                                    placeholder={'Confirm Password'}
                                    autoCapitalize={'none'}
                                    returnKeyType={'done'}
                                    keyboardType='default'
                                    secureTextEntry
                                    autoCorrect={false}
                                    placeholderTextColor={Colors.lightgray}
                                    underlineColorAndroid="transparent"
                                    ref={(input) => { this.rePassTextInput = input; }}
                                    onFocus={() => {
                                        this._scrollToInput(screenWidth/2.74)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.buttonChange}>
                            <TouchableOpacity activeOpacity={0.5} style={styles.buttonChange1} onPress={this.onChangePassword}>
                                <Text style={styles.textChange}>Change confirmation</Text>
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
        );
    }
}

export default MainForgotPasswordScreen;
