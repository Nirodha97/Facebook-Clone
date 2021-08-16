import React from 'react';
import { View,Text, TextInput } from 'react-native';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import TextBox from '../components/TextBox';
import ToolBar from '../components/ToolBar';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class LoginPage extends React.Component{

    constructor(props){
        super(props);
       this.state = { email:'', password:''};
        this.login= this.login.bind(this);
        this.register= this.register.bind(this);
    }

    

    render(){
        return(
            <View>
                <ToolBar title="Login Page"/>
                <Logo/>
                <TextBox lable="Enter Email" placeholder="nirodha@gmail.com" name="email" value={this.state.email} onChangeText={(text) => this.setState({email: text}) }/>
                <TextBox lable="Enter Password" placeholder="12345" name="password" value={this.state.password} onChangeText={(text) => this.setState({password: text}) } />
                <MyButton title="LOGIN" onPress={this.login}/>
                <Text style={{textAlign:'center'}}>Don't you have an account ?</Text>
                <MyButton title="SIGNUP" onPress={this.register}/>
            </View>
        );
    }



    login(){
        let email = this.state.email;
        let password = this.state.password;
        const {navigate} = this.props.navigation;

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            function(data){
                navigate("Home" , {uid: data.user.uid});
            },
            function(error){
                var errorMessage = error.message;
                alert(errorMessage.toString());
            }
        );
    }

    register(){
        const {navigate} = this.props.navigation;
        navigate("Register");
    }
}

export default LoginPage;