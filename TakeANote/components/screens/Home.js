/* eslint-disable prettier/prettier */
import React from 'react';
import {View,ScrollView,TouchableWithoutFeedback,FlatList,TouchableOpacity,BackHandler} from 'react-native';
import {Icon,Text} from 'react-native-elements';
import BackgroundTimer from 'react-native-background-timer';
import NavigationService from '../utils/NavigationService';
import styles from './Styles';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);
var datas = [];
var selected = [];



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options:false,
            reload:0,
            id:'',
            number:0,
        };
        this.props.navigation.addListener('willFocus', () => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            this.getNotes();
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getNotes();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };

    componentWillMount(){ //first load
        const timeoutId = BackgroundTimer.setTimeout(() => {this.getNotes();}, 200);
        const timeoutId2 = BackgroundTimer.setTimeout(() => {this.getNotes();}, 1000);
    }

    handleBackButton(){
        BackHandler.exitApp();
        return true;
    }

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

    reloadSelected = () => {
        this.setState(({ number }) => ({
            number: number + 1,
        }));
    }

    delete(){
        selected.forEach(element => {
            db.transaction(function (txn) {
                txn.executeSql('Delete from Notes where id=' + element,[]);
            });
            datas = datas.filter(datas => datas.id !== element);
        });
        this.getNotes();
        selected = selected.filter(selected => selected == null);
    }

    renderingOptions(){
        var length = selected.length;
        if (length == 0)
        {
            length = '';
        }

        if (this.state.options){
            return (
                <View style={styles.header_options}>
                    <View style={{alignSelf:'flex-end',flexDirection:'row'}}>
                        <Text key={this.state.number}>{length}</Text>
                        <Icon name='delete' type='material-community' onPress={()=> this.delete()} containerStyle={{padding:10}}/>
                    </View>
                </View>
            );
        }
    }

    longPress(id){
        this.setState({options:true});
        var flag = true;
        selected.forEach(element => {
            if (element == id){
                flag = false;
            }
        });
        if (flag){
            selected.push(id);
            this.reloadSelected();
        }
    }

    onPress(id){
        var flag = true;
        selected.forEach(element => {
            if (element == id){
                flag = false;
            }
        });
        if (this.state.options && !flag){
            selected = selected.filter(selected => selected != id);
            if(selected.length == 0){
                this.setState({options:false});
            }
            this.reloadSelected();
        }
        else {
            this.setState({options:false});
            selected.splice(0);
            this.props.navigation.navigate('ShowNote',{id: id});
        }
    }

    renderingNotes(){
        return (
            <FlatList data={datas} numColumns={2} keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                    <TouchableOpacity onPress={() => this.onPress(item.id)}
                    onLongPress={() => this.longPress(item.id)}>
                        <View style={{borderWidth:1,borderColor:'grey',borderRadius:10,margin:5}}>
                            <View style={styles.title_note}><Text style={{fontSize:25}}>{item.title}</Text></View>
                            <View style={styles.content_note}><Text style={{fontSize:17}}>{item.content}</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}/>
        );
    }

    render() {
      return (<>
        <View style={styles.MainContainerHome}>
            {this.renderingOptions()}
            <ScrollView key={this.state.reload} locked={true} style={styles.notes_container}>
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
