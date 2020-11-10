// import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import {Animated, StyleSheet,
   Text, View,
   FlatList,
   } from 'react-native';
import Button from "../shared/button";
import Header from "../shared/header";
import {MaterialIcons} from "@expo/vector-icons";
import firebase from "firebase";
import Modalview from './modal';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

let prevOpenedRow;

class dashItems extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = { 
      checkit:"Checking...",
      Modaltoggle:false,
      list:[]
     };
     this.refsArray = []; 
     
     this.user = firebase.auth().currentUser;
     this.showAlert=this.showAlert.bind(this);
     this.getData=this.getData.bind(this);
     this.FlatListItems=this.FlatListItems.bind(this);
     this.delete=this.delete.bind(this);
    //  this.close=this.close.bind(this);
    //  this.updateRef=this.updateRef.bind(this);
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
     // console.log("snapshot",snapshot);
     
       if(snapshot.val()==null){
         console.log("im null");
       }else{
        Object.entries(snapshot.val()).forEach((val) => {
            //console.log("val  zahin",val[0],val[1]);
            var newArr=val[1];
            newArr.itemno=val[0];
            arr.push(newArr);
            console.log("new arr",newArr);
          });
        
       }        
        //this.setState({list:arr}) ;    
        
        arr=arr.reverse();
        this.setState({list:arr}) ;
        //console.log("into function",this.state.list);
       });
}
  delete = (itemno,uid) =>{
    console.log("delete clicked");
    firebase.database().ref('/users/'+uid+"/"+itemno).remove();
              
  };
 
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [7, 5],
      // extrapolate: 'clamp'
    });
    return (
      <RectButton style={styles.RightAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Deleting....
        </Animated.Text>
      </RectButton>
    );
  };  
  renderLeftActions = (progress, dragX,index) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate:"clamp"
      
    });
    return (
      <RectButton style={styles.LeftAction} onPress={()=>this.closeit(index)}>
       
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          
          {this.state.checkit}
        </Animated.Text>
      </RectButton>
    );
  };  

  checkingBp(sys,dia,index){
    
    this.close(index);
    setTimeout(() => {
    if(sys<120 && dia<80) {this.setState({checkit:"NORMAL"}); console.log("NORMAL");}
    else if(sys>=120 && sys<=129 && dia<80) {this.setState({checkit:"ELEVATED"}); console.log("ELEVATED");} 
    else if((sys>=130 && sys<=139) || (dia>=80 && dia<=89)) {this.setState({checkit:"High BP (stage 1)"}); console.log("High BP stage1");}
    else if((sys>=140 && sys<=180 ) || (dia>=90 && dia<=120)){this.setState({checkit:"High BP (stage 2)"}); console.log("High BP stage2");} 
    if((sys>180 || dia>120)) {this.setState({checkit:"Hypertensive crisis . Immediately go to doctor!"}); console.log("Hypertensive crisis,Immediately go to doctor!");}
    }, 2000);
  }
  
  close = (index) => {
    this.setState({checkit:"Checking..."});
    if (prevOpenedRow && prevOpenedRow !== this.refsArray[index]) {
      
      prevOpenedRow.close();
      this.setState({checkit:"Checking..."});
      }
      prevOpenedRow = this.refsArray[index];
    
  };
  closeit(index){
    this.setState({checkit:"Checking..."});
    this.refsArray[index].close();
  }
  

FlatListItems = () =>
  (
   
    <FlatList   
              numColumns={1}            
              data={this.state.list}
              
              renderItem={({item,index}) =>  
                (
                  
                  <Swipeable renderRightActions={this.renderRightActions}
                  ref={ref => {
              
                    this.refsArray[index] = ref; 
                   }}
                  
                  onSwipeableRightOpen={()=>this.delete(item.itemno,item.uid)}
                  renderLeftActions={(progress, dragX)=>this.renderLeftActions(progress,dragX,index)}
                  onSwipeableLeftOpen={()=>this.checkingBp(item.SYS,item.DIA,index)}
                  >
                  
                    <View style={styles.flatlist}>
                      <View style={{padding:5,borderColor:"yellow",borderBottomWidth:1,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"white",fontSize:20,}}>{item.dateString}</Text>
                      </View>
                      <View style={{flex:1,justifyContent:"space-around",alignItems:"center"}}>
                        <Text style={{color:"white",fontSize:16,textAlign:"center"}}>SYS: {item.SYS} (mmhg)</Text>
                        <Text style={{color:"white",fontSize:16,textAlign:"center"}}>DIA: {item.DIA} (mmhg)</Text>
                      </View>
                      
                    </View>
                  
                  </Swipeable>
                 
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
Noitem=()=>(

  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Text style={{fontSize:25,padding:20}}>No Item to show</Text>
  </View>
)
  render() {
    
    return (   
      <View style={styles.container}>
       
        <Header/>       
        
        <View  style={{flex:1,width:"100%",}}>
          {console.log("length:",this.state.list.length)}
              {this.state.list.length>0 ? this.FlatListItems() : this.Noitem()}
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
    backgroundColor:"#3f4c6b",
    margin:10,
    padding:0,  
    borderWidth:2,  
    fontSize:20  ,
    width:"95%",
    height:120,
    borderRadius:15
    
  },
  RightAction:{
    backgroundColor:"red",
    justifyContent:"center",
    // alignItems:"center",
    flex:1,
    margin:10,
    padding:0,  
    borderWidth:2,      
    borderRadius:15
  },
  LeftAction:{
    backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    margin:10,
    padding:0,  
    borderWidth:2,      
    borderRadius:15
  },
  actionText:{
    color:"white",
    fontSize:22,    
    padding:10,
    textAlign:"center"
  }
  
});
