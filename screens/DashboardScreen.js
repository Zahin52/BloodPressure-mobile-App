import React, { Component } from "react";
import firebase from "firebase"
import { 
  View,
  Text,
  StyleSheet,
  
  TouchableOpacity
} from "react-native";
import Button from "../shared/button";
import Dash from './dashItems';

class DashboardScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Dash />
        <Button title="Sign Out" onPress={()=> firebase.auth().signOut()}  /> 
      </View>
    );
  }
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1    
  }
});