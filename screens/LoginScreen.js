import React, { Component } from "react";
import * as Google from 'expo-google-app-auth';
import firebase from "firebase";
import Spinner from "../shared/spinner";
import Header from "../shared/header";
import Emaillogin from "./LoginItems";
import PassResetModal from "../shared/passreset";

import { 
    View,
    Text,
    StyleSheet,    
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    Alert
} from "react-native"; 


class LoginScreen extends Component {
    constructor(props){
      super(props)
      this.state={
        isLoading:false,
        resetModal:false        
      }
      this.onSignIn=this.onSignIn.bind(this);
      this.isUserEqual=this.isUserEqual.bind(this);
      this.signInWithGoogleAsync=this.signInWithGoogleAsync.bind(this);
      this.Mainitem=this.Mainitem.bind(this);
      this.resetPassModal=this.resetPassModal.bind(this);
    }    
    Mainitem = () => 
    (         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Emaillogin resetPassModal={()=> this.resetPassModal()} Loginuser={this.Loginuser} Signinuser={this.Signinuser} GoogleLogin={() => this.signInWithGoogleAsync() }/>                    
                    {/* <Button title="Login with google" onPress={() => this.signInWithGoogleAsync() }/>                */}
                </View>
              </TouchableWithoutFeedback>
    );
    resetPassModal=()=>{
      this.setState({resetModal:true});
    }

    Loginuser(email,password){
      console.log("Email:"+email+" pass:"+password);
      
      try {
          firebase.auth().signInWithEmailAndPassword(email,password).then(user=>{
              console.log("logged in"+user);
          }               
          ).catch(function(error) {
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
            });
      } catch (error) {
        alert(error);
          console.log(error.toString());
      }
  }
  Signinuser(email,password){
     console.log("Email:"+email+" pass:"+password);
     try {
         if(password.length<6){
             alert("Please enter at least 6 character");
             return;
         }
         firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
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
        });
     } catch (error) {
      alert(error);
         console.log(error.toString());
     }
  }

    
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
              Alert.alert(
                "Error",
                errorMessage,
                [              
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
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
            behavior:'web',
            androidClientId: '19505452059-qaukho3c979johls2lmhv0ecf691eq49.apps.googleusercontent.com',
            androidStandaloneAppClientId:"19505452059-qaukho3c979johls2lmhv0ecf691eq49.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
            return result.accessToken;
          } else {
            this.setState({
              isLoading:false
            })
            return { cancelled: true };
          }
        } catch (e) {
          Alert.alert(
            "Error",
            e,
            [              
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
          return { error: true };
        }
      }
    render() {
        return (
            <View style={{flex:1}}>
                <Header/>
                <PassResetModal toggler={this.state.resetModal} toggle={()=>this.setState({resetModal:false})} />
                <ImageBackground source={require('../assets/bloodpressure.png')} style={styles.imgBackground}>
                    {/* {console.log(this.state.isLoading)} */}
                    {this.state.isLoading ? <Spinner><Text>Signing in . . . . .</Text></Spinner>:this.Mainitem()}  
                </ImageBackground>   
                                
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",      
        
        opacity:.8
        
    },
    imgBackground: {
      flex: 1,
      width: "100%",
     
    },
    
});