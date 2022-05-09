//update s7i7a
//Detail s7i7a bel image maghyr update
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import  firebase from 'firebase';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons'


const UpdateApprenants = (props) => {
  const [imageUrl, setimageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
    const initialState = {
        id: "",
        cin:"",
        name: "",
        email: "",
        phone: "",
        imageUrl:null
      };
    
      const [user, setUser] = useState(initialState);
      const [loading, setLoading] = useState(true);
    
      const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value });
      };
    
      const getUserById = async (id) => {
        const dbRef =  firebase.firestore().collection("apprenants").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id });
        setLoading(false);
      };
    
      const deleteUser = async () => {
        setLoading(true)
        const dbRef =  firebase.firestore()
          .collection("apprenants")
          .doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("listApprenants");
      };
    
      const openConfirmationAlert = () => {
        Alert.alert(
          "Removing the User",
          "Are you sure?",
          [
            { text: "Yes", onPress: () => deleteUser() },
            { text: "No", onPress: () => console.log("canceled") },
          ],
          {
            cancelable: true,
          }
        );
      };
    

  


      const updateUser = async () => {
        let imgUrl = await uploadImage();

        if( imgUrl == null && user.imgUrl ) {
          imgUrl = user.imgUrl;
        }
        const userRef =  firebase.firestore().collection("apprenants").doc(user.id);
        await userRef.set({
          cin:user.cin,
          name: user.name,
          email: user.email,
          phone: user.phone,
          imageUrl:imageUrl
        });
        setUser(initialState);
        props.navigation.navigate("listApprenants");
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
        getUserById(props.route.params.userId);
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
    
    
      if (loading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
          </View>
        );
      }
    
      return (
        
        <View>
            <ScrollView>
                  <View style={styles.header}>

                  <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginTop:10}}>
<Icon name="chevron-left" size={28} color={"#fff"} />
                 </TouchableOpacity>
 
                 <View style={{alignContent:'center',alignItems:'center', marginTop:50}}>
            <Text style={styles.headerTitle}>Update Apprenant</Text>
</View>

  <Icon name="notifications-none" size={28} color={"#fff"} style={{marginTop:10}} />
</View>





    


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
                width: 160,
                height: 160,
                borderRadius: 150 / 2,
                overflow: "hidden",
                borderWidth: 3,
                borderColor: "#777777",
                alignSelf:'center',
                marginTop:20,
                marginBottom:20
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
        
             <Text style={{marginBottom:10,alignSelf:'center'}} onPress={pickImage}>Update Image</Text>



             <View style={styles.action}>
             <FontAwesome5 name="id-card" color="#05375a" size={20}/>
                <TextInput 
                    placeholder="Cin"
                    style={styles.textInput1}
                    value={user.cin}
                    onChangeText={(value) => handleTextChange(value, "cin")}
                    />
                     </View>

            <View style={styles.action}>
                     <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Nom et Prenom"
                    style={styles.textInput1}
                    value={user.name}
                    onChangeText={(value) => handleTextChange(value, "name")}
                    />
                     </View>






                     <View style={styles.action}>
                <FontAwesome 
                    name="envelope"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Email"
                    style={styles.textInput1}
                    value={user.email}
                    onChangeText={(value) => handleTextChange(value, "email")}
                    />
                     </View>







                     <View style={styles.action}>
 <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
             <TextInput 
                    placeholder="Telephone"
                    style={styles.textInput1}
                    value={user.phone}
                    onChangeText={(value) => handleTextChange(value, "phone")}
                    
                    />
                     </View>

          </View>

          <View style={styles.btn}>
            <Button
              title="Delete"
              onPress={() => openConfirmationAlert()}
              color="#E37399"
            />
          </View>
          <View>
            <Button title="Update" onPress={updateUser} color="#19AC52" />
          </View>
        </View>



     
      </View>

{/* 

 <View>
            <TextInput
              placeholder="Name"
              autoCompleteType="username"
              style={styles.inputGroup}
              value={user.name}
              onChangeText={(value) => handleTextChange(value, "name")}
            />
          </View>
          <View>
            <TextInput
              autoCompleteType="email"
              placeholder="Email"
              style={styles.inputGroup}
              value={user.email}
              onChangeText={(value) => handleTextChange(value, "email")}
            />
          </View>
          <View>
            <TextInput
              placeholder="Phone"
              autoCompleteType="tel"
              style={styles.inputGroup}
              value={user.phone}
              onChangeText={(value) => handleTextChange(value, "phone")}
            />
          </View>

*/}
         
         <View style={{marginBottom:90}}/>
         </ScrollView>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 35,
      },
      header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#1f487e",
        borderBottomLeftRadius:45,
        borderBottomRightRadius:45,
        height:120,
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
      action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    headerTitle: {
      color: "#fff",
      fontWeight: 'bold',
      fontSize: 18,
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
    centrizedView:{
      width:'100%',
      marginTop:60
    
    },

    box:{
      width:'90%',
      height:'85%',
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
    });
    
export default UpdateApprenants