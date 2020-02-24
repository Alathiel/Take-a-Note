/* eslint-disable prettier/prettier */
import React from 'react';
import {View,ScrollView,TouchableWithoutFeedback,FlatList,TouchableOpacity, ActivityIndicator} from 'react-native';
import {Icon,Text,SearchBar} from 'react-native-elements';
import BackgroundTimer from 'react-native-background-timer';
import NavigationService from '../utils/NavigationService';
import styles from './Styles';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options:false,
            reload:0,
            id:'',
            number:0,
            search:'',
            refresh:false,
        };
        this.props.navigation.addListener('willFocus', () => {});
        this.props.navigation.addListener('didFocus', () => {});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Settings',
            // headerRight: ()=>(
            //     {}
            // ),
            headerStyle: {
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
                shadowColor: 'transparent',
                borderBottomWidth: 0,
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                    width: 0,
                },
                shadowRadius: 0,
                elevation: 0,
            },
        };
    };

    componentWillMount(){ //first load
        // const timeoutId = BackgroundTimer.setTimeout(() => {this.getNotes();}, 200);
        // const timeoutId2 = BackgroundTimer.setTimeout(() => {this.getNotes();}, 1000);
    }

    render() {
      return (
        <>
            <View style={styles.MainContainer}>

            </View>
        </>
      );
    }
  }
