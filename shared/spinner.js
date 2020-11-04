import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";

const Spinner = (props) => (
    <View style={styles.container}>
               <ActivityIndicator size={80} color="#00ff00" /> 
               <View style={styles.textalign}>
                   {props.children}                  
               </View> 
                                       
    </View>
    )
export default Spinner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textalign:{
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center"
    }
});