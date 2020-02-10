/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
        minHeight:'97%',
        maxHeight:'97%',
        minWidth:'97%',
        maxWidth:'97%',
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
