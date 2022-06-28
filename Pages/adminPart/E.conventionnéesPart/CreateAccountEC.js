import React, { useState ,useEffect,useRef} from 'react'
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import  firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
var currentUser
import qs from 'qs';
import { Linking } from 'react-native';

const CreateAccountEC = (props) => {
    const initalState = {
        email: "",
        password:"",
       
      };

      const ref_input1 = useRef();
      const ref_input2 = useRef();
    


      const [state, setState] = useState(initalState);
      const [currentUserId, setCurrentUserId] = useState();

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    }   
    
    
    const saveNewUser = async () => {
        if (state.email === "") {
          alert("please provide the email");
        } else {
        const {email,password} = state;
          firebase.auth().createUserWithEmailAndPassword(email, password)
       .then(/*async ({user})*/ (result) =>{
       // await user.sendEmailVerification()
              firebase.firestore().collection("e_conventionnées")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email,
                password,  
                chats: [],
                bgColor: '#FFF',
              })
    
        
              props.navigation.navigate("listec")
              Alert.alert('Message','Sucess')
              console.log(result)
              firebase.auth().sendSignInLinkToEmail(email, {
                url: "http://localhost:19002/",
                handleCodeInApp: true,
                
              })
          })
      

          .catch((error)=>{
            if (error.code === 'auth/email-already-in-use') {
              console.log(error)  
              Alert.alert('That email address is already in use!');

            }
        
            if (error.code === 'auth/invalid-email') {
              console.log(error)  
              Alert.alert('That email address is invalid!');

            }
        
            console.error(error);
          });
         
        
        }
      };


  return (

    <ScrollView >
    {/* Header*/}
            <View style={styles.header}>
    
    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
    <Icon name="sort" size={28} color={"#fff"} />
                     </TouchableOpacity>
                     <View style={{alignContent:'center',alignItems:'center', marginTop:35}}>
            <Text style={styles.headerTitle}>Create Etreprises conventionnées</Text>
</View>
      <Icon name="notifications-none" size={28} color={"#fff"} />
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: "#1f487e",
                height: 70,
                paddingHorizontal: 20,
                borderBottomLeftRadius:45,
                borderBottomRightRadius:45,
                paddingHorizontal:20,
              }}>
            
            
            </View>     
          </ScrollView>  
    <Animatable.View 
    animation="fadeInUpBig"
    style={styles.footer}>


<View style={styles.action}>
                <FontAwesome 
                    name="envelope"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                 ref={ref_input1}
               keyboardType={'email-address'}
                    placeholder="Email"
                    style={styles.textInput1}
                    autoCapitalize="none"                     
                    onChangeText={(value) => handleChangeText(value, "email")}
                    value={state.email}   
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => ref_input2.current.focus()}        
                /> 

            </View> 


            <View style={styles.action}>
                <FontAwesome5
                    name="user-lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
              ref={ref_input2}
                    placeholder="Password"
                    style={styles.textInput1}
                    autoCapitalize="none"                      
                    onChangeText={(value) => handleChangeText(value, "password")}
                    value={state.password}     
                /> 

            </View>  




            <View style={styles.buttonSaveApprenant}>
        <TouchableOpacity onPress={() => saveNewUser()}>
          <Text style={{color:'#fff'}}>Enregistrer</Text>
        </TouchableOpacity>
      </View>




    </Animatable.View >
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  buttonImage:{
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor:"#1f487e",
   marginLeft:130

  },

  buttonSaveApprenant:{
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 10,
    backgroundColor:'#1f487e',
    //opacity:0.8,
    borderRadius:45,
    marginTop:30

  },
  container: {
    flex: 1,
    padding: 35,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    paddingHorizontal:35,
    paddingVertical: 10,
    marginTop:40
},
footer1: {
  flex: Platform.OS === 'ios' ? 3 : 5,
  paddingHorizontal: 35,
  paddingVertical: 10
},
textInput1: {
  flex: 1,
  padding: 3,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
},
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},

headerTitle: {
  color: "#fff",
  fontWeight: 'bold',
  fontSize: 18,
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},

});
export default CreateAccountEC