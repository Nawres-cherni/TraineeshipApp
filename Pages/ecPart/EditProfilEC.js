import React, {Component,useState,useEffect,useRef} from 'react';
import {
  ScrollView,
  Button,
  View,
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import  firebase from 'firebase';
import 'firebase/storage';
import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default  EditProfilApp = (props) => {
  const [imageUrl, setimageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [pickedImagePath, setPickedImagePath] = useState('');
   

  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();
  const ref_input8 = useRef();
  const ref_input9 = useRef();

      const [user, setUser] = useState();
      const [name, setName] = useState();

      const [loading, setLoading] = useState(true);
    
      const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value });
      };
  
  
  //unsubscribe=null;
  const getUser = () => {
    const user = firebase.auth().currentUser.uid; 
    firebase.firestore()
    .collection('e_conventionnées')
    .doc(user)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUser(documentSnapshot.data());
      }
    })
  }
 
  const updateUser = async () => {
    let imgUrl = await uploadImage();

    if( imgUrl == null && user.imgUrl ) {
      imgUrl = user.imgUrl;
    }
    firebase.firestore().collection("e_conventionnées")
    .doc(firebase.auth().currentUser.uid)
    .update({
        nom_soc:user.nom_soc,
      nom_res:user.nom_res,
      email: user.email,
      password: user.password,
      fax:user.fax,
      fix: user.fix,
      site: user.site,
      location: user.location,
      latitude: user.latitude,
      longitude: user.longitude,
      imageUrl:imageUrl

    }).then(() => {
        props.navigation.goBack()
    })
    //setUser(initialState);
  };  
  const uploadImage = async () => {
    if( imageUrl == null ) {
      return null;
    }
    const uploadUri = imageUrl;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);
    //const childPath = `${firebase.auth().currentUser.uid}`;
    const response = await fetch(uploadUri);
    const blob = await response.blob();
    const storageRef =  firebase.storage().ref(`apprenants/${filename}`);
    const task = storageRef.put(blob);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setimageUrl(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };
  
  useEffect(() => {
    getUser();
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
      setimageUrl(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setimageUrl(result.uri);
      console.log(result.uri);
    }
  }






  return(


    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

<TouchableOpacity onPress={()=>props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"} />
                 </TouchableOpacity>
                 <Text style={styles.headerTitle}>Edit Profil</Text>
                 <Icon name="notifications-none" size={28} color={"#fff"} />
</View>
      <ScrollView>
      <View style={styles.centrizedView}>
      <View style={styles.box}>
     
      <View >
       <Image
        source={{
         uri: imageUrl
         ? imageUrl
         : user
         ? user.imageUrl ||
           'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
         : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
     }}
         style={{
           height: 150,
           width: '100%',
           marginTop:70,
           marginBottom:40
         }}
       />
    
       <ActionButton buttonColor="#05375a"  >
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Take Photo"
        onPress={openCamera}>
        <FontAwesome5 name="camera-retro" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Choose Photo"
        onPress={pickImage}>
        <FontAwesome5 name="images" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
     
     
     </View>
     <View style={{ padding: 10 }}>
   
{/* Nom_societer*/}
<View style={styles.action1}>
          <Foundation
                name="torso-business" color="#05375a" size={20}/>
           <TextInput 
            ref={ref_input1}
               placeholder="nom_soc"
               style={styles.textInput1}
               value={user ? user.nom_soc : ''}
               onChangeText={(txt) => setUser({...user, nom_soc: txt})}
               underlineColorAndroid='transparent'
               returnKeyType="next"
               blurOnSubmit={false}
               onSubmitEditing={() => ref_input2.current.focus()}
               />
                </View>

{/* Responsable*/}
        <View style={styles.action}>
          <FontAwesome5 name="user-circle" color="#05375a" size={20}/>
           <TextInput 
            ref={ref_input2}
               placeholder="nom_res"
               style={styles.textInput1}
               value={user ? user.nom_res : ''}
               onChangeText={(txt) => setUser({...user, nom_res: txt})}
               underlineColorAndroid='transparent'
               returnKeyType="next"
               blurOnSubmit={false}
               onSubmitEditing={() => ref_input3.current.focus()}
               />
                </View>

                

{/* email*/}
                <View style={styles.action}>
           <FontAwesome 
               name="envelope"
               color="#05375a"
               size={20}
           />
           <TextInput 
               placeholder="Email"
               style={styles.textInput1}
               value={user ? user.email : ''}
               onChangeText={(txt) => setUser({...user, email: txt})}
               editable={false}
               selectTextOnFocus={false}
             
               />
                </View>
{/* password*/}                    
                <View style={styles.action}>
                <FontAwesome5 name="user-lock" color="#05375a" size={20}/>
           <TextInput 
             ref={ref_input3}

               placeholder="Password"
               style={styles.textInput1}
               value={user ? user.password : ''}
               onChangeText={(txt) => setUser({...user, password: txt})}
               returnKeyType="next"
               blurOnSubmit={false}
               onSubmitEditing={() => ref_input4.current.focus()}
               />
                </View>
{/* fax*/}
<View style={styles.action}>
                <FontAwesome5 name="fax" color="#05375a" size={20}/>
           <TextInput 
              ref={ref_input4}
               placeholder="fax"
               style={styles.textInput1}
               value={user ? user.fax : ''}
               onChangeText={(txt) => setUser({...user, fax: txt})}
                returnKeyType="next"
            blurOnSubmit={false}
               onSubmitEditing={() => ref_input5.current.focus()}
               />
                </View>   

{/* fix*/}
<View style={styles.action}>
                <FontAwesome5 name="blender-phone" color="#05375a" size={20}/>
           <TextInput 
              ref={ref_input5}
               placeholder="fix"
               style={styles.textInput1}
               value={user ? user.fix : ''}
               onChangeText={(txt) => setUser({...user, fix: txt})}
                returnKeyType="next"
            blurOnSubmit={false}
               onSubmitEditing={() => ref_input6.current.focus()}
               />
                </View>  




{/* site*/}
<View style={styles.action}>
                <MaterialCommunityIcons name="web" color="#05375a" size={20}/>
           <TextInput
              ref={ref_input6} 
               placeholder="site"
               style={styles.textInput1}
               value={user ? user.site : ''}
               onChangeText={(txt) => setUser({...user, site: txt})}
                returnKeyType="next"
            blurOnSubmit={false}
               onSubmitEditing={() => ref_input7.current.focus()}
               />
                </View>  




{/* location*/}
<View style={styles.action}>
                <Entypo name="location" color="#05375a" size={20}/>
           <TextInput 
              ref={ref_input7}
               placeholder="location"
               style={styles.textInput1}
               value={user ? user.location : ''}
               onChangeText={(txt) => setUser({...user, location: txt})}
                returnKeyType="next"
            blurOnSubmit={false}
               onSubmitEditing={() => ref_input8.current.focus()}
               />
                </View>  



{/* lat*/}
<View style={styles.action}>
                <MaterialCommunityIcons name="latitude" color="#05375a" size={20}/>
           <TextInput 
              ref={ref_input8}
               placeholder="latitude"
               style={styles.textInput1}
               value={user ? user.latitude : ''}
               onChangeText={(txt) => setUser({...user, latitude: txt})}
                returnKeyType="next"
            blurOnSubmit={false}
               onSubmitEditing={() => ref_input9.current.focus()}
               />
                </View>  



{/* long*/}
<View style={styles.action}>
                <MaterialCommunityIcons name="longitude" color="#05375a" size={20}/>
           <TextInput 
              ref={ref_input9}
               placeholder="longitude"
               style={styles.textInput1}
               value={user ? user.longitude : ''}
               onChangeText={(txt) => setUser({...user, longitude: txt})}
           
               />
                </View>  
  {/* button update*/}
  <View style={{marginTop:20}}>
       <Button title="Update" onPress={updateUser}  color="#19AC52" />
     </View>
     </View>
   
   </View>
      </View>
      <View style={{marginBottom:120}}></View>
   
      </ScrollView>
     
  

























     {/* Parti 2
  <View>
  <Image
              source={{
                uri: imageUrl
                ? imageUrl
                : user
                ? user.imageUrl ||
                  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
              style={{
                height: 135,
                width: 300
              }}
            />
          </View>


                    <Text style={{marginBottom:10,alignSelf:'center'}} onPress={pickImage}>Update Image</Text>
  <TextInput 
                    placeholder="Nom et Prenom"
                    style={styles.textInput1}
                    //value={user.name}
                    value={user ? user.name : ''}
                    onChangeText={(txt) => setUser({...user, name: txt})}
                   // onChangeText={(value) => handleTextChange(value, "name")}
                
                    />
                    <TouchableOpacity onPress={updateUser}>
                      <Text>Update</Text>
                    </TouchableOpacity>


                    <View >
       
    </View>
      */} 
  </SafeAreaView>









  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop:80
  },
  centrizedView:{
    width:'100%',
  
  },

  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:20
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    top:-80,
    height:90,
    borderBottomLeftRadius:45,
    borderBottomRightRadius:45
    
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  box:{
    width:'90%',
    height:690,
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
    elevation:10
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
  actio1n: {
    flexDirection: 'row',
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},


action1: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginTop:-20
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
});
  