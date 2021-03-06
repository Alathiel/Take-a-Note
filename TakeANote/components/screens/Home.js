/* eslint-disable prettier/prettier */
import React from 'react';
import {View,ScrollView,TouchableWithoutFeedback,FlatList,TouchableOpacity,ActivityIndicator,Image} from 'react-native';
import {Icon,Text,SearchBar} from 'react-native-elements';
import BackgroundTimer from 'react-native-background-timer';
import NavigationService from '../utils/NavigationService';
import styles from './Styles';
import SQLite from 'react-native-sqlite-2';
import deleteFile from '../utils/deleteFile';

const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);
var datas = [];
var selected = [];
var load = false;
var items = false;

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
        this.props.navigation.addListener('willFocus', () => {
            load = false;
            this.sync();
        });
        this.props.navigation.addListener('didFocus', () => {
            load = false;
            this.sync();
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };

    componentWillMount(){ //first load
        const timeoutId = BackgroundTimer.setTimeout(() => {this.sync();}, 200);
        const timeoutId2 = BackgroundTimer.setTimeout(() => {this.sync();}, 1000);
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

    sync(){
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
        load = true;
    }

    cancel(){
        this.setState({options:false});
        selected = selected.filter(selected => selected == null);
    }

    search(title){
        this.setState({search:title});
        var searching = title;
        if (searching != ''){
            datas = datas.filter(datas => datas.title.toUpperCase().includes(searching.toUpperCase()));
            this.forceRemount();
            this.setState({refresh:true});
        }
    }

    cleared(){
        items = false;
        if (this.state.refresh){
            this.sync();
            this.setState({refresh:false});
        }
    }

    delete(){
        selected.forEach(element => {
            db.transaction(function (txn) {
                txn.executeSql('Delete from Notes where id=' + element,[]);
            });

            var check = datas.filter(datas => datas.id == element);
            check.forEach(data => {
                if (data.title.includes('.png')){
                    deleteFile(data.content);
                }
            });
            datas = datas.filter(datas => datas.id !== element);
        });
        this.forceRemount();
        this.setState({options:false});
        selected = selected.filter(selected => selected == null);
    }

    longPress(id){
        this.setState({options:true,search:''});
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
        let flag = true;
        selected.forEach(element => {
            if (element == id){
                flag = false;
            }
        });
        if (this.state.options){
            if (!flag){
                selected = selected.filter(selected => selected != id);
                if (selected.length == 0){
                    this.setState({options:false});
                }
            }
            else {
                selected.push(id);
            }
            this.reloadSelected();
        }
        else {
            load = false;
            var check = datas.filter(datas => datas.id == id);
            if (check[0].title.includes('.png')){
                this.props.navigation.navigate('PaintNote',{id: id,edit:true,title:check[0].title,content:check[0].content});
            }
            else {
                this.props.navigation.navigate('ShowNote',{id: id});
            }
        }
    }

    onAddPress(flag){
        this.setState({options:false});
        selected = selected.filter(selected => selected == null);
        if (flag == 'add'){
            this.props.navigation.navigate('AddNote');
        }
        else {
            this.props.navigation.navigate('PaintNote');
        }
    }

    renderingOptions(){
        var length = selected.length;
        if (length == 0)
        {
            length = '';
        }

        if (this.state.options){
            return (

                <View style={styles.header_elements}>
                    <Icon name='close' type='material-community' containerStyle={{padding:10}} onPress={() => this.cancel()}/>
                    <Text key={this.state.number} style={{fontWeight:'bold',paddingTop:9,fontSize:20}}>{length}</Text>
                    <Icon name='delete' type='material-community' color='grey' containerStyle={{padding:10}} onPress={() => this.delete()}/>
                </View>
            );
        }
        else {
            return (
                <View style={{flexDirection:'row',alignSelf:'center',backgroundColor:'rgba(52, 52, 52, 0.0)',}}>
                    <SearchBar lightTheme round placeholder="Type Here..." onChangeText={(title) => this.search(title)}
                    value={this.state.search} onClear={this.cleared()} containerStyle={styles.search_input} onFocus={() => items=true} onBlur={() => items=false}/>
                    <Icon name='settings' type='material-icons' color='black' containerStyle={{paddingTop:20,paddingLeft:30}} onPress={() =>  this.props.navigation.navigate('Settings')}/>
                </View>
            );
        }
    }

    renderSelected(id){
        let flag = false;
        selected.forEach(element => {
            if (element == id){
                flag = true;
            }
        });
        if (flag){
            return (
                <View style={styles.selection_indicator}>
                    <Icon name='checkbox-blank-circle' type='material-community' color='#33cc33'/>
                </View>
            );
        }
        else {
            return (
                <View style={styles.selection_indicator}>
                    <Icon name='checkbox-blank-circle-outline' type='material-community' color='black'/>
                </View>
            );
        }
    }

    renderContent(type,content,data){
        if (!type.includes('.png')){
            return (<>
                <View style={styles.title_note}><Text style={{fontSize:25}}>{type}</Text></View>
                <View style={styles.content_note}><Text style={{fontSize:17}}>{content}</Text></View>
                <View style={styles.footer}><Text style={{color:'grey'}}>{data}</Text></View></>
            );
        }
        else {
            return (
                <>
                    <Image source={{uri:'file://' + content}} style={{resizeMode:'contain',borderRadius:10,minWidth:100,minHeight:330}}/>
                    <View style={styles.footer}><Text style={{color:'grey'}}>{data}</Text></View>
                </>
            );
        }
    }

    renderingNotes(){
        if (load){
            if (!this.state.options){
                return (
                    <FlatList data={datas} key={this.state.reload} numColumns={2} keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1}}>
                            <TouchableOpacity onPress={() => this.onPress(item.id)}
                            onLongPress={() => this.longPress(item.id)} disabled={items}>
                                <View style={{borderWidth:1,borderColor:'grey',borderRadius:10,margin:5}}>
                                    {this.renderContent(item.title,item.content,item.data)}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}/>
                );
            }
            else {
                return (
                    <FlatList data={datas} key={this.state.reload} numColumns={2} keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1}}>
                            <TouchableOpacity onPress={() => this.onPress(item.id)} disabled={items}
                            onLongPress={() => this.longPress(item.id)}>
                                <View style={{borderWidth:1,borderColor:'grey',borderRadius:10,margin:5}}>
                                    {this.renderSelected(item.id)}
                                    {this.renderContent(item.title,item.content,item.data)}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}/>
                );
            }
        }
        else {
            return (
                <View style={{justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
    }

    render() {
      return (
        <>
            <View style={styles.MainContainer}>
                <View style={styles.header_options}>
                    {this.renderingOptions()}
                </View>
                <ScrollView locked={true} style={styles.notes_container}>
                    {this.renderingNotes()}
                </ScrollView>
                <View style={styles.home_footer}>
                    <TouchableOpacity onPress={() => this.onAddPress('paint')}>
                        <Icon name="brush" type="material-community" color="grey"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fixedButton}>
                <TouchableWithoutFeedback onPress={() => this.onAddPress('add')}>
                    <Icon name="pencil" type="material-community" color="white"/>
                </TouchableWithoutFeedback>
            </View>
        </>
      );
    }
  }
