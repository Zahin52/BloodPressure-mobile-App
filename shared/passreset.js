import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import firebase from 'firebase';
import {MaterialIcons} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import ForgetPass from "./ForgetPassForm";


class PassResetModal extends Component {
    constructor(props){
        super(props)
    }
    resetPass(email){
        firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
        alert('Please check your E-mail...')
      }).catch(function (error) {
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        Alert.alert(
            "Error",
            errorMessage,
            [              
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        // ...
      })
    }
    render() {
        // console.log(this.props);
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
                        {/* <Text  onPress={()=>console.log("hey")}>Zahin</Text>                */}
                    <ForgetPass onPress={this.props.toggle} ForgetPass={this.resetPass}/>
                    </View>
                </TouchableWithoutFeedback>        
            </LinearGradient>
        </Modal>
        );
    }
}
export default PassResetModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linearGradient: {
        
        width: '100%',
        height: '100%',        
        justifyContent: 'center',
        
      },
});