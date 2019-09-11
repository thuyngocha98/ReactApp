import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SettingScreen from '../screens/SettingScreen';
import ServicesScreen from '../screens/ServicesScreen';

const configPlat = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  // config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} 
          name={Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

// HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: ProductsScreen,
  },
  // config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-aperture' : 'md-aperture'} />
  ),
};

// LinksStack.path = '';

const ServicesStack = createStackNavigator(
  {
    Services: ServicesScreen,
  },
  // config
);

ServicesStack.navigationOptions = {
  tabBarLabel: 'Services',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  ),
};

// LinksStack.path = '';

const SettingStack = createStackNavigator(
  {
    Settings: SettingScreen,
  },
  // config
);

SettingStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

// SettingStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  ServicesStack,
  SettingStack,
});

// tabNavigator.path = '';

export default tabNavigator;
