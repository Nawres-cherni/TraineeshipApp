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
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar, TouchableRipple } from 'react-native-paper';
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
      name:user.name,
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
    bs.current.snapTo(1);
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

    bs.current.snapTo(1);
  }

  const  renderInner = () => (

      <ScrollView>
            <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Change Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
     
    
  );
  const    renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const   bs = React.createRef();
  const  fall = new Animated.Value(1);


  return(


    <SafeAreaView >
 <View style={styles.header1}>

<TouchableOpacity onPress={()=>props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
     </TouchableOpacity>
     <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

<Text style={styles.headerTitle}>Edit Profil</Text>



</View>

</View>
<BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />



      <ScrollView>
        

      <View style={styles.centrizedView}>
      <View style={styles.box}>
     
      <View  style={styles.editProfile} >
       <Avatar.Image 
       size={150} 
        source={{
         uri: imageUrl
         ? imageUrl
         : user
         ? user.imageUrl ||
           'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
         : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
     }}
         style={{
           marginTop:40,
 
           alignSelf:'center'
         }}
       />
        <TouchableRipple
                           onPress={() => bs.current.snapTo(0)}
                            rippleColor="rgba(0, 0, 0, .32)"
                            borderless={true}
                         
                        >
                            <View style={[styles.editProfile_icon,{alignSelf:'center',marginBottom:50,marginTop:20}]} >

                                <FontAwesome5
                                    name="user-edit"
                                    size={15}
                                    color={"#032468"}
                                />
                                <Text style={styles.editProfile_icon_text} >Change Profile Photo</Text>
                            </View>
                        </TouchableRipple>
    
     
     
     </View>
     <View style={{  

    paddingVertical:5 ,marginTop:20,paddingHorizontal:10}}>
   
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
               placeholder="name"
               style={styles.textInput1}
               value={user ? user.name : ''}
               onChangeText={(txt) => setUser({...user, name: txt})}
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

    
  <View style={[styles.buttonSaveApprenant,{backgroundColor:'#19AC52'}]}>
        <TouchableOpacity onPress={() => updateUser()}>
          <Text style={{color:'#fff'}}>Update Profil</Text>
        </TouchableOpacity>
      </View>

      
     </View>
     </View>
   
   </View>
      </View>
      <View style={{marginBottom:120}}></View>
   
      </ScrollView>
     


  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop:80
  },
  buttonSaveApprenant:{
    width: 370,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 10,
    backgroundColor:'#1f487e',
    //opacity:0.8,
  

  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  editProfile_icon: {
    flexDirection: 'row',
    marginTop: 10
},
editProfile_icon_text: {
    marginLeft: 10,
    color: '#032468',
},
  centrizedView:{
    width:'100%',
  
  },

  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:28,
    alignSelf:'center'
    
  },
  header1: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    height:90,

    
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  box:{
  padding:10
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
    paddingBottom: 5,
    marginStart:5
},

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingVertical:15,
    marginStart:5
},


action1: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginTop:-20,
    marginStart:5
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
panel: {
  padding: 20,
  backgroundColor: '#FFFFFF',
  paddingTop: 20,
  marginBottom:80
},

panelHeader: {
  alignItems: 'center',
},
panelHandle: {
  width: 40,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#00000040',
  marginBottom: 10,
},
panelTitle: {
  fontSize: 27,
  height: 35,
},
panelSubtitle: {
  fontSize: 14,
  color: 'gray',
  height: 30,
  marginBottom: 10,
},
panelButton: {
  padding: 13,
  borderRadius: 10,
  backgroundColor: '#1f487e',
  alignItems: 'center',
  marginVertical: 7,
},
panelButtonTitle: {
  fontSize: 17,
  fontWeight: 'bold',
  color: 'white',
},

});
  