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
    position:'relative',
    minHeight:'10%',
    maxHeight:'10%',
    minWidth:'100%',
    backgroundColor:'rgba(52, 52, 52, 0.0)',
    shadowColor: 'transparent',
    borderWidth: 0,
    shadowOpacity: 0,
    shadowRadius:0,
    top:30,
  },
  header_elements:{
    flexDirection:'row',
    paddingTop:10,
    minWidth:'100%',
  },
  search_input:{
    paddingTop:'3%',
    minWidth:'90%',
    maxHeight:'80%',
    backgroundColor:'rgba(52, 52, 52, 0.0)',
    borderTopWidth:0,
    borderBottomWidth:0,
  },
  notes_container:{
    alignSelf:'center',
    minWidth:'95%',
    maxWidth:'95%',
    minHeight:'98%',
    maxHeight:'98%',
    paddingTop:'6%',
  },
  title_note:{
    flex:0.2,
    padding:10,
  },
  content_note:{
    flex:0.8,
    padding:10,
  },
  selection_indicator:{
    alignSelf:'flex-end',
    position:'absolute',
    right:5,
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
