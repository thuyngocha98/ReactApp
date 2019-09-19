import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import {Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import FriendsScreen from '../screens/FriendsScreen';
import GroupScreen from '../screens/GroupScreen';
import ActivityScreen from '../screens/ActivityScreen';
import AddExpenseScreen from "../screens/AddExpenseScreen";
import Colors from '../constants/Colors';
import AccountScreen from "../screens/AccountScreen";
import AddFriendsScreen from "../screens/AddFriendsScreen";
import AddContactScreen from "../screens/AddContactScreen";

const configPlat = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});


const FriendsStack = createStackNavigator(
    {
        FriendsScreen,
        AddFriendsScreen,
        AddContactScreen
    },
    {
        initialRouteName: '',
    }
);

FriendsStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        tabBarLabel: 'Friends',
        tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons focused={focused}
                                    name={Platform.OS === 'ios'
                                        ? 'ios-home'
                                        : 'account'
                                    }
                                    size={26}
                                    style={{marginBottom: -3}}
                                    color={focused ? Colors.tabIconSelected : Colors.blackText}
            />
        ),
        tabBarOptions: {
            activeTintColor: Colors.tintColor,
            labelStyle: {
                marginBottom: 5
            }
        }
    }
};


const GroupStack = createStackNavigator(
    {
        GroupScreen,
    },
    // config
);

GroupStack.navigationOptions = {
    tabBarLabel: 'Groups',
    tabBarIcon: ({focused}) => (
        <MaterialCommunityIcons focused={focused}
                                name={Platform.OS === 'ios'
                                    ? 'ios-home'
                                    : 'account-group'
                                }
                                size={26}
                                style={{marginBottom: -3}}
                                color={focused ? Colors.tabIconSelected : Colors.blackText}
        />
    ),
    tabBarOptions: {
        activeTintColor: Colors.tintColor,
        labelStyle: {
            marginBottom: 5
        }
    }
};


const ExpenseStack = createStackNavigator(
    {
        AddExpense: AddExpenseScreen
    }
);

ExpenseStack.navigationOptions = {
    tabBarLabel: 'Expense',
    tabBarIcon: ({focused}) => (
        <Ionicons focused={focused}
                  name={Platform.OS === 'ios'
                      ? 'ios-home'
                      : 'ios-add-circle-outline'
                  }
                  size={26}
                  style={{marginBottom: -3}}
                  color={focused ? Colors.tabIconSelected : Colors.blackText}
        />
    ),
    tabBarOptions: {
        activeTintColor: Colors.tintColor,
        labelStyle: {
            marginBottom: 5
        }
    }

};


const ActivityStack = createStackNavigator(
    {
        ActivityScreen,
    },
    // config
);

ActivityStack.navigationOptions = {
    tabBarLabel: 'Activity',
    tabBarIcon: ({focused}) => (
        <Feather focused={focused}
                 name={Platform.OS === 'ios'
                     ? 'ios-home'
                     : 'activity'
                 }
                 size={26}
                 style={{marginBottom: -3}}
                 color={focused ? Colors.tabIconSelected : Colors.blackText}
        />
    ),
    tabBarOptions: {
        activeTintColor: Colors.tintColor,
        labelStyle: {
            marginBottom: 5
        }
    }
};

// LinksStack.path = '';

const AccountStack = createStackNavigator(
    {
        AccountScreen,
    },
    // config
);

AccountStack.navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon: ({focused}) => (
        <MaterialCommunityIcons focused={focused}
                                name={Platform.OS === 'ios'
                                    ? 'ios-home'
                                    : 'account-circle'
                                }
                                size={26}
                                style={{marginBottom: -3}}
                                color={focused ? Colors.tabIconSelected : Colors.blackText}
        />
    ),
    tabBarOptions: {
        activeTintColor: Colors.tintColor,
        labelStyle: {
            marginBottom: 5
        }
    }
};


const tabNavigator = createBottomTabNavigator({
    FriendsStack,
    GroupStack,
    ExpenseStack,
    ActivityStack,
    AccountStack,
});

export default tabNavigator;
