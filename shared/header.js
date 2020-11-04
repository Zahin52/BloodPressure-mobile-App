import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    StatusBar
} from "react-native";

const Header = (props) => (
    <View style={styles.header}>
        <StatusBar backgroundColor="#B7B5F2" animated={true} style="auto" />         
        <View >
          <Text style={styles.headerTitle}>Android Application</Text>
        </View>  
    </View>
    )
export default Header;

const styles = StyleSheet.create({
    
    headerTitle:{
        fontSize:20,
        color:"white",
      },
      
      header:{                   
        width:"100%",
        height:"15%",             
        backgroundColor:"#B7B5F2",          
        justifyContent:"center",
        alignItems:"center"
        
      },
});