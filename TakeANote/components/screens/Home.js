/* eslint-disable prettier/prettier */
import React from 'react';
import {View,ScrollView,TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './Styles';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Home',
            headerLeft: ()=>(
                    <Icon name='home' type='material-icons' color='black' onPress={() => NavigationService.navigate('AdminHome')} containerStyle={{paddingLeft: 10, paddingTop:2}}/>
            ),
            headerRight: ()=>(
                    <Icon name='settings' type='material-icons' color='black' onPress={() => NavigationService.navigate('Settings')} containerStyle={{paddingRight: 10, paddingTop:2}}/>
            ),
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

    render() {
      return (<>
        <View style={styles.MainContainer}>
            <ScrollView>

            </ScrollView>
        </View>
        <View style={styles.fixedButton}>
            <TouchableWithoutFeedback onPress={() => this.setState({ add: true, name:'', category:'', icon_name:'Pick an Image'})}>
                <Icon name="add" type="material-icons" color="white"/>
            </TouchableWithoutFeedback>
        </View></>
      );
    }
  }
