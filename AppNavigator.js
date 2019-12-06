// AppNavigator.js

import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text } from 'react-native-elements'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import ProfileScreen from './components/ProfileScreen'
import EventsScreen from './components/EventsScreen'
import HomeScreen from './components/HomeScreen'
import ArchiveScreen from './components/ArchiveScreen'
import ChatScreen from './components/ChatScreen'
import SettingsScreen from './components/SettingsScreen'
import FriendsScreen from './components/FriendsScreen'
import AddFriendsScreen from './components/AddFriendsScreen'
import FindTimeScreen from './components/FindTimeScreen'

const HomeNav = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Messages: {
      screen: ArchiveScreen,
      navigationOptions: {
        title: 'Messages',
        headerTintColor: '#f50',
        headerTitleStyle: { color: 'black' }
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        headerTintColor: '#f50',
        headerTitleStyle: { color: 'black' }
      }
    },
    FindTime: {
      screen: FindTimeScreen,
      navigationOptions: {
        title: "Plan a meetup",
        headerTintColor: '#f50',
        headerTitleStyle: { color: 'black' }
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const ProfileNav = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile'
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        headerTintColor: '#f50',
        headerTitleStyle: { color: 'black' }
      }
    },
    Friends: {
      screen: FriendsScreen,
      navigationOptions: {
        title: 'Friends',
        headerTintColor: '#f50',
        headerTitleStyle: { color: 'black' }
      }
    },
    AddFriends: {
      screen: AddFriendsScreen,
      navigationOptions: {
        title: 'Add Friends',
        headerTintColor: '#f50',
        headerTitleStyle: { color: 'black' }
      }
    }
  }
)

const EventsNav = createStackNavigator(
  {
    Meetups: {
      screen: EventsScreen,
      navigationOptions: {
        title: "Meetups"
      }
    }
  }
)

const MainNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNav,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          return <Ionicons name={'md-home'} size={30} color={tintColor} />
        },
        tabBarOptions: {
          activeTintColor: '#fdb954',
          inactiveTintColor: 'grey'
        }
      }
    },
    Meetups: {
      screen: EventsNav,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          return <Ionicons name={'md-calendar'} size={30} color={tintColor} />
        },
        tabBarOptions: {
          activeTintColor: '#fdb954',
          inactiveTintColor: 'grey'
        }
      }
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          return <Ionicons name={'md-person'} size={30} color={tintColor} />
        },
        tabBarOptions: {
          activeTintColor: '#fdb954',
          inactiveTintColor: 'grey'
        }
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const App = createAppContainer(createSwitchNavigator(
  {
    MainNav: MainNav
  },
  {
    initialRouteName: 'MainNav'
  }
))

export default App
