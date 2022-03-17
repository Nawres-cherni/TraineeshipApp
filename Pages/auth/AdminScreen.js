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
    Alert
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient' ;
  import FontAwesome5 from 
'react-native-vector-icons/FontAwesome5';
export default class AdminScreen extends Component {
 constructor(props){
   super(props);
   this.state={

   };
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
        <View style={styles.container}>
          
          <LinearGradient colors={['#001845', '#f4f5f3', '#001845'  ]} style={styles.bigCircle}></LinearGradient>
          <LinearGradient colors={['#f4f5f3', '#001845', '#f4f5f3' ]} style={styles.smallCircle}></LinearGradient>
<View style={styles.centrizedView}>
  <View  style={styles.authBox}>
    <View style={styles.logoBox}>
<Image style={{marginRight:250,marginTop:-15,marginLeft:5}}
source={require('../../assets/images/log.png')}
/>
    </View>
    <Text style={styles.troubleLoginTitle}>
      Bienvenu
    </Text>
    <View style={styles.inputBox}>
<Text style={styles.forgotMail}> Loggin In </Text>
<View marginLeft={10}>
<TextInput
         style={styles.input}
            placeholder={'Email'}
            autoCapitalize="none"
            onChangeText={email =>this.setState({email})}
            value={this.state.email}
            placeholderTextColor={'#001845'}
            underlineColorAndroid='transparent'
            backgroundColor={'rgb(223,228,234)'}
        ></TextInput>
          <FontAwesome5 name="mail-bulk" size={25} color={'#001845' } style={styles.Icon}
     />
</View>
    


<View marginLeft={10}>
<TextInput
         style={styles.input}
            placeholder={'Password'}
            autoCapitalize="none"
            //onChangeText={password =>this.setState({password})}
            //value={this.state.password}
            placeholderTextColor={'#001845'}
            underlineColorAndroid='transparent'
            secureTextEntry={this.state.showPass}
            backgroundColor={'rgb(223,228,234)'}
        ></TextInput>
         

 <TouchableOpacity  style={styles.eyes}
onPress ={this.showPass.bind(this)}>
 <FontAwesome5 name={this.state.press == false ?'eye' : 'eye-slash'} 
 size={20} 
 color={'#001845' } 
 />
</TouchableOpacity>
</View>
    </View>

    <TouchableOpacity style={styles.loginButton}>
<Text style={styles.loginButtonText}>
  Loggin
</Text>
    </TouchableOpacity>
  </View>
</View>
       
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    position: 'relative'
  },
  bigCircle:{
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor:'#035afc',
    borderRadius:1000,
    right: Dimensions.get('window').width * 0.25,
    top:-50
  },
  smallCircle:{
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor:'#035afc',
    borderRadius:1000,
    position:'absolute',
    marginBottom:-20,
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
centrizedView:{
  width:'100%',
  top:'-50%'
},

authBox:{
width:'90%',
height:'75%',
backgroundColor:'#fafafa',
borderRadius:20,
alignSelf:'center',
paddingHorizontal:14,
paddingBottom:30,
shadowColor:'#fff',
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
backgroundColor:'#fff',
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
alignItems:'center',
justifyContent:'center'
},

forgotMail:{
fontSize:17,
alignItems:'center',
justifyContent:'center'
},
  inputBox:{
    marginTop:10,
  },
inputLabel:{
fontSize:18,
marginBottom:6,
paddingTop:20
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
    left:20
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