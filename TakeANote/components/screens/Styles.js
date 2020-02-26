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
    minHeight:'8%',
    maxHeight:'8%',
    minWidth:'100%',
    backgroundColor:'transparent',
    shadowColor: 'transparent',
    borderWidth: 0,
    shadowOpacity: 0,
    shadowRadius:0,
    flex:0.1,
  },
  header_elements:{
    flexDirection:'row',
    paddingTop:10,
    minWidth:'100%',
    backgroundColor:'transparent',
  },
  search_input:{
    paddingTop:'3%',
    minWidth:'80%',
    maxHeight:'80%',
    backgroundColor:'rgba(52, 52, 52, 0.0)',
    borderTopWidth:0,
    borderBottomWidth:0,
  },
  notes_container:{
    flex:0.9,
    alignSelf:'center',
    minWidth:'95%',
    maxWidth:'95%',
  },
  title_note:{
    flex:0.2,
    padding:10,
  },
  content_note:{
    flex:0.7,
    padding:10,
  },
  footer:{
    flex:0.1,
    flexDirection:'row-reverse',
    maxWidth:'98%',
  },
  home_footer:{
    flex:0.05,
    alignSelf:'center',
    flexDirection:'row',
    maxWidth:'98%',
    borderTopColor:'grey',
    borderTopWidth:1,
    paddingTop:10,
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
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
});
