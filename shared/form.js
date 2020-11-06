import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,    
    TextInput,
    Button,
   
} from "react-native";
import { Formik } from 'formik';


const Formview = ({uploadData,onPress}) => (
    <View style={styles.container}>
        <Formik
        initialValues={{SYS:'',DIA:''}}
        onSubmit={(values,actions)=>{
            actions.resetForm();            
            uploadData(values);
            console.log(values);
            onPress();
        }}
        >
            {(props)=>(
                
                    <View>
                        <TextInput style={styles.input}
                        placeholder="give your Sys BP"
                        onChangeText={props.handleChange('SYS')}
                        value={props.values.SYS}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        />
                        <TextInput style={styles.input}
                        placeholder="give your DIA "
                        onChangeText={props.handleChange('DIA')}
                        value={props.values.DIA}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        />
                        <View style={{padding:10}}>
                        <Button  title="submit" onPress={props.handleSubmit}/>     
                        </View>                       
                    </View>
                
            )}
        </Formik>
    </View>
    )
export default Formview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        justifyContent: 'center'
    },
    input:{
        borderWidth:2,
        borderColor:"white",
        borderRadius:6,
        padding:10,
        margin:10
    }
});