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
    Alert
  } from 'react-native';
import firebase from 'firebase';
export default class Test extends Component {
 constructor(props){
     super(props);

     this.state = {
        cin:'',
        identifiant:'',
        email:'',
        password:'',
        type:''
     }
     
     this.onSaveUser = this.onSaveUser.bind(this)
 }
 
 onSaveUser(){
const {cin,identifiant,email,password,type} = this.state;
firebase.auth().createUserWithEmailAndPassword(email, password)
.then((result) =>{
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
        cin,
        identifiant,
        email,
        password,
        type
    })
    Alert.alert('Message','Sucess')
    console.log(result)
})
.catch((error)=>{
    Alert.alert('Error',error.message)
    console.log(error)  
})
 }
 
    render() {
    return (
      <View style={{marginTop:150, padding:30}}>
          
          <TextInput
                    style={styles.textInput}
                    placeholder="cin"
                    onChangeText={(cin) => this.setState({ cin })}
                />
                  <TextInput
                    style={styles.textInput}
                    placeholder="identifiant"
                    onChangeText={(identifiant) => this.setState({ identifiant })}
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
         <TextInput
                    style={styles.textInput}
                    placeholder="type"
                    onChangeText={(type) => this.setState({ type })}
                />
                <Button
                    style={styles.button}
                    onPress={() => this.onSaveUser()}
                    title="Save User"
                />


<Button
                    style={styles.button}
                    onPress={()=>this.props.navigation.navigate("login")}
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
  
