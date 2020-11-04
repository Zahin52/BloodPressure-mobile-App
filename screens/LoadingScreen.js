import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
    Alert
} from "react-native";
import firebase from "firebase";
import Spinner from "../shared/spinner"


class LoadingScreen extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.checkIfLoggedIn();
    }
    checkIfLoggedIn=()=>{
        
        firebase.auth().onAuthStateChanged((user)=>{            
            if(user){ 
                this.props.navigation.navigate("DashboardScreen");
                // setTimeout(()=>{
                    
                // },3000)
            }
            else{ 
                this.props.navigation.navigate("LoadingScreen");
                setTimeout(()=>{
                    this.props.navigation.navigate("LoginScreen");
                },3000)
                
            }
        })
    }
    render() {
        return (
            <Spinner>
                <Text>Signing out</Text> 
                <Text>Wait for a while.....</Text> 
            </Spinner>
        );
    }
}
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});