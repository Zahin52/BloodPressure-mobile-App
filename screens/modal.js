import React, { Component } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "../shared/button";
import Formview from "../shared/form";
import firebase from "firebase";


class Modalview extends Component {
    constructor(props){
        super(props);
        this.user = firebase.auth().currentUser;
        this.uploadData=this.uploadData.bind(this);
    }
    uploadData=(data)=>{
        var date=new Date();
        data.key=Date.now();
        data.dateString=date.toDateString();
        data.uid=this.user.uid;                             
        firebase.database()
            .ref('/users/'+this.user.uid)
            .push(data);
        
    }
    render() {
        return (
        <Modal visible={this.props.toggler} animationType="slide">  
            <LinearGradient
            colors={["#606c88", "#3f4c6b"]}
            start={[0.1, 0.4]}
            style={styles.linearGradient}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={{flex:1,}}>
                    <MaterialIcons 
                        onPress={this.props.toggle}
                        name="close"
                        size={40}                 
                        style={{margin:10,color:"#d3d3d3",borderWidth:1,borderColor:"#d3d3d3",borderRadius:10,alignSelf:"flex-start",textAlign:"center"}}        
                        />                      
                    <Formview onPress={this.props.toggle} uploadData={this.uploadData}/>
                    </View>
                </TouchableWithoutFeedback>        
            </LinearGradient>
        </Modal>
        );
    }
}
export default Modalview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    linearGradient: {
        
        width: '100%',
        height: '100%',        
        justifyContent: 'center',
        
      },
});