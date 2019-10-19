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
    Alert
} from "react-native";
import styles from "../../styles/SignUpScreenStyle/MainSignUpScreenStyle";
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import { screenWidth } from '../../constants/Dimensions';

type Props = {
    navigation?: any
}

class MainSignUpScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    state = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
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
            repeatPassword: ''
        })
    }

    signUp = async () => {
        if (this.state.password === this.state.repeatPassword) {
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
            const json = JSON.stringify(data);
            fetch(`${BASEURL}/api/user/insert_a_user`, {
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
                        this.props.navigation.navigate("verifyScreen")
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Alert.alert('Confirm password incorrect');
        }
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
                                <Image source={signUpUser} style={styles.userName} />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.setState({
                                        name: text
                                    })}
                                    placeholder={'Name'}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    placeholderTextColor={Colors.lightgray}
                                    underlineColorAndroid="transparent"
                                    onSubmitEditing={() => { this.emailTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    onFocus={() => {
                                        this._scrollToInput(0)
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
                                    ref={(input) => { this.emailTextInput = input; }}
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
                                        this._scrollToInput(screenWidth/6.85)
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
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    onFocus={() => {
                                        this._scrollToInput(screenWidth/2.74)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.buttonSignUp}>
                            <TouchableOpacity activeOpacity={0.5} style={styles.buttonSignUp1}
                                onPress={this.signUp}>
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
        );
    }
}


export default MainSignUpScreen;
