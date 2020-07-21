import React, {Component} from 'react';
import MainFriendsOweScreen from "../components/FriendsScreen/MainFriendsOweScreen/MainFriendsOweScreen";
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import MainSearchScreen from '../components/SearchScreen/MainSearchScreen/MainSearchScreen';

type Props ={
  navigation? :any
};

class SearchScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
           <View>
               <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent/>
                <MainSearchScreen navigation={this.props.navigation}/>
           </View>
        );
    }
}

export default SearchScreen;
