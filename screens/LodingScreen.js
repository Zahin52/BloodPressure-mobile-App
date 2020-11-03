import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
    Alert
} from "react-native";
import * as firebase from "firebase";


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
            }
            else{
                this.props.navigation.navigate("LoginScreen");
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
               <ActivityIndicator size="large" color="#00ff00" />  
                <Text > LoadinScreen</Text>          
                                      
            </View>
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