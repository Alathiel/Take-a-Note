/* eslint-disable prettier/prettier */
import React from 'react';
import {View,ScrollView,TouchableWithoutFeedback,FlatList,TextInput} from 'react-native';
import {Icon,Input,Text} from 'react-native-elements';
import NavigationService from '../utils/NavigationService';
import styles from './Styles';
import SQLite from 'react-native-sqlite-2';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);
var datas = [];

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options:false,
            reload:0,
            add:false,
        };
        this.props.navigation.addListener('willFocus', () => {
            this.getNotes();
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getNotes();
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Take A Note',
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

    getNotes(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Notes', [], function (tx, res) {
                var len = res.rows.length;
                var rows = [];
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    rows [i] = row;
                }
                datas = rows.filter(rows => rows.title != datas.title && rows.content != datas.content);
            });
        });
        this.forceRemount();
    }

    forceRemount = () => {
        this.setState(({ reload }) => ({
          reload: reload + 1,
        }));
    }

    renderingOptions(){
        if (this.state.options){
            return (
                <View style={styles.header_options}>

                </View>
            );
        }
    }


    renderingNotes(){
        if (!this.state.options){
            return (
                <FlatList data={datas} numColumns={2} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ProductsView',{category: item.category})}
                        onLongPress={() => this.setState({options:true})}>
                            <View>
                                <View style={styles.title_note}>{datas.title}</View>
                                <View style={styles.content_note}>{datas.content}</View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}/>
            );
        }
        else {

        }
    }

    render() {
      return (<>
        <View style={styles.MainContainer}>
            {this.renderingOptions()}
            <ScrollView key={this.state.reload} locked={true}>
                {this.renderingNotes()}
            </ScrollView>
        </View>
        <View style={styles.fixedButton}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AddNote')}>
                <Icon name="add" type="material-icons" color="white"/>
            </TouchableWithoutFeedback>
        </View></>
      );
    }
  }
