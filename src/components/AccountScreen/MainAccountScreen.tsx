
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, StatusBar } from "react-native";
import Colors from "../../constants/Colors";
import styles from "../../styles/AccountScreenStyle/MainAccountScreenStyle";
import { MaterialCommunityIcons, EvilIcons, AntDesign } from "@expo/vector-icons";
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

class MainAccountScreen extends Component<Props> {eat
    _navListener: any;

    componentDidMount() {

        //set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            // call api get list group
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    signOut = () => {
        AsyncStorage.removeItem('jwt').then(r => console.log(r));
        this.props.navigation.navigate('MainLoginScreen')
    };
    render() {
        const thumbnail = this.props.user.avatar.length > 2 ? { uri: `data:image/png;base64,${this.props.user.avatar}` } : thumbnails["avatar" + this.props.user.avatar]
        return (
            <View>
                <View style={styles.headerContainer}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                    <View style={styles.header}>
                        <Image source={thumbnail} style={styles.avatar} />
                        <Text style={styles.textUser}>{this.props.user.name}</Text>
                        <Text style={styles.email}>{this.props.user.email}</Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.overView}>
                        <MaterialCommunityIcons name={'home-outline'} size={25} color={'gray'} style={{ marginLeft: screenWidth / 205.5, }} />
                        <Text style={styles.textOverview}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.setting}
                        activeOpacity={0.6}
                        onPress={() => { this.props.navigation.navigate("EditProfileScreen", { name: this.props.user.name, email: this.props.user.email, userId: this.props.user._id,avatar: this.props.user.avatar }) }}
                    >
                        <EvilIcons name={'user'} size={30} color={'gray'} />
                        <Text style={styles.textSetting}>Account Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.help}>
                        <MaterialCommunityIcons name={'flag-outline'} size={25} color={'gray'} />
                        <Text style={styles.textHelp}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOut} onPress={this.signOut}>
                        <AntDesign name={'logout'} size={20} color={'gray'} style={{ marginLeft: screenWidth / 137, }} />
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
