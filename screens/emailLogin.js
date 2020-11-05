import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    } from "react-native";
import {Container,Content,Header,Button,Form,Input,Item,Label,Icon} from "native-base";
import { AntDesign,Zocial ,Entypo} from '@expo/vector-icons';
class Emaillogin extends Component {
    render() {
        return (
            <Container style={{...styles.container}}>
                <Form>
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
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        >
                        </Input>
                    </Item>
                    <Button style={{marginTop:15}}
                    full
                    rounded
                    success
                    
                    >
                        <Text style={{color:"white",fontWeight:"bold"}}>
                            Login
                        </Text>
                    </Button>
                    <Button style={{marginTop:15}}
                    full
                    rounded
                    warning
                    
                    >
                        <Text style={{color:"white",fontWeight:"bold"}}>
                            SignUp
                        </Text>
                    </Button>
                    <Text style={{textAlign:"center",fontWeight:"bold",margin:30}}>OR</Text>
                    <Button style={{marginTop:10}}
                    full
                    rounded
                    info
                    iconLeft
                    onPress={this.props.onPress}
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
        padding:10,
        justifyContent: 'center'
    }
});