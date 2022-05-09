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

export async function sendEmail(to, subject, body, options = {}) {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
  });

  if (query.length) {
      url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
      throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}



const CreateApprenants = (props) => {
  const initalState = {
    cin:"",
    name: "",
    email: "",
    phone: "",
    imageUrl:"",
    password:"",
   
  };
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();
  const ref_input8 = useRef();
  const [state, setState] = useState(initalState);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const [data, setData] = React.useState({
    check_textInputChange: false,
});

const textInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            username: val,
            check_textInputChange: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false
        });
    }
}
  useEffect(()=> {
    (async () => {
      if(Platform.OS !=='web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted'){
        alert('Sorry', 'we need camera roll permessions');
      }
      }
    })();
    }, []);
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
   
 

  const saveNewUser = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    if (state.name === "") {
      alert("please provide a name");
    } else {
    const {cin,name,email,phone,imageUrl,password} = state;
      firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(/*async ({user})*/ (result) =>{
   // await user.sendEmailVerification()
          firebase.firestore().collection("apprenants")
          .doc(firebase.auth().currentUser.uid)
          .set({
            cin,
            name,
            email,
            phone,
            imageUrl: image,
            password,  
          })

          props.navigation.navigate("listApprenants")
          Alert.alert('Message','Sucess')
          console.log(result)
          firebase.auth().sendSignInLinkToEmail(email, {
            url: "http://localhost:19002/",
            handleCodeInApp: true,
            
          })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
     
    
    }
  };




  const uploadImage = async () =>{
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
  
  
  const ref = firebase.storage().ref().child(new Date().toISOString());
  const snapshot = ref.put(blob)
  
  
  snapshot.on
  (firebase.storage.TaskEvent.STATE_CHANGED,
    () => {
  setUploading(true);
  },
  (error) => {
    setUploading(false)
    console.log(error);
    blob.close()
    return;
  },
  () => {
    snapshot.snapshot.ref.getDownloadURL().then((url) =>{
      setUploading(false);
      console.log("download url : ", url);
      blob.close();
      return url;
    });
  }
  );
  };
  



  return (

    
    <ScrollView >
{/* Header*/}
        <View style={styles.header}>

<TouchableOpacity onPress={()=>navigation.openDrawer()}>
<Icon name="sort" size={28} color={"#fff"} />
                 </TouchableOpacity>
                 <View style={{alignContent:'center',alignItems:'center', marginTop:35}}>
            <Text style={styles.headerTitle}>Create Apprenants</Text>
</View>
  <Icon name="notifications-none" size={28} color={"#fff"} />
</View>
<ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#1f487e",
            height: 50,
            paddingHorizontal: 20,
            borderBottomLeftRadius:45,
            borderBottomRightRadius:45,
            paddingHorizontal:20,
          }}>
        
        </View>     
      </ScrollView>


      <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <View style={styles.action}>
            <FontAwesome5 name="id-card" color="#05375a" size={20}/>
                <TextInput 
                    ref={ref_input1}
                    placeholder="Cin"
                    style={styles.textInput1}
                    autoCapitalize="none"                     
                    onChangeText={(value) => handleChangeText(value, "cin")}
                    value={state.cin}   
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => ref_input2.current.focus()}          
                /> 

            </View>       
            </ScrollView>
        </Animatable.View>


     







{/* Name*/}
      <Animatable.View 
            animation="fadeInUpBig"         
            style={[styles.footer,{marginTop:10}]}
        >
            <ScrollView>
            <View style={styles.action}
            
            >
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                 ref={ref_input2}
                    placeholder="Nom et Prenom"
                    style={styles.textInput1}
                    autoCapitalize="none"                     
                    onChangeText={(value) => handleChangeText(value, "name")}
                    value={state.name} 
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => ref_input3.current.focus()}        
                /> 
            </View>       
            </ScrollView>
        </Animatable.View>





{/* Email*/}
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer1}
        >
            <ScrollView>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                 ref={ref_input3}
                    placeholder="Email"
                    style={styles.textInput1}
                    keyboardType={'email-address'}
                    autoCapitalize="none"                     
                    onChangeText={(value) => handleChangeText(value, "email")}
                    value={state.email}   
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => ref_input4.current.focus()}        
                /> 

            </View>        
            </ScrollView>
        </Animatable.View>
{/* Pasword*/}
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer1}
        >
            <ScrollView>
            <View style={styles.action}>
                <FontAwesome5
                    name="user-lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                 ref={ref_input4}
                    placeholder="Password"
                    style={styles.textInput1}
                    autoCapitalize="none"                      
                    onChangeText={(value) => handleChangeText(value, "password")}
                    value={state.password}    
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => ref_input5.current.focus()}    
                /> 

            </View>        
            </ScrollView>
        </Animatable.View>

{/* Phone*/}
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer1}
        >
            <ScrollView>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                 ref={ref_input5}
                    placeholder="Telephone"
                    style={styles.textInput1}
                    autoCapitalize="none"                     
                    onChangeText={(value) => handleChangeText(value, "phone")}
                    value={state.phone}        
                /> 
            </View>        
            </ScrollView>
        </Animatable.View>


        
      {/* Name Input 
      <View style={styles.inputGroup}>
        <TextInput
        style={styles.textInput}
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
        </View>*/}

      {/* Email Input 
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>*/}

      {/* Input 
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="phone"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
        />
      </View>*/}
      
      {/* Input 
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="password"
          onChangeText={(value) => handleChangeText(value, "password")}
          value={state.password}
        />
      </View>*/}


      <TouchableOpacity onPress={pickImage}  style={styles.buttonImage} >
        <Text style={{color:'#fff'}}>Pick an image</Text>
      </TouchableOpacity>
      <View style={{alignItems:'center',marginTop:10 }}>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 ,marginBottom:20}} />
      </View>


      <View style={styles.buttonSaveApprenant}>
        <TouchableOpacity onPress={() => saveNewUser()}>
          <Text style={{color:'#fff'}}>Enregistrer Apprenant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
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
    marginBottom:90

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


text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},

});
export default CreateApprenants