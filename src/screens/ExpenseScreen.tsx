import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { APPBAR_HEIGHT } from '../constants/Dimensions';
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import MainExpenseScreen from '../components/ExpenseScreen/MainExpenseScreen/MainExpenseScreen';

type Props = {
    navigation?: any,
}

class ExpenseScreen extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add an expense",
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
                height: APPBAR_HEIGHT,
                backgroundColor: Colors.tintColor,
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: Colors.white
            },
            headerRight:
                (
                    <View style={{ marginRight: 15 }}>
                        <Text style={{ fontSize: 17, color: Colors.white, opacity: 0.6 }}>Save</Text>
                    </View>
                ),
            headerLeft:
                (
                    <View style={{ marginLeft: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.goback();
                            }}
                        >
                            <Ionicons name='ios-close' size={45} color={Colors.white} />
                        </TouchableOpacity>
                    </View >
                )
        };
    };
    render() {
        return (
            <MainExpenseScreen navigation={this.props.navigation} />
        );
    }
}

export default ExpenseScreen;

