//ta3 lyouùm

import React, { Component , useState } from 'react'
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
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
 // import AnimatedInput from "react-native-animated-input";
  import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
  import { Hideo } from 'react-native-textinput-effects';
  import { LinearGradient } from 'expo-linear-gradient' ;
export default class Login extends Component {

  constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        errorMessage:null,
        showPass: true,
        press: false
    }
    this.onSaveUser = this.onSaveUser.bind(this)
}

onSaveUser(){
  const {email, password} = this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) =>{
    this.props.navigation.navigate("main")
  })
  .catch((error)=>{
      console.log(error)  
  })
   }
showPass = () => {
    if(this.state.press == false){
  
      this.setState({showPass: false, press:true})
    }else{
      this.setState({showPass: true, press:false})
    }
  }
  render() {
    return (
      <ScrollView 
      style={{flex:1 , backgroundColor:'#fff'}}
      showsVerticalScrollIndicator={false}
      >

{/*Header*/}
<LinearGradient
      colors={[ '#f4f5f3', '#001845' ]}
      style={{
        height: Dimensions.get('window').height / 2.5}}
>
<View style={styles.brandView}>
<Image style={{marginLeft:-250, marginTop:-20}}
source={require('../../assets/images/log.png')}
/>
<Text style={styles.brandViewText}>TraineeShip</Text>
</View>
</LinearGradient>


{/*Bottom*/}
<View style={styles.bottomView}>
<View style={{padding: 40 }}>
<Text style={{color:'#000', fontSize:34, marginLeft:100}}>Bienvenue</Text>
<Text style={{color:'#000', fontSize:24, marginLeft:140}}>Sign In</Text>
<View style={{marginTop:50}}>
  <View floatingLabel style={{borderColor:'#4632A1'}}>
     <View style={{ marginLeft:10}}>
     <Hideo
      borderColor={'#aee2c9'}
      inputPadding={16}
      labelHeight={24}
      labelStyle={{ color: '#008445' }}
      inputStyle={{ color: '#f4a197' }}
    iconClass={FontAwesomeIcon}
    iconName={'envelope'}
   // inputStyle={{ borderColor:'#000'}}
    iconColor={'white'}
    iconBackgroundColor={'#001845'}
    placeholder={'Email'}  
    onChangeText={(email) => this.setState({ email })} 
    //inputStyle={{ color: '#464949',backgroundColor:'#fff' }}     
  />
<View style={{marginTop:40}}> 
<Hideo
    iconClass={FontAwesomeIcon}
    iconName={'lock'}
    iconColor={'white'}
    onChangeText={(password) => this.setState({ password })}
    iconBackgroundColor={'#001845'}
    inputStyle={{ color: '#464949',backgroundColor:'#fff' }} 
    placeholder={'Password'}   
    secureTextEntry={this.state.showPass}
  />
  <TouchableOpacity  style={styles.eyes}
onPress ={this.showPass.bind(this)}>
 <FontAwesome5 name={this.state.press == false ?'eye' : 'eye-slash'} 
 size={20} 
 //sstyle={{marginRight:-150 , marginTop:5}}
 color={'#001845'} 
 />
</TouchableOpacity>
  </View>
   </View>   
  </View>
    </View>
</View>

<TouchableOpacity rounded
    style={[styles.login, styles.shadowLogin , {shadowColor:'#00ac'}]} 
    onPress={() => this.onSaveUser()}>
        <Text style={styles.textlog}>SignIn</Text>
    </TouchableOpacity>
</View>
      </ScrollView>
    )
  }
}

export const styles = StyleSheet.create({
  brandView: {
    flex :1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:-100
  },
  brandViewText: {
      color: '#fff',
      fontSize:30,
      fontWeight:'bold',
      marginTop:-50,
      textTransform:'uppercase'
  },
  bottomView :{
    flex:1.5,
    backgroundColor:'#fff',
    bottom:50,
    borderTopStartRadius:60,
    borderTopEndRadius:60,
  },
  eyes: {
  marginHorizontal:2,
  marginLeft:-12,
  width:10
  },
  eyes: {
    position:'absolute',
    top: 8,
    right:37
  },
  login: {
 alignSelf:'center',
 height: 40,
 backgroundColor:'#000',
 width: Dimensions.get('window').width / 2,
 justifyContent: 'center',
 borderRadius: 45,
  },
  shadowLogin :{
      shadowOffset: {width:1 , height: 10},
      shadowOpacity: 0.4,
      shadowRadius:3,
      elevation: 15
  },
  textlog: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 20
     },
})
