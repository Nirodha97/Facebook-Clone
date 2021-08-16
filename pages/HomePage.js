import React from 'react';
import { View,Text,StyleSheet,Image, Button } from 'react-native';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import ToolBar from '../components/ToolBar';


class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.login= this.login.bind(this);
        this.register= this.register.bind(this);
    }
    render(){
        return(
            <View>
               <ToolBar title="HomePage"/>
               <Logo/>
               <Text style={style.welcome}>Welcome to Facebook</Text>
              <MyButton title="REGISTER" onPress={this.register}/>
              <MyButton title="LOGIN" onPress={this.login}/>
            </View>
        );
    }

    login(){
        const {navigate} = this.props.navigation;
        navigate("Login");
    }

    register(){
        const {navigate} =this.props.navigation;
        navigate("Register");
    }
    
}

const style = StyleSheet.create({

    welcome:{
        padding:10,
        fontSize:20,
        textAlign:'center'
    }
});
export default HomePage;