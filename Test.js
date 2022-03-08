import React, { Component , useState } from 'react'
  import {
    SafeAreaView,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Button,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
import firebase from 'firebase';
export default class Test extends Component {
 constructor(props){
     super(props);

     this.state = {
         email: '',
         password:'',
         name:''
     }
     
     this.onSaveUser = this.onSaveUser.bind(this)
 }
 
 onSaveUser(){
const {email, password, name} = this.state;
firebase.auth().createUserWithEmailAndPassword(email, password)
.then((result) =>{
    console.log(result)
})
.catch((error)=>{
    console.log(error)  
})
 }
 
    render() {
    return (
      <View style={{marginTop:150, padding:30}}>
          
          <TextInput
                    style={styles.textInput}
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    style={styles.button}
                    onPress={() => this.onSaveUser()}
                    title="Save User"
                />

      </View>
    )
  }
}


export const styles = StyleSheet.create({
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    bottomButton: {
        alignContent: 'center',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        padding: 10,
        textAlign: 'center',
    },
  })
  
