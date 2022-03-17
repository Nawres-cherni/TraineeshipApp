//forget Password S7i7

import React, { Children, Component,useState } from 'react'
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
    KeyboardAvoidingView,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient' ;
  import FontAwesome5 from 
'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';


const {width, height} = Dimensions.get('window');
export default ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState()
   const forgetPassword = (email) => {
    if(!email){
        Alert.alert('Error', 'Please enter email')
    }
    return firebase.auth().sendPasswordResetEmail(email)
    .then((result) =>{
      Alert.alert('Good','Now Check your boit mail',[
        {text:'OK', onPress :() => navigation.navigate("login")}
      ])
      
    console.log(result) 
})
.catch((error)=>{
  Alert.alert('Error',error.message)

})


}
    return (

<ScrollView>
<View style={styles.container}>        
          <LinearGradient colors={['#001845', '#001845'  ]} style={styles.bigCircle}></LinearGradient>
          <LinearGradient colors={['#001845', '#001845' ]} style={styles.smallCircle}></LinearGradient>
    <View style={styles.centrizedView}>
    <View  style={styles.authBox}>
    <View style={styles.logoBox}>
    <Image style={{marginRight:250,marginTop:-15,marginLeft:5}}
    source={require('../../assets/images/log.png')}
    />
    </View>
    <Text style={styles.troubleLoginTitle}>
      Bienvenue 
    </Text>
    <View style={styles.inputBox}>
    <Text style={styles.forgotMail}>Mot de passe Oubliée</Text>
    <View marginLeft={10}>
    <TextInput
         style={styles.input}
            placeholder={'Email'}
            keyboardType={'email-address'}
            autoCapitalize="none"
            value= {email}
            onChangeText={ e => setEmail(e)}
            placeholderTextColor={'#001845'}
            underlineColorAndroid='transparent'
        />
          <FontAwesome5 name="mail-bulk" size={25} color={'#001845' } style={styles.Icon}
     />
    </View>
    
    </View>
    
    <TouchableOpacity style={styles.loginButton}  
                    onPress= {() => forgetPassword(email)}>
    <Text style={styles.loginButtonText}>
    Forget Password
    </Text>
    </TouchableOpacity>
    
    </View>
    </View>
       
    </View>
    
</ScrollView>
  
    
    )
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    position: 'relative',
    backgroundColor:'#EaEaEa'
  },
  bigCircle:{
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    borderRadius:1000,
    right: Dimensions.get('window').width * 0.25,
    top:-50
  },
  smallCircle:{
    width: Dimensions.get('window').height * 0.45,
    height: Dimensions.get('window').height * 0.45,
    borderRadius:1000,
    position:'absolute',
    marginBottom:-20,
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
centrizedView:{
  width:'100%',
  top:'-38%'
},

authBox:{
width:'90%',
height:'65%',
backgroundColor:'#fafafa',
borderRadius:20,
alignSelf:'center',
paddingHorizontal:14,
paddingBottom:30,
shadowColor:'#000',
shadowOffset:{
  width:0,
  height:2
},
shadowOpacity:0.25,
shadowRadius:3.84,
elevation:5
},

logoBox:{
width:115,
height:115,
backgroundColor:'#fafafa',
borderRadius:1000,
alignSelf:'center',
display:'flex',
alignItems:'center',
justifyContent:'center',
top:-50,
marginBottom:-50,
shadowColor:"#000",
shadowOffset:{
  width:0,
  height:1
},
shadowOpacity:0.2,
shadowRadius:1.41,
elevation:2
},

troubleLoginTitle:{
fontSize:22,
fontWeight:'bold',
paddingHorizontal:55,
alignSelf:'center',
color:'#001845'
},

forgotMail:{
fontSize:17,
alignSelf:'center',
color:'#001845'
},
fogetPassword:{
marginTop:20,
  fontSize:15,
  alignSelf:'center',
  color:'#001845'
},
  inputBox:{
    marginTop:10,
  },



  loginButton:{
    width: 350,
    height:45,
    borderRadius: 45,
   backgroundColor: '#001845',
   justifyContent: 'center',
   marginTop:20
  },
  loginButtonText:{
    color:'#fff',
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold'
  },
 

 
  eyes: {
    position:'absolute',
    top: 40,
    left:290
  },

input:{
  marginTop:30,
  width: 330,
  height:45,
  borderRadius: 35,
  fontSize:16,
  paddingLeft:60,
  backgroundColor:'#dfe4ea',
  //borderColor:'#000',
  }, 
  Icon: {
    position:'absolute',
    top: 40,
    left:20
  },
  inputContainer: {
    marginTop:30,
   
  },

})