import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
   
} from "react-native";
import { Formik } from 'formik';
import * as yup from "yup";

const validation=yup.object({
    SYS:yup.string()
        .required("required")
        .matches(/^\d+$/,"Only Number allowed")
        .test("is num","Number must be >30 and <250",(val)=>{
            return  parseInt(val)>30 && parseInt(val)<300;
        }),
    DIA:yup.string()
        .required("Required")
        .matches(/^\d+$/,"Only Number allowed")
        .test("is num","Number must be >30 and < 250",(val)=>{
            return  parseInt(val)>30 && parseInt(val)<300;
        }),
})


const Formview = ({uploadData,onPress}) => (
    <View style={styles.container}>
        <Formik
        initialValues={{SYS:'',DIA:''}}
        validationSchema={validation}
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
                        placeholder="Give your Sys BP"
                        placeholderTextColor="#d3d3d3" 
                        selectionColor={'white'}
                        onChangeText={props.handleChange('SYS')}
                        value={props.values.SYS}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        onBlur={props.handleBlur("SYS")}
                        />
                        <Text style={styles.errorText}>{props.touched.SYS && props.errors.SYS}</Text>
                        <TextInput style={styles.input}
                        placeholder="Give your DIA BP"
                        placeholderTextColor="#d3d3d3" 
                        selectionColor={'white'}
                        onChangeText={props.handleChange('DIA')}
                        value={props.values.DIA}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        onBlur={props.handleBlur("DIA")}
                        />
                        <Text style={styles.errorText}>{props.touched.DIA && props.errors.DIA}</Text>
                        <View style={{padding:10}}>
                        <Button  title="Submit" onPress={props.handleSubmit}/>     
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