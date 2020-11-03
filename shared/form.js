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


const Formview = ({uploadData}) => (
    <View style={styles.container}>
        <Formik
        initialValues={{name:''}}
        onSubmit={(values,actions)=>{
            actions.resetForm();            
            uploadData(values);
            console.log(values);
        }}
        >
            {(props)=>(
                
                    <View>
                        <TextInput style={styles.input}
                        placeholder="give your meassures BP"
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
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