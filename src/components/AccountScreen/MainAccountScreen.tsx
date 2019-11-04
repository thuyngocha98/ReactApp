import React, {Component} from 'react';
import {View, Text,  Image, TouchableOpacity, AsyncStorage, StatusBar} from "react-native";
import Colors from "../../constants/Colors";
import styles from "../../styles/AccountScreenStyle/MainAccountScreenStyle";
import {MaterialCommunityIcons, EvilIcons, AntDesign} from "@expo/vector-icons";
// @ts-ignore
import avatar from "../../../assets/images/avatar.jpg";

type Props = {
    navigation?: any
}

class MainAccountScreen extends Component<Props> {
    signOut = () => {
      AsyncStorage.removeItem('jwt').then(r => console.log(r));
      this.props.navigation.navigate('MainLoginScreen')
    };
    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                    <View style={styles.header}>
                        <Text style={styles.textAccount}>My Account</Text>
                        <Image source={avatar} style={styles.avatar}/>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons size={20} color={Colors.white} name={'gender-male'}
                                                    stype={styles.male}/>
                            <MaterialCommunityIcons size={20} color={Colors.white} name={'gender-male'}
                                                    stype={styles.male}/>
                        </View>
                        <Text style={styles.textUser}>Minh Trung</Text>
                        <Text style={styles.email}>minhtrung2031997@gmail.com</Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.overView}>
                        <MaterialCommunityIcons name={'home-outline'} size={35} color={'gray'}/>
                        <Text style={styles.textOverview}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.setting}>
                        <EvilIcons name={'user'} size={40} color={'gray'}/>
                        <Text style={styles.textSetting}>Account Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.help}>
                        <MaterialCommunityIcons name={'flag-outline'} size={35} color={'gray'}/>
                        <Text style={styles.textHelp}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOut} onPress={this.signOut}>
                        <AntDesign name={'logout'} size={25} color={'gray'}/>
                        <Text style={styles.textSignOut}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



export default MainAccountScreen;
