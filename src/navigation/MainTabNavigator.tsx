import React from 'react';
import { Platform, Animated, Easing } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { Feather, MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';
import GroupScreen from '../screens/GroupScreen';
import SearchScreen from '../screens/SearchScreen';
import ActivityScreen from '../screens/ActivityScreen';
import Colors from '../constants/Colors';
import AccountScreen from '../screens/AccountScreen';
import CreateGroupScreen from '../components/GroupScreen/CreateGroupScreen/CreateGroupScreen';
import DetailGroupScreen from '../components/GroupScreen/DetailGroupScreen/DetailGroupScreen';
import MainPlanInTripScreen from '../components/GroupScreen/DetailGroupScreen/PlanTripScreen/MainPlanInTripScreen';
import DetailPlanInTripScreen from '../components/GroupScreen/DetailGroupScreen/PlanTripScreen/DetailPlanInTripScreen';
import MapPlanInTripScreen from '../components/GroupScreen/DetailGroupScreen/PlanTripScreen/MapPlanInTripScreen';
import AddDestinationInTripScreen from '../components/GroupScreen/DetailGroupScreen/PlanTripScreen/AddDestinationInTripScreen';
import DescriptionLocationInTripScreen from '../components/GroupScreen/DetailGroupScreen/PlanTripScreen/DescriptionLocationInTripScreen';
import BalanceScreen from '../components/GroupScreen/DetailGroupScreen/BalanceScreen/BalanceScreen';
import MainActivityDetailsWhoPaidScreen from '../components/ActivityScreen/MainActivityDetailsWhoPaidScreen/MainActivityDetailsWhoPaidScreen';
import TotalScreen from '../components/GroupScreen/DetailGroupScreen/TotalScreen/TotalScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import InputExpenseScreen from '../components/ExpenseScreen/InputExpenseScreen/InputExpenseScreen';
import ExpenseDetailScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseDetailScreen';
import ExpenseMoreOptionScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseMoreOptionScreen/EqualSplit/ExpenseMoreOptionScreen';
import ExpenseByNumberSplitScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseMoreOptionScreen/NumberSplit/ExpenseByNumberSplitScreen';
import ExpenseByPlusOrMinusScreen from '../components/ExpenseScreen/ExpenseDetailScreen/ExpenseMoreOptionScreen/PlusMinusSplit/ExpenseByPlusOrMinusScreen';
import MainLoginScreen from '../components/LoginScreen/MainLoginScreen';
import MainSignUpScreen from '../components/SignUpScreen/MainSignUpScreen';
import verifyScreen from '../components/SignUpScreen/verifyScreen';
import MainForgotPasswordScreen from '../components/ForgotPasswordScreen/MainForgotPasswordScreen';
import AddMemberGroupScreen from '../components/GroupScreen/CreateGroupScreen/AddMemberGroupScreen';
import ChoosePayerScreen from '../components/ExpenseScreen/ChoosePayerScreen/ChoosePayerScreen';
import ChooseMultiplePeopleScreen from '../components/ExpenseScreen/ChoosePayerScreen/ChooseMultiplePeopleScreen/ChooseMultiplePeopleScreen';
import DetaiTransactionScreen from '../components/GroupScreen/DetailGroupScreen/DetailTransactionScreen/DetaiTransactionScreen';
import { screenWidth } from '../constants/Dimensions';
import SearchDetailScreen from '../components/SearchScreen/SearchDetailScreen/SearchDetailScreen';
import DescriptionLocationScreen from '../components/SearchScreen/SearchDetailScreen/DescriptionLocationScreen';
import MainExpenseScreen from '../components/ExpenseScreen/MainExpenseScreen/MainExpenseScreen';
import MainScreenGroup from '../components/GroupScreen/MainScreenGroup/MainScreenGroup';
import PlanTripScreen from '../components/SearchScreen/PlanTripScreen/PlanTripScreen';
import SelectPlanTripScreen from '../components/SearchScreen/PlanTripScreen/SelectPlanTripScreen';
import MapPlanScreen from '../components/SearchScreen/PlanTripScreen/MapPlanScreen';
import AddDestinationScreen from '../components/SearchScreen/PlanTripScreen/AddDestinationScreen';
import EditProfileScreen from '../components/AccountScreen/EditProfileScreen/EditProfileScreen';
import ShowImagesScreen from '../components/GroupScreen/DetailGroupScreen/ImagesScreen/ShowImagesScreen';
import AddImagesScreen from '../components/GroupScreen/DetailGroupScreen/ImagesScreen/AddImagesScreen';
import ChatGroupScreen from '../components/GroupScreen/Chat/ChatGroupScreen';
import MainLocationScreen from '../components/Location/MainLocationScreen';
import AudioRecordingScreen from '../components/GroupScreen/Chat/AudioRecordingScreen';
import MainDirectionScreen from '../components/Direction/MainDirectionScreen';

const configPlat = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const SearchStack = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen,
  },
  SearchDetailScreen: {
    screen: SearchDetailScreen,
  },
  PlanTripScreen: {
    screen: PlanTripScreen,
  },
  AddDestinationScreen: {
    screen: AddDestinationScreen,
  },
  MapPlanScreen: {
    screen: MapPlanScreen
  },
  DescriptionLocationScreen: {
    screen: DescriptionLocationScreen
  },
  SelectPlanTripScreen: {
    screen: SelectPlanTripScreen
  }
});

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0){
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused }) => (
      <Octicons
        focused={focused}
        name={'search'}
        size={22}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.blackText}
      />
    ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: Colors.tintColor,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      },
    },
  };
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
    MainScreenGroup: {
      screen: MainScreenGroup,
    },
    CreateGroupScreen: {
      screen: CreateGroupScreen,
    },
    AddMemberGroupScreen: {
      screen: AddMemberGroupScreen,
    },
    DetailGroupScreen: {
      screen: DetailGroupScreen,
    },
    ShowImagesScreen: {
      screen: ShowImagesScreen,
    },
    AddImagesScreen: {
      screen: AddImagesScreen,
    },
    DetaiTransactionScreen: {
      screen: DetaiTransactionScreen,
    },
    BalanceScreen: {
      screen: BalanceScreen,
    },
    TotalScreen: {
      screen: TotalScreen,
    },
    ChatGroupScreen: {
      screen: ChatGroupScreen,
    },
    InputExpenseScreen: {
      screen: InputExpenseScreen,
    },
    ChoosePayerScreen: {
      screen: ChoosePayerScreen,
    },
    ChooseMultiplePeopleScreen: {
      screen: ChooseMultiplePeopleScreen,
    },
    ExpenseDetailScreen: {
      screen: ExpenseDetailScreen,
    },
    ExpenseMoreOptionScreen: {
      screen: ExpenseMoreOptionScreen,
    },
    ExpenseByNumberSplitScreen: {
      screen: ExpenseByNumberSplitScreen,
    },
    ExpenseByPlusOrMinusScreen: {
      screen: ExpenseByPlusOrMinusScreen,
    },
    MainLocationScreen,
    MainDirectionScreen,
    MainPlanInTripScreen: {
      screen: MainPlanInTripScreen,
    },
    DetailPlanInTripScreen: {
      screen: DetailPlanInTripScreen,
    },
    MapPlanInTripScreen: {
      screen: MapPlanInTripScreen,
    },
    AddDestinationInTripScreen: {
      screen: AddDestinationInTripScreen,
    },
    DescriptionLocationInTripScreen: {
      screen: DescriptionLocationInTripScreen
    },
  },
  {
    initialRouteName: 'GroupScreen',
  },
  // config
);

GroupStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if(navigation.state.index > 0){
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Groups',
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        focused={focused}
        name={Platform.OS === 'ios' ? 'account-group' : 'account-group'}
        size={28}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.blackText}
      />
    ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: Colors.tintColor,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      },
    },
  };
};

const ExpenseStack = createStackNavigator(
  {
    ExpenseScreen: {
      screen: ExpenseScreen,
    },
    InputExpenseScreen: {
      screen: InputExpenseScreen,
    },
    MainExpenseScreen: {
      screen: MainExpenseScreen,
    },
    ChoosePayerScreen: {
      screen: ChoosePayerScreen,
    },
    ChooseMultiplePeopleScreen: {
      screen: ChooseMultiplePeopleScreen,
    },
    ExpenseDetailScreen: {
      screen: ExpenseDetailScreen,
    },
    ExpenseMoreOptionScreen: {
      screen: ExpenseMoreOptionScreen,
    },
    ExpenseByNumberSplitScreen: {
      screen: ExpenseByNumberSplitScreen,
    },
    ExpenseByPlusOrMinusScreen: {
      screen: ExpenseByPlusOrMinusScreen,
    },
  },
  {
    initialRouteName: 'ExpenseScreen',
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
  let tabBarVisible = true;
  if(navigation.state.index > 0){
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Expense',
    tabBarIcon: ({ focused }) => (
      <Ionicons
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'ios-add-circle-outline'}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.blackText}
      />
    ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: Colors.tintColor,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      },
    },
  };
};

const ActivityStack = createStackNavigator(
  {
    ActivityScreen,
    MainActivityDetailsWhoPaidScreen,
  },
  {
    initialRouteName: '',
  },
  // config
);

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <Feather
      focused={focused}
      name={Platform.OS === 'ios' ? 'activity' : 'activity'}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.blackText}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    labelStyle: {
      paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
    },
    style: {
      height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
    },
  },
};

// LinksStack.path = '';

const AccountStack = createStackNavigator(
  {
    AccountScreen,
    EditProfileScreen: {
      screen: EditProfileScreen,
    },
    AudioRecordingScreen,
  },
  // config
);

AccountStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0){
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Account',
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        focused={focused}
        name={Platform.OS === 'ios' ? 'account-circle' : 'account-circle'}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.blackText}
      />
    ),
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: Colors.tintColor,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      },
    },
  };
};

const tabNavigator = createBottomTabNavigator({
  //FriendsStack,
  SearchStack,
  GroupStack,
  // ExpenseStack,
  ActivityStack,
  AccountStack,
});

export default tabNavigator;
