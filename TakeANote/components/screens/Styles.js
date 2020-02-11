/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
    minHeight:'100%',
    maxHeight:'100%',
    minWidth:'100%',
    maxWidth:'100%',
    justifyContent:'center',
    alignContent:'center',
  },
  header_options: {
    maxHeight:'5%',
    minWidth:'100%',
    backgroundColor:'black',
  },
  notes:{
    backgroundColor:'transparent',
  },
  title_note:{
    flex:0.2,
  },
  content_note:{
    flex:0.8,
  },
  title_input:{
    flex:0.1,
    fontSize:35,
    minWidth:'100%',
    textAlignVertical:'top',
  },
  content_input:{
    flex:0.9,
    textAlignVertical:'top',
    minWidth:'100%',
    fontSize:25,
  },
  fixedButton: {
    position:'absolute',
    bottom: 20,
    right: 20,
    width: 46,
    height: 46,
    backgroundColor: "#42a5f5",
    borderRadius: 46,
    borderColor:'#2597f4',
    borderWidth:0.1,
    alignContent: "center",
    justifyContent: "center",
  },
});
