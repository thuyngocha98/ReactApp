import React from 'react';
import {Platform, View, Text} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import {Feather, MaterialCommunityIcons, Ionicons, EvilIcons} from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import FriendsScreen from '../screens/FriendsScreen';
import GroupScreen from '../screens/GroupScreen';
import ActivityScreen from "../screens/ActivityScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import Colors from '../constants/Colors';
import AccountScreen from "../screens/AccountScreen";
import {TouchableOpacity} from 'react-native-gesture-handler';
import CreateGroupScreen from '../components/GroupScreen/CreateGroupScreen/CreateGroupScreen';
import DetailGroupScreen from '../components/GroupScreen/DetailGroupScreen/DetailGroupScreen';
import AddFriendsScreen from "../components/FriendsScreen/AddFriendsScreen/AddFriendsScreen";
import AddContactScreen from "../components/FriendsScreen/AddContactScreen/AddContactScreen";
import SplitWiseProScreen from "../components/FriendsScreen/SplitWiseProScreen/SplitWiseProScreen";
import MainDetailsWhoPaidScreen from "../components/FriendsScreen/MainDetailsWhoPaidScreen/MainDetailsWhoPaidScreen";
import BalanceScreen from '../components/GroupScreen/DetailGroupScreen/BalanceScreen/BalanceScreen';
import MainActivityDetailsWhoPaidScreen from "../components/ActivityScreen/MainActivityDetailsWhoPaidScreen/MainActivityDetailsWhoPaidScreen";
import HeaderOweTripMemberScreen from "../components/FriendsScreen/OweTripsMemberScreen/HeaderOweTripMemberScreen";
import HeaderOweTripDetailsMemberScreen from "../components/FriendsScreen/OweTripsDetailMemberScreen/HeaderOweTripDetailsMemberScreen";
import MainLoginScreen from "../components/LoginScreen/MainLoginScreen";
import MainSignUpScreen from "../components/SignUpScreen/MainSignUpScreen";
import MainForgotPasswordScreen from "../components/ForgotPasswordScreen/MainForgotPasswordScreen";


const configPlat = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});


const FriendsStack = createStackNavigator(
    {
        MainLoginScreen,
        MainSignUpScreen,
        MainForgotPasswordScreen,
        FriendsScreen,
        AddFriendsScreen,
        AddContactScreen,
        SplitWiseProScreen,
        HeaderOweTripMemberScreen,
        HeaderOweTripDetailsMemberScreen,
        MainDetailsWhoPaidScreen,
    },
    {
        initialRouteName: ''
    }
);


FriendsStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == 'SplitWiseProScreen' || routeName == 'MainLoginScreen' || routeName == 'MainSignUpScreen' || routeName == 'MainForgotPasswordScreen') {
        tabBarVisible = false
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
        GroupScreen: {
            screen: GroupScreen,
        },
        CreateGroupScreen: {
            screen: CreateGroupScreen
        },
        DetailGroupScreen: {
            screen: DetailGroupScreen
        },
        BalanceScreen: {
            screen: BalanceScreen
        }
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
        MainActivityDetailsWhoPaidScreen
    },
    {
        initialRouteName: ''

    }
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
