/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
//navigator
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './NavigationService';
//screens
import Home from '../screens/Home';
import AddNote from '../screens/AddNote';

const AppStack = createStackNavigator(
  {
    Home: Home,
    AddNote: AddNote,
  },
);

// const LoginStack = createStackNavigator(
//     {
//         Home: LoginHome,
//         Login: Login,
//         SignIn: SignIn,
//     },
//     {
//       initialRouteName: 'Home',
//       headerMode: 'none',
//     },
//   );

//create external navigator
const AppContainer = createAppContainer(
  createStackNavigator(
    {
        AppStack:AppStack,
    },
    {
      initialRouteName:'AppStack',
      headerMode: 'none',
    },
  ),
);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>;
  }
}

