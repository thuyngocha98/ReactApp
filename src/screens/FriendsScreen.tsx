import React, {Component} from 'react';
import MainFriendsOweScreen from "../components/FriendsScreen/MainFriendsOweScreen/MainFriendsOweScreen";
import {Text, TouchableOpacity, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";

type Props ={
  navigation? :any
};

class FriendsScreen extends Component<Props> {
    static  navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                elevation: 0
            },
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('SplitWiseProScreen')}>
                    <EvilIcons name='search' size={30} style={{marginLeft: 10}} />
                </TouchableOpacity>
            ),
            headerRight: (
                <View>
                    <TouchableOpacity activeOpacity={0.5} style={{marginRight: 20}} onPress={() => navigation.navigate('AddFriendsScreen')}>
                        <Text style={{fontSize: 20}}>
                            Add Friends
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    render() {
        return (
            <MainFriendsOweScreen navigation={this.props.navigation}/>
        );
    }
}

export default FriendsScreen;
