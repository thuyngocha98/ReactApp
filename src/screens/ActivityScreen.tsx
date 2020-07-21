import React, {Component} from 'react';
import MainFriendsOweScreen from "../components/FriendsScreen/MainFriendsOweScreen/MainFriendsOweScreen";
import {Text, TouchableOpacity, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import MainActivityScreen from "../components/ActivityScreen/RecentActivityScreen/MainActivityScreen";
import { APPBAR_HEIGHT } from '../constants/Dimensions';

type Props ={
    navigation?:any
}
class ActivityScreen extends Component<Props> {
    static  navigationOptions = {
      header : null
    };
    render() {

        return (
            <MainActivityScreen
                navigation ={this.props.navigation}
            />
        );
    }
}

export default ActivityScreen;
