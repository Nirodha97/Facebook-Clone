import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


class ToolBar extends React.Component{
    render(){
        return(
            <View>
                <Text style={style.bar}>{this.props.title}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    bar:{
        backgroundColor:'#4267B2',
        padding:10,
        color:'white',
        textAlign:'center'
    }
});

export default ToolBar;