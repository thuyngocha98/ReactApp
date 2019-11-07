import React, {Component} from 'react';
import {View, Text,  Image, TouchableOpacity, AsyncStorage, StatusBar} from "react-native";
import Colors from "../../constants/Colors";
import styles from "../../styles/AccountScreenStyle/MainAccountScreenStyle";
import {MaterialCommunityIcons, EvilIcons, AntDesign} from "@expo/vector-icons";
import { connect } from 'react-redux';

// @ts-ignore
import { thumbnails } from '../../constants/FunctionCommon';
import { screenWidth } from '../../constants/Dimensions';


function mapStateToProps(state) {
    return {
        user: state.dataUser.dataUser,
    };
}

type Props = {
    navigation?: any,
    user?: any[],
}

class MainAccountScreen extends Component<Props> {
    signOut = () => {
      AsyncStorage.removeItem('jwt').then(r => console.log(r));
      this.props.navigation.navigate('MainLoginScreen')
    };
    render() {
        const thumbnail = thumbnails["avatar" + this.props.user.avatar]
        return (
            <View>
                <View style={styles.headerContainer}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                    <View style={styles.header}>
                        <Text style={styles.textAccount}>My Account</Text>
                        <Image source={thumbnail} style={styles.avatar}/>
                        <View style={{flexDirection: 'row', marginTop: screenWidth/82.2}}>
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
                        <MaterialCommunityIcons name={'home-outline'} size={25} color={'gray'} style={{marginLeft: screenWidth/205.5,}}/>
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
                        <AntDesign name={'logout'} size={20} color={'gray'} style={{ marginLeft: screenWidth/137, }}/>
                        <Text style={styles.textSignOut}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
    null)(MainAccountScreen);
