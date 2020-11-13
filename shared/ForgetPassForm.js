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
import * as yup from "yup";

const validation=yup.object({
    Email:yup.string()
        .required("required")
        .email("Not a proper Email Address")
})


const ForgetPass = ({onPress,ForgetPass}) => (
    <View style={styles.container}>
        <Formik
        initialValues={{Email:''}}
        validationSchema={validation}
        onSubmit={(values,actions)=>{
            actions.resetForm();            
            console.log(values);
            ForgetPass(values.Email);
            onPress();
        }}
        >
            {(props)=>(
                
                    <View>
                        <TextInput style={styles.input}
                        placeholder="Give your registered E-mail"
                        placeholderTextColor="#d3d3d3" 
                        selectionColor={'white'}
                        onChangeText={props.handleChange('Email')}
                        value={props.values.Email}
                        keyboardType="email-address"
                        keyboardAppearance="dark"
                        onBlur={props.handleBlur("Email")}
                        />
                        <Text style={styles.errorText}>{props.touched.Email && props.errors.Email}</Text>
                        
                        <View style={{padding:10}}>
                        <Button  title="Send E-mail" onPress={props.handleSubmit}/>     
                        </View>                       
                    </View>
                
            )}
        </Formik>
    </View>
    )
export default ForgetPass;

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
        margin:10,
        color:"#fff",        
    },
    errorText:{       
        paddingLeft:10,  
        paddingRight:10,   
        paddingTop:0,
        paddingBottom:0 ,
        margin:0 ,
        color:"red"      
             
    }
});