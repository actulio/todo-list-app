import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import EditTodoScreen from '../screens/EditTodoScreen';
import NewTodoScreen from '../screens/NewTodoScreen';
import StatsScreen from '../screens/StatsScreen';


const DefaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.headerColor
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontFamily: 'Roboto_400Regular'
  },
};

const HomeNavigator = createStackNavigator(
  {
    HomeScreen,
    EditTodoScreen,
    NewTodoScreen
  },
  {
    defaultNavigationOptions: DefaultNavOptions
  }
);

const StatsNavigator = createStackNavigator(
  { StatsScreen },
  { defaultNavigationOptions: DefaultNavOptions }
);


const BottomTabsNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <Ionicons name="ios-list" size={20} color={tabInfo.tintColor} />
        ),
        tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'Roboto_400Regular' }}>Todos</Text>
      }
    },
    Stats: {
      screen: StatsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <Ionicons name="md-trending-up" size={20} color={tabInfo.tintColor} />
        ),
        tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'Roboto_400Regular' }}>Stats</Text>
      }
    },
  },
  {
    activeColor: Colors.activeColor,
    shifting: true,
    barStyle: {
      backgroundColor: Colors.backgroundColor
    },
    sceneAnimationEnabled: false,
    // prop above to disable white flashing/blanking while changing bottom tabs
  }
);

export default createAppContainer(BottomTabsNavigator);
