/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './Styles';
import SQLite from 'react-native-sqlite-2';
import NavigationService from '../utils/NavigationService';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            content:'',
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Add a Note',
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

    add(){
        var date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        if (this.state.title || this.state.content){
            let title = this.state.title;
            let content = this.state.content;
            db.transaction(function (txn) {
                txn.executeSql('INSERT INTO Notes (title,content,data) VALUES ("' + title + '","' + content + '","' + date + '")',[]);
            });
            this.props.navigation.navigate('Home');
        }
    }

    goBack(){
        NavigationService.navigate('Home');
        return true;
    }

    render() {
      return (
        <View style={styles.MainContainer}>
            <View style={{flexDirection:'column',flex:0.9,paddingTop:'3%',maxWidth:'95%',paddingBottom:'5%',alignSelf:'center'}}>
                <TextInput multiline={true} placeholder='Title' style={styles.title_input} onChangeText={(title) => this.setState({title})} value={this.state.title}/>
                <TextInput multiline={true} placeholder='Content' style={styles.content_input} onChangeText={(content) => this.setState({content})} value={this.state.content}/>
            </View>
            <View style={{flex:0.1,flexDirection:'row',maxWidth:'95%',alignSelf:'center'}}>
                <Button title='Cancel' type='clear' containerStyle={{flex:0.5,paddingRight:'2%'}} onPress={() => this.goBack()}/>
                <Button title='Add' type='clear' containerStyle={{flex:0.5,paddingLeft:'2%'}} onPress={() => this.add()}/>
            </View>
        </View>
      );
    }
  }
