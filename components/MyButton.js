import React from 'react';
import { Button, View,StyleSheet } from 'react-native';


class MyButton extends React.Component{
    render(){
        return(
            <View style={style.btn}>
                <Button title={this.props.title}  onPress={this.props.onPress}/>
            </View>
        );
    }

   
}


const style = StyleSheet.create({
    btn:{
        margin:10,
    }
})

export default MyButton;