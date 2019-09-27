import React, {Component} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// @ts-ignore
import styles from "../styles/FriendsScreenStyles/FriendsScreenStyle/FriendsScreenStyle";
import {EvilIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
// @ts-ignore
import avatar from "../../assets/images/avatar.jpg"

class MainFriendsOwe extends Component {

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
            <View>
                <Text style={styles.friends}>
                    Friends
                </Text>
                <ScrollView >
                    <View style={styles.cartExpense}>
                        <Image style={styles.avatar} source={avatar}/>
                        <View style={{ flex: 1}} >
                            <Text style={{color: 'white'}}>Total balance</Text>
                            <Text style={styles.textDetail}>You are owned 305.151,00 US$</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}>
                            <MaterialCommunityIcons color={'white'} size={25} name={'menu'} style={styles.iconMenu}/>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default MainFriendsOwe;
