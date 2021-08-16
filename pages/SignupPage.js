import React from 'react';
import { View,Text } from 'react-native';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import TextBox from '../components/TextBox';
import ToolBar from '../components/ToolBar';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
class SignupPage extends React.Component{

    constructor(props){
        super(props);
        this.state = { name:'', email:'', contact:'', password:''};
        this.login= this.login.bind(this);
        this.register= this.register.bind(this);
    }

    componentDidMount(){
        //Initialize firebase

        if(!firebase.apps.length){
            var firebaseConfig = {
                apiKey: "AIzaSyDWuLgKN5wxQzajUOmGjC1be413u37bhgg",
                authDomain: "myfb2-8e2e6.firebaseapp.com",
                databaseURL: "https://myfb2-8e2e6-default-rtdb.firebaseio.com",
                projectId: "myfb2-8e2e6",
                storageBucket: "myfb2-8e2e6.appspot.com",
                messagingSenderId: "79891003676",
                appId: "1:79891003676:android:37fbb22759d334ee53e2d9",
                measurementId: "G-8GSGZQ44ST",
              };
    
              firebase.initializeApp(firebaseConfig);
              console.log(firebase);
        }
       
    }

    render(){
        return(
            <View>
               <ToolBar title="Register Page"/>
               {/* <Logo/> */}
               <TextBox lable="Enter Name" placeholder="Nirodha Wickramarathna" name="name" value={this.state.name} onChangeText={(text) => this.setState({name: text}) }/>
               <TextBox lable="Enter Email" placeholder="nirodha@gmail.com" name="email" value={this.state.email} onChangeText={(text) => this.setState({email: text}) }/>
               <TextBox lable="Enter Mobile" placeholder="0712345678" name="contact" value={this.state.contact} onChangeText={(text) => this.setState({contact: text}) }/>
               <TextBox lable="Enter Password" placeholder="12345" name="password" value={this.state.password} onChangeText={(text) => this.setState({password: text}) }/>
               <MyButton title="SIGNUP" onPress={this.register} />
                <Text style={{textAlign:'center'}}>Do you have an account ?</Text>
                <MyButton title="LOGIN" onPress={this.login} />
            </View>
        );
    }

    login(){
        const {navigate} = this.props.navigation;
        navigate("Login");
    }

    register(){
       let name = this.state.name;
       let email = this.state.email;
       let contact = this.state.contact;
       let password = this.state.password; 
       const {navigate} = this.props.navigation;
       console.log("Register Called...."+email+" "+password);

       firebase.auth().createUserWithEmailAndPassword(email,password)
       .then(
           function(data){

            firebase.database().ref('member/'+data.user.uid).set({
                name: name,
                email: email,
                contact: contact
            });
                console.log("User Created Success !");
                alert("Register Success !");
                navigate("Login");
                
           },
           function (error){
            console.log("Error Creating User "+error);
           }
       )
    }
}

export default SignupPage;