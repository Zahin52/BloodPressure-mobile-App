import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, Text, View,Alert,FlatList,ScrollView,TouchableOpacity,Modal} from 'react-native';
import Button from "../shared/button";
import Header from "../shared/header";
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
     this.FlatListItems=this.FlatListItems.bind(this);
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
      console.log("snapshot",snapshot);
      
       if(snapshot.val()==null){
         console.log("im null");
       }else{
        Object.values(snapshot.val()).forEach(val => {
          console.log(val);
          arr.push(val)
        });
       }
        
        //this.setState({list:arr}) ;
      
        
      
        this.setState({list:arr}) ;
        console.log("into function",this.state.list);
       });
}

FlatListItems = () =>
  (
    <FlatList   
              numColumns={1}            
              data={this.state.list}
              
              renderItem={({item}) =>  
                (
                  <View style={styles.flatlist}>
                    <View style={{padding:5,borderColor:"yellow",borderBottomWidth:1,justifyContent:"center",alignItems:"center"}}>
                      <Text style={{color:"white",fontSize:20,}}>{item.dateString}</Text>
                    </View>
                    <View style={{flex:1,justifyContent:"center"}}>
                      <Text style={{color:"white",fontSize:20,textAlign:"center"}}>{item.name}</Text>
                    </View>
                    
                  </View>
                )
              }
              keyExtractor={item => item.key.toString()}                
            /> 
  );

  
  showAlert=()=> {  
    this.setState({
      Modaltoggle:true
    })
    
}  
  render() {
    
    return (   
      <View style={styles.container}>
       
        <Header/>       
        
        <View  style={{flex:1,width:"100%",}}>
          {console.log("length:",this.state.list.length)}
              {this.state.list.length>0 ? this.FlatListItems() : <Text>No Item to show</Text>}
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
  flatlist:{
    backgroundColor:"#8994e5",
    margin:10,
    padding:0,  
    borderWidth:2,  
    fontSize:20  ,
    width:"95%",
    height:120,
    borderRadius:15
    
  },
  
});
