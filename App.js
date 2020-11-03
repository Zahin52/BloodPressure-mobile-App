import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,Button,Alert,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from "./screens/LodingScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import firebase from 'firebase';
import { firebaseConfig } from './config';
var app=firebase.initializeApp(firebaseConfig);
db = firebase.firestore(app);


export default function App() {
 
  return (   
    <AppSwitchNavigator />
    
  );
}

const AppSwitchNavigator=createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen:LoadingScreen, 
      LoginScreen:LoginScreen,
      DashboardScreen:DashboardScreen,
    }
  )
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',   
    width:"100%"
  },
  headerTitle:{
    fontSize:20,
    color:"black",
  },
  
  header:{ 
    marginTop:23,  
    marginBottom:23, 
    width:"100%",
    height:"10%",     
    backgroundColor:"#B7B5F2",          
    justifyContent:"center",
    alignItems:"center"
    
  },
  flatlist:{
    backgroundColor:"#8994e5",
    justifyContent:"center",
    textAlign:"center",
    alignItems:'center',
    margin:10,
    padding:10,    
    fontSize:20  ,
    width:"95%",
    height:120,
    borderRadius:15
    
  },
  
});
