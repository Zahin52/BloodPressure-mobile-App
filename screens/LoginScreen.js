import React, { Component } from "react";
import * as Google from 'expo-google-app-auth';
import firebase from "firebase";
import Spinner from "../shared/spinner";
import Header from "../shared/header";
import Emaillogin from "./emailLogin";

import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar
} from "react-native";
import Button from "../shared/button";

// export let userId="";

 


class LoginScreen extends Component {
    constructor(props){
      super(props)
      this.state={
        isLoading:false
      }
      this.onSignIn=this.onSignIn.bind(this);
      this.isUserEqual=this.isUserEqual.bind(this);
      this.signInWithGoogleAsync=this.signInWithGoogleAsync.bind(this);
      this.Mainitem=this.Mainitem.bind(this);
    }    
    Mainitem = () => 
    (         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Emaillogin  onPress={() => this.signInWithGoogleAsync() }/>                    
                    {/* <Button title="Login with google" onPress={() => this.signInWithGoogleAsync() }/>                */}
                </View>
              </TouchableWithoutFeedback>
    );

    
    isUserEqual=(googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              userId=googleUser.getBasicProfile().getId();
              return true;
            }
          }
        }
        return false;
      };

    onSignIn=(googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then((result)=>{
                
                console.log("user signed in"," ",result);
                if(result.additionalUserInfo.isNewUser){
                    
                        firebase.database()
                        .ref('/users/'+result.user.uid);
               
                        
                }else{
                    console.log("please sign in okay?");
                   
                    console.log("please sign in okay?");
                }
                
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      };


     signInWithGoogleAsync = async ()=> {
        try {
          this.setState({
            isLoading:true
          })
          const result = await Google.logInAsync({
            
            androidClientId: '19505452059-294pbr8k70nk2ldh1v8870afeafb6nms.apps.googleusercontent.com',
            
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    render() {
        return (
            <View style={{flex:1}}>
                <Header/>   
                {console.log(this.state.isLoading)}
                {this.state.isLoading ? <Spinner><Text>Signing in . . . . .</Text></Spinner>:this.Mainitem()}                
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        padding:15,
        backgroundColor:"#fff"
        
    },
    
});