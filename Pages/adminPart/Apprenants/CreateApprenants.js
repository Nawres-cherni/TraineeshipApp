//create Apprenant s7i7a 

import React, { useState ,useEffect,useRef,useContext,useForm} from 'react'
import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  Keyboard
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
import themeContext from "../../Styles/themeContext";
import { Formik } from 'formik';
import * as yup from 'yup';

let validationForm = yup.object().shape({
  email: yup.string().email('Plead enter Email Adress').required('Email  Adress is required'),
  password: yup.string()
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .required('Password is required') 
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  
  name: yup.string().required('The Name is required'),
  cin: yup.string().required('Cin is required')
  .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
  .min(8, "to short")
  .max(8, "to long"),
  phone: yup.string().required('Phone Number is required')
  .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
  .min(8, "to short")
  .max(8, "to long"),



});
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



const CreateApprenants = (props,{error}) => {
  const theme=useContext(themeContext);
  const initalState = {
    cin:"",
    name: "",
    email: "",
    phone: "",
    imageUrl:"",
    password:"",
    errors:""
  
   
   
  };
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const [state, setState] = useState(initalState);
  const [image, setImage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState({});

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
      if (state.cin==="") {
        alert("please provide a name");
      } else {
      const {cin,name,email,phone,imageUrl,password} = state;
      firebase.firestore().collection('apprenants').where('cin', '==', state.cin).get()
      

      .then(snapshot => {
        if (snapshot.empty) {
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
        .catch((error)=>{
          if (error.code === 'auth/email-already-in-use') {
            //console.log(error)  
            Alert.alert('That email address is already in use!');
    
          }
      
          if (error.code === 'auth/invalid-email') {
            //console.log(error)  
            Alert.alert('That email address is invalid!');
    
          }
      
          console.error(error);
        });
      } 
      else{
        Alert.alert('Error','The Cin is already Exist try another one')
     

      }
    })
   
      
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
  

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    //Email
    if (!state.email) {
      handleError('Email Adress is Required', 'email');
      isValid = false;
    } 


    //Cin
    if (!state.cin) {
      handleError('Cin is Required', 'cin');
      isValid = false;
    }
    else if (state.cin.length < 8) {
      handleError('cin must be = 8 numbers', 'cin');
      isValid = false;
    }
    else if (state.cin.length > 8) {
      handleError('cin must be = 8 numbers', 'cin');
      isValid = false;
    }


    //Name
    if (!state.name) {
      handleError('Name is Required', 'name');
      isValid = false;
    }

    //Phone
    if (!state.phone) {
      handleError('Phone Number is Required', 'phone');
      isValid = false;
    } else if (state.phone.length < 8) {
      handleError('Phone must be = 8 numbers', 'phone');
      isValid = false;
    }
    else if (state.phone.length > 8) {
      handleError('Phone must be = 8 numbers', 'phone');
      isValid = false;
    }

    if (!state.password) {
      handleError('Password is Required', 'password');
      isValid = false;
    } else if (state.password.length < 8) {
      handleError('Min password length of 12', 'password');
      isValid = false;
    }else if (!state.password.match(check)) {
      handleError('Must Contain 12 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character', 'password');
      isValid = false;
   } 
   
    if (isValid) {
      saveNewUser();
    }
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}))
    
  };

  return (

    
    <ScrollView  style={{backgroundColor: theme.backClair}}>
{/* Header*/}
<View style={[styles.header,{backgroundColor: theme.header,}]}>

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
            backgroundColor: theme.header,
            height: 20,
            paddingHorizontal: 20,
            borderBottomLeftRadius:45,
            borderBottomRightRadius:45,
            paddingHorizontal:20,
          }}>
        
        </View>     
      </ScrollView>




     <View>
{/* Cin*/}
<Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer,{marginTop:-15}]}>
           <ScrollView>
<TextInput
ref={ref_input1}
keyboardType='numeric'
placeholder="Cin"
  style={[styles.input, {
    borderColor: isFocused.cin
    ? '#F3F4FB'
    : !errors.cin
       ? '#F3F4FB'
              : 'red',
            alignItems: 'center',
            borderWidth:1,
     
          },]}

          autoFocus={true}
          autoCorrect={false}
          onFocus={() => {
            handleError(null, 'cin')
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
  
          {...props}
  autoCapitalize="none"                 
  onChangeText={(value) => handleChangeText(value, "cin")}
  value={state.cin} 
  returnKeyType="next"
  blurOnSubmit={false}   
  onSubmitEditing={() => ref_input2.current.focus()}           
placeholderTextColor={'#001845'}
underlineColorAndroid='transparent'
backgroundColor={'rgb(223,228,234)'}
        /> 
           <FontAwesome5 name="id-card" size={22} color={'#001845' } style={styles.Icon} />
</ScrollView>
{(errors.cin) &&
            <Text style={styles.errors}>{errors.cin}</Text>
          }
</Animatable.View>


{/* Name*/}
<Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer,{marginTop:-15}]}>
           <ScrollView>
<TextInput
 ref={ref_input2}
 placeholder="Nom et Prenom"
  style={[styles.input, {
    borderColor: isFocused.name
    ? '#F3F4FB'
    : !errors.name
       ? '#F3F4FB'
              : 'red',
            alignItems: 'center',
            borderWidth:1,
          },]}
          autoFocus={true}
          autoCorrect={false}
          onFocus={() => {
            handleError(null, 'name')
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
  
          {...props}
  autoCapitalize="none"                 
  onChangeText={(value) => handleChangeText(value, "name")}
  value={state.name}   
  returnKeyType="next"
  blurOnSubmit={false}   
  onSubmitEditing={() => ref_input3.current.focus()}             
placeholderTextColor={'#001845'}
underlineColorAndroid='transparent'
backgroundColor={'rgb(223,228,234)'}
        /> 
        <FontAwesome name="user-o" size={22} color={'#001845' } style={styles.Icon} />
         
</ScrollView>
{(errors.name) &&
            <Text style={styles.errors}>{errors.name}</Text>
          }
</Animatable.View>


 









{/* Email*/}
    
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer,{marginTop:-15}]}>
           <ScrollView>
