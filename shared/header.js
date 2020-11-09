import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { 
    View,
    Text,
    StyleSheet,
    StatusBar,
    ImageBackground
} from "react-native";

const Header = (props) => (
    <View style={styles.header}>
        <StatusBar backgroundColor="#3f4c6b" barStyle="light-content" animated={true}/>
        <LinearGradient
            colors={["#3f4c6b", "#3f4c6b"]}
            start={[0.1,.5]}           
            style={styles.linearGradient}
            >                  
          <View >
             
            <Text style={styles.headerTitle}>Blood Pressure</Text>
          </View>  
        </LinearGradient>
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
        alignItems:"center", 
        // borderBottomLeftRadius:90,
        // borderBottomRightRadius:90       
        
        
      },
      imgBackground: {
        flex: 1,
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
        
      },
      linearGradient: {
        
        width: '100%',
        height: '100%',        
        justifyContent: 'center',
        alignItems:"center",
        // borderBottomLeftRadius:90,
        // borderBottomRightRadius:90
        
      },
});