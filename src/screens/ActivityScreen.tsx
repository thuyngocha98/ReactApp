import React, {Component} from 'react';
import MainFriendsOweScreen from "../components/FriendsScreen/MainFriendsOweScreen/MainFriendsOweScreen";
import {Text, TouchableOpacity, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import MainActivityScreen from "../components/ActivityScreen/RecentActivityScreen/MainActivityScreen";

type Props ={
    navigation?:any
}
class ActivityScreen extends Component<Props> {
    static  navigationOptions = ({navigation}) => {
        return {
            title: "Recent activity",
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },
            headerStyle: {
                elevation: 0
            },
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
