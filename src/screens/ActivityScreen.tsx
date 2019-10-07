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
    static  navigationOptions = ({navigation}) => {
        return {
            title: "Recent activity",
            headerTitleStyle: {
                textAlign:"center",
                flex:1,
            },
            headerStyle: {
                elevation: 0,
                height: APPBAR_HEIGHT
            },
            headerRight:
                (
                    <View style={{ marginRight: 10}} >
                    </View>
                ),
            headerLeft: (
                <TouchableOpacity  onPress={ () => alert(' Tính năng đang phát triển') }>
                    <EvilIcons name='search' size={30} style={{marginLeft: 10}} />
                </TouchableOpacity>
            )
        }
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
