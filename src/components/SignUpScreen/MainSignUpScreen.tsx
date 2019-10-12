import React, {Component} from 'react';
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
import {screenHeight, screenWidth} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
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

    componentWillUnmount() {
        this.setState({
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        })
    }

    signUp = async () => {
       if (this.state.password === this.state.repeatPassword )
       {
           const data = {
               name:this.state.name,
               email: this.state.email,
               password: this.state.password
           };
           const json = JSON.stringify(data);
           fetch('http://172.30.83.182:3001/api/users', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   Accept: 'application/json'
               },
               body: json
           })
               .then((response) => response.json())
               .then((res) => {
                   if (res.error){
                       Alert.alert(res.error);
                   } else {
                       Alert. alert('Success! You may now log in.');
                   }
               })
               .catch((error) => {
                   console.log(error);
               });
       } else {
           Alert.alert('Confirm password incorrect');
       }
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView behavior="height" style={{flex: 1}} enabled>
                    <View style={styles.mainContainer}>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent/>
                        <View>
                            <View style={styles.header}>
                                <Image source={reactLogo} style={styles.reactLogo}/>
                            </View>
                        </View>
                        <View>
                            <View style={styles.userContainer}>
                                <View style={styles.user}>
                                    <Image source={signUpUser} style={styles.userName}/>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={text => this.setState({
                                            name: text
                                        })}
                                        placeholder={'Name'}
                                        autoCapitalize={'none'}
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.userContainer}>
                                <View style={styles.user}>
                                    <Image source={email} style={styles.userName}/>
                                    <TextInput
                                        onChangeText={text => this.setState({
                                            email: text
                                        })}
                                        value={this.state.email}
                                        style={styles.input}
                                        autoCompleteType={'email'}
                                        placeholder={'Email'}
                                        autoCapitalize={'none'}
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.userContainer}>
                                <View style={styles.user}>
                                    <Image source={lock} style={styles.userName}/>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={text => this.setState({
                                            password: text
                                        })}
                                        placeholder={'Password'}
                                        secureTextEntry={true}
                                        autoCapitalize={'none'}
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.userContainer}>
                                <View style={styles.user}>
                                    <Image source={key} style={styles.userName}/>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={text => this.setState({
                                            repeatPassword: text
                                        })}
                                        placeholder={'Confirm Password'}
                                        secureTextEntry={true}
                                        autoCapitalize={'none'}
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        placeholderTextColor="rgba(0,0,0,0.3)"
                                        underlineColorAndroid="transparent"
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
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: screenHeight / 15,
        marginBottom: screenHeight / 15
    },
    reactLogo: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        tintColor: Colors.tabIconSelected,
        marginBottom: 10,
    },
    userContainer: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 10,
        marginBottom: screenWidth / 10
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 1,
        borderRadius: screenWidth / 15,
    },
    userName: {
        tintColor: Colors.blackText,
        width: screenWidth / 20,
        height: screenWidth / 20,
        marginLeft: 10,
        marginRight: 5
    },
    input: {
        fontSize: 16,
        marginLeft: 5,

    },
    buttonSignUp: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 30
    },
    buttonSignUp1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth / 16,
        backgroundColor: Colors.tabIconSelected,
    },
    textSignUp: {
        fontSize: 20,
        color: Colors.white
    },
    buttonLogin: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 30
    },
    buttonLogin1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: screenWidth / 16,
    },
    textLogin: {
        fontSize: 20,
        opacity: 0.7
    },
});

export default MainSignUpScreen;
