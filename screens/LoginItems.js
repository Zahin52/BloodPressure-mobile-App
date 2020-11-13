import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    } from "react-native";
import {Container,Content,Header,Button,Form,Input,Item,Label,Icon} from "native-base";
import { AntDesign,Zocial ,Entypo} from '@expo/vector-icons';
class Emaillogin extends Component {
    constructor(props){
        super(props);
         this.state={
            Email:"",
            Password:""
         }
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <Form >
                    <Item style={{margin:10,padding:10,borderColor:"green"}} floatingLabel>
                        <Label>
                            <View style={{paddingRight:10}}>
                                <Zocial  name="email" size={15} color="black" />
                            </View>                            
                            <Text >
                                Email
                            </Text>
                        
                        </Label>
                        <Input 
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(Email)=>this.setState({Email})}
                        >
                        </Input>
                    </Item>
                    <Item style={{margin:10,padding:10,borderColor:"green"}} floatingLabel>
                        <Label>
                            <View style={{paddingRight:10}}>
                                <Entypo name="key" size={15} color="black" />
                            </View>                           
                            <Text >
                                Password
                            </Text>
                        </Label>
                        <Input 
                        // secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(Password)=>this.setState({Password})}
                        >
                        </Input>
                    </Item>
                    <Button style={{marginTop:15}}
                    full
                    rounded
                    success
                    onPress={()=>this.props.Loginuser(this.state.Email,this.state.Password)}
                    >
                        <Text style={{color:"white",fontWeight:"bold"}}>
                            Login
                        </Text>
                    </Button>
                    <Button style={{marginTop:15}}
                    full
                    rounded
                    warning
                    onPress={()=>this.props.Signinuser(this.state.Email,this.state.Password)}
                    >
                        <Text style={{color:"white",fontWeight:"bold"}}>
                            SignUp
                        </Text>
                    </Button>
                    <Text onPress={this.props.resetPassModal} style={{color:"#0275d8",textAlign:"center",marginTop:5}}>Forgotten password?</Text>
                    <Text style={{textAlign:"center",fontWeight:"bold",margin:30}}>OR</Text>
                    <Button style={{marginTop:10}}
                    full
                    rounded
                    info                   
                    onPress={this.props.GoogleLogin}
                    >
                        <AntDesign name="google" size={25} color="white" />
                        <Text style={{color:"white",fontWeight:"bold",marginLeft:12}}>
                            Signin with Google
                        </Text>
                        
                    </Button>
                </Form>

            </Container>
        );
    }
}
export default Emaillogin;

const styles = StyleSheet.create({
    container: {      
        flex:1,
        padding:15,       
        justifyContent: 'center',
        width: "100%",
    }
});