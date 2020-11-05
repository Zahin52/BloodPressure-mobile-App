import React, { Component } from "react";
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={{flex: 1, backgroundColor: '#24A0ED',padding:0}}>
                <MaterialIcons 
                    onPress={this.props.toggle}
                    name="close"
                    size={40}                 
                    style={{margin:10,color:"white",borderWidth:1,borderColor:"white",borderRadius:10,alignSelf:"stretch",textAlign:"center"}}        
                    />                      
                <Formview onPress={this.props.toggle} uploadData={this.uploadData}/>
                </View>
            </TouchableWithoutFeedback>        
            
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
    }
});