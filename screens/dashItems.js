import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, Text, View,Alert,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import Button from "../shared/button";
import firebase from "firebase";
// import {userId} from './LoginScreen';
class dashItems extends Component {
  
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = { 
      list:[]
     };
     this.user = firebase.auth().currentUser;
     this.showAlert=this.showAlert.bind(this);
  }
  componentDidMount(){
    this._isMounted = true;
    if(this._isMounted) this.getData();
  }
  componentWillUnmount() { 
    this._isMounted = false;
    this.getData();
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
    Alert.alert(  
        'Alert Title',  
        "userId",  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'+ this.user.uid),  
                style: 'cancel',  
            },  
            {text: 'OK', onPress: () => {
            
            firebase.database()
            .ref('/users/'+this.user.uid)
            .push({
              name:"blue",
              key:Date.now()
            })
            
          } },  
        ]  
    );  
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
        <Button title="Add Data" onPress={this.showAlert}/>
            
      </View>
      
    );
  }
}

export default dashItems;



// export default function Dash() {
  
//   const [item,setItem]=useState();
//   const  [list,setlist]=useState();
//   var user = firebase.auth().currentUser;
 


//   const setItemlist=()=>{
//     var starCountRef = firebase.database().ref('/users/' + user.uid);
//     starCountRef.on('value', (snapshot)=> {
//     setlist(snapshot.val()) ;
//     console.log(list);

//   });
    
//   }
//   if (user) {
//     // User is signed in.
    
//     setItemlist();
    
//   } else {
//     // No user is signed in.
//   }
//     const showAlert=()=> {  
//       Alert.alert(  
//           'Alert Title',  
//           "userId",  
//           [  
//               {  
//                   text: 'Cancel',  
//                   onPress: () => console.log('Cancel Pressed'+ user.uid),  
//                   style: 'cancel',  
//               },  
//               {text: 'OK', onPress: () => {
//               setItem({
//                 name:"janu",
//                 key:"two"
//               });
//               firebase.database()
//               .ref('/users/'+user.uid)
//               .push(item)
            
//             } },  
//           ]  
//       );  
//   }  
//   return (   
//     <View style={styles.container}>
//        <StatusBar backgroundColor="#B7B5F2" animated={true} style="auto" />
       
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Android Application</Text>
//       </View>     
     
//       <View  style={{flex:1,width:"100%"}}>
//           <FlatList   
//             numColumns={1}            
//             data={list}
//             renderItem={({item}) =>  
//               (
//                 <View style={styles.flatlist}>
//                   <Text style={{color:"white",fontSize:20}}>{item.name}</Text>
//                 </View>
//               )
//             }                  
//           />                
//       </View>
//       <Button title="Show Alert" onPress={showAlert}/>
          
//     </View>
    
//   );
// }

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