<TextInput
  ref={ref_input3}
  placeholder="Email"
  keyboardType='email-address'
  style={[styles.input, {
    borderColor: isFocused.email
    ? '#F3F4FB'
    : !errors.email
       ? '#F3F4FB'
              : 'red',
            alignItems: 'center',
            borderWidth:1,
          },]}
          autoFocus={true}
          autoCorrect={false}
          onFocus={() => {
            handleError(null, 'email')
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
  
          {...props}
  autoCapitalize="none"                 
  onChangeText={(value) => handleChangeText(value, "email")}
  value={state.email}  
  returnKeyType="next"
  blurOnSubmit={false}  
  onSubmitEditing={() => ref_input4.current.focus()}             
placeholderTextColor={'#001845'}
underlineColorAndroid='transparent'
backgroundColor={'rgb(223,228,234)'}
        /> 
          <FontAwesome name="envelope" size={22} color={'#001845' } style={styles.Icon} />
         
</ScrollView>
{(errors.email) &&
            <Text style={styles.errors}>{errors.email}</Text>
          }
</Animatable.View>







{/* Pasword*/}
       
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer,{marginTop:-15}]}>
           <ScrollView>
<TextInput
 ref={ref_input4}
 placeholder={'Password'}
   style={[styles.input, {
    borderColor: isFocused.password
    ? '#F3F4FB'
    : !errors.password
       ? '#F3F4FB'
              : 'red',
            alignItems: 'center',
            borderWidth:1,
          },]}
          autoFocus={true}
          autoCorrect={false}
          onFocus={() => {
            handleError(null, 'password')
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
  
          {...props}
  autoCapitalize="none"                 
  onChangeText={(value) => handleChangeText(value, "password")}
  value={state.password}   
   returnKeyType="next"
   blurOnSubmit={false}
   onSubmitEditing={() => ref_input5.current.focus()}           
placeholderTextColor={'#001845'}
underlineColorAndroid='transparent'
backgroundColor={'rgb(223,228,234)'}
        /> 
          <FontAwesome5 name="user-lock" size={22} color={'#001845' } style={styles.Icon} />
</ScrollView>
{(errors.password) &&
            <Text style={styles.errors}>{errors.password}</Text>
          }
</Animatable.View>



{/* Phone*/}
<Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer,{marginTop:-15}]}>
           <ScrollView>
<TextInput
 ref={ref_input5}
 placeholder="Phone"
  style={[styles.input, {
    borderColor: isFocused.phone
    ? '#F3F4FB'
    : !errors.phone
       ? '#F3F4FB'
              : 'red',
            alignItems: 'center',
            borderWidth:1,
          },]}
  keyboardType='numeric'
  autoFocus={true}
  autoCorrect={false}
  onFocus={() => {
    handleError(null, 'phone')
    setIsFocused(true);
  }}
  onBlur={() => setIsFocused(false)}

  {...props}
autoCapitalize="none"                 
onChangeText={(value) => handleChangeText(value, "phone")}
value={state.phone}  
  returnKeyType="next"
  blurOnSubmit={false}              
placeholderTextColor={'#001845'}
underlineColorAndroid='transparent'
backgroundColor={'rgb(223,228,234)'}
        /> 
          <FontAwesome name="phone" size={22} color={'#001845' } style={styles.Icon} />
         
</ScrollView>
{(errors.phone) &&
            <Text style={styles.errors}>{errors.phone}</Text>
          }
</Animatable.View>


{/* Photo*/}

<TouchableOpacity onPress={pickImage}  style={[styles.buttonImage,{marginTop:20}]} >
        <Text style={{color:'#fff'}}>Pick an image</Text>
      </TouchableOpacity>
      <View style={{alignItems:'center',marginTop:10 }}>
      <ImageBackground source={require('../../../assets/images/default-img.jpg')} resizeMode="cover" 
       style={{
      width: 200,
      height: 200,
      borderWidth: 1.5,
      borderColor: "#777777",
      alignSelf:'center',
      marginTop:20,
      marginBottom:20
    }}>
{image != null ? <Image source={{uri: image}}  
 style={{
  width: 200,
  height: 200,
  borderWidth: 1.5,
  borderColor: "#777777",
  alignSelf:'center',

}}/> : null}  
</ImageBackground>
  </View>






        


      <View style={[styles.buttonSaveApprenant,{   backgroundColor:'#1f487e'}]}>
        <TouchableOpacity onPress={() => validate()} >
          <Text style={{color:'#fff'}}>Save Apprenant</Text>
        </TouchableOpacity>
      </View>
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
    marginTop:-10
  },
  buttonSaveApprenant:{
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 10,
 
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

},
footer1: {
  flex: Platform.OS === 'ios' ? 3 : 5,
  paddingHorizontal: 35,
  paddingVertical: 10
},
input:{
  marginTop:30,
  width: 330,
  height:40,
  marginLeft:5,
  borderRadius: 35,
  fontSize:16,
  paddingLeft:60,
  backgroundColor:'#dfe4ea',
 // marginBottom:-10
  //borderColor:'#000',
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
    height:90
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
Icon: {
  position:'absolute',
  top: 40,
  left:20
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
errors:{
fontSize:14,
color:'red',
marginTop:5,
marginStart:10
}

});
export default CreateApprenants