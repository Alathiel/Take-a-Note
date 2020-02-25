/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import styles from './Styles';
import SQLite from 'react-native-sqlite-2';
import NavigationService from '../utils/NavigationService';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);
var filename;

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            content:'',
        };
        this.props.navigation.addListener('didFocus', () => {
            filename = String(Math.ceil(Math.random() * 100000000));
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Paint a Note',
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

    add(path){
        var date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes();

        db.transaction(function (txn) {
            txn.executeSql('INSERT INTO Notes (title,content,data) VALUES ("image","' + path + '","' + date + '")',[]);
        });
        this.props.navigation.navigate('Home');
    }

    goBack(){
        NavigationService.navigate('Home');
        return true;
    }

    render() {
      return (
        <View style={styles.MainContainer}>
            <RNSketchCanvas containerStyle={{ backgroundColor: 'transparent', flex: 1 }} canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            defaultStrokeIndex={0} defaultStrokeWidth={5} onSketchSaved={(success,filepath) => this.add(filepath)}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeSelectedComponent={(color, index, changed) => {
                return (
                    <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                );
            }}
            strokeWidthComponent={(w) => {
                return (
                    <View style={styles.strokeWidthButton}>
                        <View  style={{backgroundColor: 'white', marginHorizontal: 2.5, width: Math.sqrt(w / 3) * 10,height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2}} />
                    </View>
                );}
            }
            saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
            savePreference={() => {
                return {
                    folder: 'RNSketchCanvas',
                    filename: filename,
                    transparent: false,
                    imageType: 'png',
                };
            }}
          />
        </View>
      );
    }
  }
