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
import {EvilIcons} from '@expo/vector-icons';
import Layout from "../constants/Layout";
import styles from "../styles/FriendsScreen";

class FriendsScreen extends Component {
    // static navigationOptions = {
    //     headerStyle: {
    //         borderBottomWidth: 0,
    //         elevation:1
    //     }
    // };

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.search}>
                        <EvilIcons name='search' size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Text style={styles.addFriends}>
                            Add Friends
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.friends}>
                    Friends
                </Text>
                <View style={styles.cartExpense}>

                </View>
            </View>
        );
    }
}


export default FriendsScreen;
