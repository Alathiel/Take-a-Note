/* eslint-disable prettier/prettier */
import React from 'react';
import Navigator from './components/utils/navigator.js';
import SQLite from 'react-native-sqlite-2';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const db = SQLite.openDatabase('Notes.db', '1.0', '', 1);
    db.transaction(function (txn) {
      txn.executeSql('CREATE TABLE IF NOT EXISTS Notes(id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(30),content VARCHAR(255),data VARCHAR(255))',[]);
    });
  }
  render() {
    return (
      <Navigator/>
    );
  }
}
