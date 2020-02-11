/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TextInput,BackHandler} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import styles from './Styles';
import NavigationService from '../utils/NavigationService';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);
var datas = [];
var id;

export default class ShowNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload:0,
            id: this.props.navigation.getParam('id'),
            title:'',
            content:'',
        };
        this.props.navigation.addListener('willFocus', () => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            this.getNote();
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getNote();
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Your Note',
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

    componentWillMount(){
        const timeoutId = BackgroundTimer.setTimeout(() => {this.getNote();}, 200);
    }

    componentDidMount(){
        const timeoutId = BackgroundTimer.setTimeout(() => {this.getNote();}, 200);
    }

    handleBackButton(){
        db.transaction(function (txn) {
            txn.executeSql('UPDATE Notes SET title="' + datas.title + '" , content="' + datas.content + '" WHERE id=' + id,[]);
        });
        NavigationService.navigate('Home');
        return true;
    }

    forceRemount = () => {
        this.setState(({ reload }) => ({
          reload: reload + 1,
        }));
    }

    getNote(){
        id = this.state.id;
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Notes WHERE id=' + id, [], function (tx, res) {
                var row = res.rows.item(0);
                datas = row;
            });
        });
        this.setState({title:datas.title,content:datas.content});
        this.forceRemount();
    }

    render() {
      return (
        <View style={styles.MainContainer} key={this.state.reload}>
            <View style={{flexDirection:'column',flex:0.9,paddingTop:'3%',maxWidth:'95%',paddingBottom:'5%',alignSelf:'center'}}>
                <TextInput placeholder='Title' style={styles.title_input} onChangeText={(title) => this.setState({title})} value={this.state.title}/>
                <TextInput placeholder='Content' style={styles.content_input} onChangeText={(content) => this.setState({content})} value={this.state.content}/>
            </View>
        </View>
      );
    }
  }
