import React, {Component} from 'react';
import {screenWidth} from '../../constants/Dimensions';
import Dash from 'react-native-dash';
import {View, Text, Image, TouchableOpacity, AsyncStorage, StatusBar, ImageBackground} from "react-native";
import Colors from "../../constants/Colors";
import styles from "../../styles/AccountScreenStyle/MainAccountScreenStyle";
import {MaterialCommunityIcons, EvilIcons, AntDesign} from "@expo/vector-icons";
import {connect} from 'react-redux';
import {ImagePicker} from "expo";
import {BASEURL} from "../../api/api";
// @ts-ignore
import camera from '../../../assets/images/photo-camera.png';
import {applyMiddleware} from "redux";

function mapStateToProps(state) {
    return {
        user: state.dataUser.dataUser,
    };
}

type Props = {
    navigation?: any,
    user?: any,
}
type States = {}

class MainAccountScreen extends Component<Props, States> {
    state = {
        image: null,
    };


    _navListener: any;

    componentDidMount() {
        //set barstyle of statusbar
        if (this.props.user.uploadAvatar === true) {
            let avatar = this.props.user.avatar;
            if (avatar) {
                this.setState({
                    image: `${BASEURL}/api/user/get_image/` + avatar
                });
            }
        }
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            // call api get list group
        });
    }

    componentWillUnmount() {
        // remove barStyle when lead screen
        this._navListener.remove();
    }

    signOut = () => {
        AsyncStorage.removeItem('jwt').then(r => console.log(r));
        this.props.navigation.navigate('MainLoginScreen')
    };

    uploadAvatar = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            exif: true,
            allowsEditing: false,
            quality: 0.7,
            base64: true,
        });
        if (pickerResult.cancelled) {
            return;
        }
        let localUri = pickerResult.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        // @ts-ignore
        formData.append('photo', {uri: localUri, name: filename, type});
        return await fetch(`${BASEURL}/api/user/upload_avatar/${this.props.user._id}`, {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => res.json())
            .then(async res => {
                this.setState({
                    image: `${BASEURL}/api/user/get_image/` + res.data
                });
            })
            .catch(err => {
                console.error("error uploading images: ", err);
            });
    };

    sendAllMail = () => {
        fetch(`${BASEURL}/api/user/send_money_all_mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: null
        })
            .then((response) => response.json())
            .then(async (res) => {
              console.log(res);
            })
            .catch((error) => {
                alert(error);
            });
    };

    render() {
        let img = this.props.user.uploadAvatar === false ? <View style={styles.dashed}>
                <Image source={camera} style={styles.avatar}/>
            </View> :
            <Image source={{uri: this.state.image}} style={styles.uploadImage}/>;
        return (
            <View>
                <View style={styles.headerContainer}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent/>
                    <View style={styles.header}>
                        <Text style={styles.textAccount}>My Account</Text>
                        <TouchableOpacity onPress={this.uploadAvatar}>
                            {img}
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', marginTop: screenWidth / 82.2}}>
                            <MaterialCommunityIcons size={20} color={Colors.white} name={'gender-male'}
                                                    stype={styles.male}/>
                            <MaterialCommunityIcons size={20} color={Colors.white} name={'gender-male'}
                                                    stype={styles.male}/>
                        </View>
                        <Text style={styles.textUser}>{this.props.user.name}</Text>
                        <Text style={styles.email}>{this.props.user.email}</Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.overView}>
                        <MaterialCommunityIcons name={'home-outline'} size={25} color={'gray'}
                                                style={{marginLeft: screenWidth / 205.5,}}/>
                        <Text style={styles.textOverview}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.setting}>
                        <EvilIcons name={'user'} size={30} color={'gray'}/>
                        <Text style={styles.textSetting}>Account Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.help}>
                        <MaterialCommunityIcons name={'flag-outline'} size={25} color={'gray'}/>
                        <Text style={styles.textHelp}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOut} onPress={this.signOut}>
                        <AntDesign name={'logout'} size={20} color={'gray'} style={{marginLeft: screenWidth / 137,}}/>
                        <Text style={styles.textSignOut}>Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.sendAllMail} style={{
                        height: 40,
                        backgroundColor: 'green',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:10,
                        marginHorizontal:100,
                        borderRadius:20
                    }}>
                        <Text style={{color:Colors.white}}>tổng kết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
    null)(MainAccountScreen);
