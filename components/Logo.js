import React from 'react';
import { View,Image,StyleSheet } from 'react-native';

class Logo extends React.Component{
    render(){
        return(
            <View>
                <Image source={ require('../assests/logo.png')} style={style.image}  />
            </View>
        )
    }
}

const style = StyleSheet.create({
    image:{
        height:80,
        width:'80%',
        marginLeft:35,
        marginBottom:20,
        marginTop:10,

    }
});

export default Logo;