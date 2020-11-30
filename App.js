import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MovieDetailsScreen from './screens/MovieDetailsScreen'
import SearchScreen from './screens/SearchScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  return (
    <AppContainer screenProps={defaultScreenProps} />
  );
}

const MoviesTab = createStackNavigator({
  Search: SearchScreen,
  Details: MovieDetailsScreen
}, {
  initialRouteName: 'Search',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1a202c'
    }
  }
})

MoviesTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-search"
              size={25}
              color={tintColor}
              />
  ),

}

const TabNavigator = createBottomTabNavigator({
  Search: MoviesTab,
  Settings: SettingsScreen
}, {
  initialRouteName: 'Search',
  tabBarOptions: {
    activeTintColor: '#b794f4',
    inactiveTintColor: '#553c9a',
    style: {backgroundColor: '#1a202c'}
  },
})

const AppContainer = createAppContainer(TabNavigator)

const defaultScreenProps = {
  fullPlot: false,
  results: 25,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
