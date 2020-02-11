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
import ShowNote from '../screens/ShowNote';

const AppStack = createStackNavigator(
  {
    Home: Home,
    AddNote: AddNote,
    ShowNote: ShowNote,
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
const AppContainer = createAppContainer(AppStack);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>;
  }
}

