//login mte3y s7i7a
import React, { Children, Component } from 'react'
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
    Keyboard,
    StatusBar
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient' ;
  import FontAwesome5 from 
'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class Login extends Component {


    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            type:'',
            errorMessage:null,
            showPass: true,
            press: false,
            refs:''
        }
        this.onSaveUser = this.onSaveUser.bind(this)
    }
    
    focusNextField(nextField) {
      this.refs[nextField].focus();
    }
    onSaveUser(){
      const {email, password} = this.state;
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then((result) =>{
        if(email=="admin@gmail.com"){
          this.props.navigation.navigate("Home")
          Alert.alert('Success','Welcome')
         console.log(result) 
        }else if(email=="cherninawress22@gmail.com"){
         //this.props.navigation.navigate('profilApp');
         this.props.navigation.navigate('appHome');
        }
        else{
          this.props.navigation.navigate('homeEc');
        }
          
    })
      .catch((error)=>{
        Alert.alert('Error',error.message)
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

      <ScrollView>
         <StatusBar   translucent={false} backgroundColor={"#001845"}   />
             
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
<Text style={styles.forgotMail}>SignIn </Text>
<View marginLeft={10}>
<TextInput
 ref="1"
         style={styles.input}
            placeholder={'Email'}
            keyboardType={'email-address'}
            autoCapitalize="none"
            onChangeText={email =>this.setState({email})}
            value={this.state.email}
            placeholderTextColor={'#001845'}
            underlineColorAndroid='transparent'
            backgroundColor={'rgb(223,228,234)'}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => this.focusNextField('2')}
        />
          <FontAwesome5 name="mail-bulk" size={25} color={'#001845' } style={styles.Icon}
     />
</View>
    


<View marginLeft={10}>
<TextInput
 ref="2"
         style={styles.input}
            placeholder={'Password'}
            autoCapitalize="none"
            onChangeText={password =>this.setState({password})}
            value={this.state.password}
            placeholderTextColor={'#001845'}
            underlineColorAndroid='transparent'
            secureTextEntry={this.state.showPass}
            backgroundColor={'rgb(223,228,234)'}
           
        
      />
         <FontAwesome5 name="lock" size={25} color={'#001845' } style={styles.Icon}
       />
 <TouchableOpacity  style={styles.eyes}
onPress ={this.showPass.bind(this)}>
 <FontAwesome5 name={this.state.press == false ?'eye' : 'eye-slash'} 
 size={20} 
 color={'#001845' } 
 />
</TouchableOpacity>
</View>
    </View>

    <TouchableOpacity style={styles.loginButton} onPress={() => this.onSaveUser()}>
<Text style={styles.loginButtonText}  >
  SignIn
</Text>
    </TouchableOpacity>


    
    <TouchableOpacity 
     onPress={() => this.props.navigation.navigate('resetPassword')}
    >
<Text style={styles.fogetPassword}>
 Forget Password? Click Here
</Text>
    </TouchableOpacity>
  </View>
</View>
       
    </View>
            
            
           

        </ScrollView>
    )
  }
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
      width: Dimensions.get('window').height * 0.5,
      height: Dimensions.get('window').height * 0.5,
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


  //fetchSignInMethodsForEmail