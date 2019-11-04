import React from 'react';
import { Platform, View, Text, Animated, Easing } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { Feather, MaterialCommunityIcons, Ionicons, EvilIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import FriendsScreen from '../screens/FriendsScreen';
import GroupScreen from '../screens/GroupScreen';
import ActivityScreen from "../screens/ActivityScreen";
import Colors from '../constants/Colors';
import AccountScreen from "../screens/AccountScreen";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CreateGroupScreen from '../components/GroupScreen/CreateGroupScreen/CreateGroupScreen';
import DetailGroupScreen from '../components/GroupScreen/DetailGroupScreen/DetailGroupScreen';
import AddFriendsScreen from "../components/FriendsScreen/AddFriendsScreen/AddFriendsScreen";
import AddContactScreen from "../components/FriendsScreen/AddContactScreen/AddContactScreen";
import SplitWiseProScreen from "../components/FriendsScreen/SplitWiseProScreen/SplitWiseProScreen";
import MainDetailsWhoPaidScreen from "../components/FriendsScreen/MainDetailsWhoPaidScreen/MainDetailsWhoPaidScreen";
import BalanceScreen from '../components/GroupScreen/DetailGroupScreen/BalanceScreen/BalanceScreen';
import MainActivityDetailsWhoPaidScreen from "../components/ActivityScreen/MainActivityDetailsWhoPaidScreen/MainActivityDetailsWhoPaidScreen";
import MainActivityScreen from "../components/ActivityScreen/RecentActivityScreen/MainActivityScreen";
import TotalScreen from '../components/GroupScreen/DetailGroupScreen/TotalScreen/TotalScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import InputExpenseScreen from '../components/ExpenseScreen/InputExpenseScreen/InputExpenseScreen';
import ExpenseDetailScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseDetailScreen';
import ExpenseMoreOptionScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseMoreOptionScreen/EqualSplit/ExpenseMoreOptionScreen';
import ExpenseByNumberSplitScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseMoreOptionScreen/NumberSplit/ExpenseByNumberSplitScreen';
import ExpenseByPlusOrMinusScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseMoreOptionScreen/PlusMinusSplit/ExpenseByPlusOrMinusScreen';
import HeaderOweTripMemberScreen from "../components/FriendsScreen/OweTripsMemberScreen/HeaderOweTripMemberScreen";
import HeaderOweTripDetailsMemberScreen from "../components/FriendsScreen/OweTripsDetailMemberScreen/HeaderOweTripDetailsMemberScreen";
import MainLoginScreen from "../components/LoginScreen/MainLoginScreen";
import MainSignUpScreen from "../components/SignUpScreen/MainSignUpScreen";
import verifyScreen from "../components/SignUpScreen/verifyScreen";
import MainForgotPasswordScreen from "../components/ForgotPasswordScreen/MainForgotPasswordScreen";
import AddMemberGroupScreen from '../components/GroupScreen/CreateGroupScreen/AddMemberGroupScreen';
import ChoosePayerScreen from '../components/ExpenseScreen/ChoosePayerScreen/ChoosePayerScreen';

const configPlat = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const FriendsStack = createStackNavigator(
    {
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


FriendsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == 'SplitWiseProScreen') {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
        tabBarLabel: 'Friends',
        tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons focused={focused}
                name={Platform.OS === 'ios'
                    ? 'ios-home'
                    : 'account'
                }
                size={26}
                style={{ marginBottom: -3 }}
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
        MainLoginScreen: {
            screen: MainLoginScreen,
        },
        MainSignUpScreen: {
            screen: MainSignUpScreen,
        },
        MainForgotPasswordScreen: {
            screen: MainForgotPasswordScreen,
        },
        verifyScreen: {
            screen: verifyScreen,
        },
        GroupScreen: {
            screen: GroupScreen,
        },
        CreateGroupScreen: {
            screen: CreateGroupScreen
        },
        AddMemberGroupScreen: {
            screen: AddMemberGroupScreen,
        },
        DetailGroupScreen: {
            screen: DetailGroupScreen
        },
        BalanceScreen: {
            screen: BalanceScreen
        },
        TotalScreen: {
            screen: TotalScreen
        }
    },
    // config
);

GroupStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    let routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == 'CreateGroupScreen' || routeName == 'MainLoginScreen' || routeName == 'MainForgotPasswordScreen' || routeName == 'MainSignUpScreen' 
        || routeName == 'verifyScreen' || routeName == 'CreateGroupScreen' || routeName == 'DetailGroupScreen' || routeName == 'BalanceScreen'
        || routeName == 'TotalScreen' || routeName == 'AddMemberGroupScreen'){
        tabBarVisible = false
    }
    return {
        tabBarVisible,
        tabBarLabel: 'Groups',
        tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons focused={focused}
                name={Platform.OS === 'ios'
                    ? 'ios-home'
                    : 'account-group'
                }
                size={26}
                style={{ marginBottom: -3 }}
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
};


const ExpenseStack = createStackNavigator(
    {
        AddExpense: {
            screen: ExpenseScreen,
        },
        InputExpenseScreen: {
            screen: InputExpenseScreen,
        },
        ChoosePayerScreen: {
            screen: ChoosePayerScreen,
        },
        ExpenseDetailScreen: {
            screen: ExpenseDetailScreen,
        },
        ExpenseMoreOptionScreen: {
            screen: ExpenseMoreOptionScreen,
        },
        ExpenseByNumberSplitScreen: {
            screen: ExpenseByNumberSplitScreen
        },
        ExpenseByPlusOrMinusScreen: {
            screen: ExpenseByPlusOrMinusScreen,

        },
    },
    {
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                timing: Animated.timing,
                easing: Easing.step0,
            },
        }),
    },
    
);

ExpenseStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            if (route.routeName === "ExpenseDetailScreen") {
                tabBarVisible = false;
            }
            else if (route.routeName === "ExpenseMoreOptionScreen") {
                tabBarVisible = false;
            }
            else if (route.routeName === "ExpenseByNumberSplitScreen") {
                tabBarVisible = false;
            }
            else if (route.routeName === "ExpenseByPlusOrMinusScreen") {
                tabBarVisible = false;
            }
            else if (route.routeName === "ChoosePayerScreen") {
                tabBarVisible = false;
            }
            else if (route.routeName === "InputExpenseScreen") {
                tabBarVisible = false;
            }
            else {
                tabBarVisible = true;
            }
        });
    }
    return {
        tabBarVisible,
        tabBarLabel: 'Expense',
        tabBarIcon: ({ focused }) => (
            <Ionicons focused={focused}
                name={Platform.OS === 'ios'
                    ? 'ios-home'
                    : 'ios-add-circle-outline'
                }
                size={26}
                style={{ marginBottom: -3 }}
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
    tabBarIcon: ({ focused }) => (
        <Feather focused={focused}
            name={Platform.OS === 'ios'
                ? 'ios-home'
                : 'activity'
            }
            size={26}
            style={{ marginBottom: -3 }}
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
    tabBarIcon: ({ focused }) => (
        <MaterialCommunityIcons focused={focused}
            name={Platform.OS === 'ios'
                ? 'ios-home'
                : 'account-circle'
            }
            size={26}
            style={{ marginBottom: -3 }}
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
    AccountStack
});


export default tabNavigator;
