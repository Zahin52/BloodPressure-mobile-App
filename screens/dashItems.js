import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, Text, View,Alert,FlatList,ScrollView,TouchableOpacity,Modal} from 'react-native';
import Button from "../shared/button";
import {MaterialIcons} from "@expo/vector-icons";
import firebase from "firebase";
import Modalview from './modal';

class dashItems extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = { 
      Modaltoggle:false,
      list:[]
     };
     
     this.user = firebase.auth().currentUser;
     this.showAlert=this.showAlert.bind(this);
     this.getData=this.getData.bind(this);
  }
  componentDidMount(){
     this.getData();
  }
  componentWillUnmount() { 
    
    
   }
    
  getData=()=>{
    
    var starCountRef = firebase.database().ref('/users/' + this.user.uid);
    starCountRef.on('value', (snapshot)=> {
      var arr=[];
      Object.values(snapshot.val()).forEach(val => {
        console.log(val);
        arr.push(val)
      });
        this.setState({list:arr}) ;
        console.log(this.state.list);
       });
}
  
  showAlert=()=> {  
    this.setState({
      Modaltoggle:true
    })
    
}  
  render() {
    
    return (   
      <View style={styles.container}>
         <StatusBar backgroundColor="#B7B5F2" animated={true} style="auto" />         
         
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Android Application</Text>
        </View>     
        
        <View  style={{flex:1,width:"100%"}}>
            <FlatList   
              numColumns={1}            
              data={this.state.list}
              
              renderItem={({item}) =>  
                (
                  <View style={styles.flatlist}>
                    <Text style={{color:"white",fontSize:20}}>{item.name}</Text>
                  </View>
                )
              }
              keyExtractor={item => item.key.toString()}                
            />                
        </View>
        <Modalview 
            toggler={this.state.Modaltoggle} 
            toggle={()=> this.setState({Modaltoggle:false})}
        />
        <Button title="Add new" onPress={this.showAlert}>
            <MaterialIcons 
            name="add"
            size={40} 
            style={{color:"white",borderWidth:1,borderColor:"white",borderRadius:10,alignSelf:"center"}}        
            />
        </Button>
            
      </View>
      
    );
  }
}

export default dashItems;




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
