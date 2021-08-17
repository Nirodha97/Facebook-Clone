import React from 'react';
import { View,Text,StyleSheet,Image, Button, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import ToolBar from '../components/ToolBar';
import "firebase/database";
import TextBox from '../components/TextBox';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import * as ImagePicker from "react-native-image-picker";
class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {text:'', mid: '', posts:[], url:'', photo: null }; 
        this.post=this.post.bind(this);
        this.login= this.login.bind(this);
        this.register= this.register.bind(this);
    }

    componentDidMount(){
        let user = firebase.auth().currentUser;
        this.state.mid= user.uid;

        var ref = firebase.database().ref('posts');
        ref.on('value', (data)=> {
            post_array = [];
            var objects = data.toJSON();
            for(const pid in objects){
                var obj = objects[pid];
                var mid = obj.mid;
                var refM = firebase.database().ref('member/'+mid);
                refM.on('value', (data)=> {
                    var object = objects[pid];
                    var text = object.post;

                    post_array.push({
                        id: pid,
                        mid: mid,
                        post: text,
                        photo: object.photo,
                        likes: object.likes,
                        name: data.toJSON().name
                    });

                    this.setState({
                        posts: post_array
                    });
                });

            }
        });
    }

    render(){
        console.log(this.state.posts);
        const {photo} = this.state;
        return(
            <View>
               
               {/* <Logo/> */}
               <ScrollView scrollEnabled={true} >
                <TextBox onChangeText={(text) => this.setState({text: text})} Value={this.state.text} lable="Write a Post" placeholder="Whats on Your Mind"></TextBox>
                <Button title="Choose a Photo" onPress={this.handlePhoto}/>


             
                { photo && (
                    <Image  source={{uri: photo.uri}} style ={{width:100, height:100}}/>
                )}

                <Button title="POST" onPress={this.post}/>
                
                <FlatList
                        data={this.state.posts}
                        renderItem={
                            ({item, index})=>{
                                let image = (item.photo)?{uri: item.photo} : require('../assests/default.jpg');
                                return(
                                    <View style={style.postbox}>
                                        <View style={style.post_header}>
                                            <Image source={ require('../assests/profile.png')} style={style.profile_photo}/>
                                            <Text style={style.profile_name}>{item.name}</Text>
                                        </View>

                                        <Text style={style.post_text}>{item.post}</Text>
                                        <Image  source={ image} style={style.post_image}/>

                                        <View style={style.like_bar}>
                                            <Text>{item.likes} Likes</Text>
                                        </View>

                                        <View style={style.button_bar}> 
                                            <TouchableOpacity style={style.button} 
                                            onPress={()=>{
                                                var ref = firebase.database().ref('posts/'+item.id+"/likes");
                                                ref.transaction(function(likeCount){
                                                    return (likeCount || 0)+1;
                                                });
                                            }}
                                            >
                                                <Image  source={ require('../assests/like.png')} style={style.button_icon}/>
                                                <Text style={style.button_text}>Like</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={style.button}>
                                                <Image  source={ require('../assests/comment.png')} style={style.button_icon}/>
                                                <Text style={style.button_text}>Comment</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={style.button}>
                                                <Image  source={ require('../assests/share.png')} style={style.button_icon}/>
                                                <Text style={style.button_text}>Share</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                );
                            }
                        }/>
               </ScrollView>
             
             
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

    post(){
        let text = this.state.text;
        let mid = this.state.mid;
        let url = this.state.url;
      
        alert(url);
        fetch(
            'https://myfb2-8e2e6-default-rtdb.firebaseio.com/posts.json',
            {
                method:'POST',
                body: JSON.stringify(
                    {
                        post:text,
                        mid: mid,
                        photo: url,
                    }
                )
            }
        ).then(
            res =>{
                console.log(res);
                alert("Success");
                this.setState({text: ''});

            }
        ).catch(
            err=> console.log(err)
        );
    }

    handlePhoto = () =>{
     

        //Image picker
        const options = {};
        ImagePicker.launchImageLibrary(options, response=> {
            const data = response.assets[0];
           console.log("Response= "+data);
            if(data.uri){
                this.setState({
                    photo: data
                });

                //Upload to firebase and Get the URL
                //a) Image Object should Convert to base 64
                //b) Converted base 64 format content should send to firebase

                let name = data.fileName;
                const image = data.uri;

                const imageRef = firebase.storage().ref('posts').child(name);
                this.uriToBlob(image)
                .then((blob)=>{
                    return imageRef.put(blob,{contentType: 'image/jpeg'});
                })
                .then(()=>{
                    return imageRef.getDownloadURL();
                })
                .then((url)=>{
                    console.log("URL = "+url);
                    this.setState({
                        url: url
                    });
                })
                .catch((error)=>{
                    console.log(error);
                });


            }
        });
    }

    uriToBlob = (uri) => {
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.onload = function(){
                resolve(xhr.response)
            };

            xhr.onerror = function(){
                reject(new Error('URI ti Blob Failed'));
            }

            xhr.responseType = 'blob';
            xhr.open('GET',uri,true);
            xhr.send(null);
        });
    }

    
}

const style = StyleSheet.create({

    welcome:{
        padding:10,
        fontSize:20,
        textAlign:'center'
    },
    postbox:{
        flex:1,
        borderWidth:1,
        borderColor:'#5998C5',
        backgroundColor:'#fff',
        alignItems:'center',
        padding:0,
        paddingTop:20,
        paddingBottom:20,
        marginBottom:10
    },
    post_text:{
        padding:10,
    },
    post_image:{
        width:'100%', 
        height:300,
    },
    profile_photo:{
        width:40,
        height:40,
        borderRadius:20,
    },
    post_header:{
        width:'100%', 
        flex:1, 
        flexDirection:'row',
        justifyContent:'space-between', 
        padding:10,
    },
    profile_name:{
        width:'85%',
        paddingTop:10
    },
    like_bar:{
        width:'100%', 
        flex:1, 
        flexDirection:'row',
        paddingTop:10
    },
    button_bar:{
        width:'100%', 
        flex:1, 
        flexDirection:'row',
        paddingTop:10,
        justifyContent:'space-between',
    },
    button_icon:{
        width:25,
        height:25,
    },
    button:{
        flex:1,
        flexDirection:'row',
        paddingLeft:4,
    },
    button_text:{
        paddingTop:3,
        paddingLeft:5
    }


});
export default HomePage;