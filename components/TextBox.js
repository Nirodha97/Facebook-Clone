import React from 'react';
import { TextInput, View,Text,StyleSheet, StatusBar } from 'react-native';

class TextBox extends React.Component{
    render(){
        return(
            <View style={style.textbox}>
            <Text>{this.props.lable}</Text>
            <TextInput placeholder={this.props.placeholder} name={this.props.name} value={this.props.value} onChangeText={this.props.onChangeText}/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textbox:{
        padding:5,
       borderWidth:1,
       borderRadius:5,
       borderColor:'#728FCE',
       margin:5,
    }
})

export default TextBox;