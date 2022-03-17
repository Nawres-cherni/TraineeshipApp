//Etud S7i7a
import React, { Component } from 'react'
import {
    SafeAreaView,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import firebase from 'firebase';

export default class Etud extends Component {
  constructor(props){
    super(props);


    this.state={
      email:''
    }
    this.userSignOut = this.userSignOut.bind(this)
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setState({
          email:user.email
        })
      }
    })
  }
  
  userSignOut(){
    return firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('login'))
    .catch((error)=>{
        console.log(error)  
    })
     }

  render() {
    return (
        <View style={{marginTop:30,alignItems:'center'}}>
        <Text>Welcome {this.state.email} in Etude</Text>
        <TouchableOpacity onPress={() => this.userSignOut()}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        
    </View>
    )
  }
}
