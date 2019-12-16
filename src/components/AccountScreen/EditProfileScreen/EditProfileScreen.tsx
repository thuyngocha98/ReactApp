import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Keyboard } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth, APPBAR_HEIGHT } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { BASEURL } from '../../../api/api';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../../../actions/action';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
    getDataUser?: any,
}

type States = {
    name?: string,
    email?: string
}

class EditProfileScreen extends Component<Props, States> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Edit Profile",
            headerTitleStyle: {
                textAlign: "center",
                flex: 1,
                color: Colors.white
            },
            headerStyle: {
                elevation: 0,
                height: APPBAR_HEIGHT,
                backgroundColor: Colors.tintColor
            },
            headerRight:
                (
                    <View style={{ marginRight: screenWidth / 27.4 }} >
                    </View>
                ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={30} color={Colors.white} style={{ marginLeft: screenWidth / 27.4 }} />
                </TouchableOpacity>
            )
        }
    };

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    editProfile(userId){
        Keyboard.dismiss();
        const name = this.state.name;
        const email = this.state.email;
        if(!this.validateEmail(email)){
            Alert.alert("Email invalid, please enter again!")
        }
        else if(name.length < 2){
            Alert.alert("Name must be at least 2 characters.")
        }else{
            const data = {
                name: name,
                email: email,
            };
            const json = JSON.stringify(data);
            fetch(`${BASEURL}/api/user/update_a_user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: json
            })
                .then((response) => response.json())
                .then((res) => {
                    if(res.result == 'ok'){
                        this.getDataUserForRedux();
                    }
                    Alert.alert(res.message)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    async getDataUserForRedux() {
        await this.props.getDataUser();
    }

    render() {
        const name = this.props.navigation.getParam('name', 'You Name');
        const email = this.props.navigation.getParam('email', 'youemail@gmail.com');
        const userId = this.props.navigation.getParam('userId', '');
        return (
            <View style={styles.container}>
                <View style={styles.background1}/>
                <View style={styles.background2}>
                    <View style={styles.sectionName}>
                        <View style={styles.viewName}>
                            <Text style={styles.name}>UserName</Text>
                        </View>
                        <View style={styles.inputName}>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => this.setState({
                                    name: text
                                })}
                                placeholder={name}
                                autoCapitalize={'words'}
                                returnKeyType={'next'}
                                keyboardType='default'
                                autoCorrect={false}
                                placeholderTextColor={Colors.lightgray}
                                underlineColorAndroid="transparent"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={{height: 0.5, width:screenWidth - 74, marginLeft: 37, backgroundColor: Colors.gray,}}/>
                    </View>
                    <View style={styles.sectionName}>
                        <View style={styles.viewName1}>
                            <Text style={styles.name}>Email</Text>
                        </View>
                        <View style={styles.inputName}>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => this.setState({
                                    email: text
                                })}
                                placeholder={email}
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                keyboardType='email-address'
                                autoCorrect={false}
                                placeholderTextColor={Colors.lightgray}
                                underlineColorAndroid="transparent"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={{ height: 0.5, width: screenWidth - 74, marginLeft: 37, backgroundColor: Colors.gray, }} />
                    </View>
                    <TouchableOpacity 
                        style={styles.btnDone}
                        onPress={() => { this.editProfile(userId)}}
                    >
                        <Text style={styles.txtDone}>DONE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.absoluteImage}>
                    <Image 
                        style={styles.avatar}
                        source= {require("../../../../assets/images/icon_camera.png")}
                        resizeMode='contain'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    background1: {
        height: 80,
        width: screenWidth,
        backgroundColor: Colors.lavender
    },
    background2: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    absoluteImage: {
        position: 'absolute',
        marginTop: 30,
        marginLeft: screenWidth / 2 - 50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.lightgray,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    sectionName: {
        flexDirection: 'column',
        marginVertical: 10,
    },
    viewName: {
        marginTop: 40,
        marginHorizontal: 20,
    },
    viewName1: {
        marginTop: 5,
        marginHorizontal: 20,
    },
    name: {
        fontSize: 16,
        color: Colors.tintColor
    },
    input: {
        fontSize: 16,
    },
    inputName: {
        marginHorizontal: 40,
        marginVertical: 8,
    },
    btnDone: {
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 8,
        backgroundColor: Colors.tintColor,
    },
    txtDone: {
        textAlign: 'center',
        paddingVertical: 15,
        color: Colors.black,
        fontSize: 17,
        fontWeight: '400'
    }
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getDataUser: getApiDataUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);