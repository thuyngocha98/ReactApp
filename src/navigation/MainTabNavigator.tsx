import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import {Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import FriendsScreen from '../screens/FriendsScreen';
import GroupScreen from '../screens/GroupScreen';
import SettingScreen from '../screens/AccountScreen';
import ActivityScreen from '../screens/ActivityScreen';
import AddExpense from "../screens/AddExpense";
import Colors from '../constants/Colors';

const configPlat = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        HomeScreen: FriendsScreen,
    },
    // config
);

HomeStack.navigationOptions = {
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
};


const LinksStack = createStackNavigator(
    {
        ProductsScreen: GroupScreen,
    },
    // config
);

LinksStack.navigationOptions = {
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
};


const ExpenseStack = createStackNavigator(
    {
        AddExpense
    }
);

ExpenseStack.navigationOptions= {
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

};


const ServicesStack = createStackNavigator(
    {
        ServicesScreen: ActivityScreen,
    },
    // config
);

ServicesStack.navigationOptions = {
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
};

// LinksStack.path = '';

const SettingStack = createStackNavigator(
    {
        SettingScreen,
    },
    // config
);

SettingStack.navigationOptions = {
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
};


const tabNavigator = createBottomTabNavigator({
    HomeStack,
    LinksStack,
    ExpenseStack,
    ServicesStack,
    SettingStack,
});

// tabNavigator.path = '';

export default tabNavigator;
