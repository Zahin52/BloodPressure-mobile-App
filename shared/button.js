import React, { Component } from "react";

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

class Custombutton extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
        <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:"#24A0ED",height: 50, marginTop: 10 ,justifyContent:"center",alignItems:"center"}}>
            {this.props.title.length>0?<Text style={{fontSize:18,color:"white"}}>{this.props.title}</Text>:this.props.children}
            
        </TouchableOpacity>
        );
    }
}
export default Custombutton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});