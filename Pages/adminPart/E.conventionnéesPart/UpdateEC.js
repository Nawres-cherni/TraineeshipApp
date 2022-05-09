//update s7i7a
//Detail s7i7a bel image maghyr update
import React, { useEffect, useState,useRef } from "react";
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
import { Card } from 'react-native-paper';

const UpdateEC = (props) => {
  const [imageUrl, setimageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
    const initialState = {
        id: "",
        nom_soc:"",
        nom_res: "",
        email: "",
        password: "",
        fax:"",
        fix:"",
        imageUrl:"",
        site:"",
        location:""
    
      };
  
      
      const ref_input1 = useRef();
      const ref_input2 = useRef();
      const ref_input3 = useRef();


      const [user, setUser] = useState(initialState);
      const [loading, setLoading] = useState(true);
    
      const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value });
      };
    
      const getUserById = async (id) => {
        const dbRef =  firebase.firestore().collection("e_conventionnées").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id });
        setLoading(false);
      };
    
      const deleteUser = async () => {
        setLoading(true)
        const dbRef =  firebase.firestore()
          .collection("e_conventionnées")
          .doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("listec");
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
        const userRef =  firebase.firestore().collection("e_conventionnées").doc(user.id);
        await userRef.set({

            email: user.email,
            password: user.password,
        });
        setUser(initialState);
        props.navigation.navigate("listec");
      };
    
    

      useEffect(() => {
        getUserById(props.route.params.userId);
      }, []);
    
    
    
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
            <Text style={styles.headerTitle}>Update Entreprise</Text>
</View>

  <Icon name="notifications-none" size={28} color={"#fff"} style={{marginTop:10}} />
</View>



    


<View style={styles.centrizedView}>
      <View style={styles.box}>
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
                    style={[styles.textInput1,{marginBottom:15}]}
                    autoCapitalize="none"  
                    value={user.email}                   
                    onChangeText={(value) => handleTextChange(value, "email")}
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
                    style={[styles.textInput1,{marginBottom:15}]}
                    autoCapitalize="none"                      
                    onChangeText={(value) => handleTextChange(value, "password")}
                    value={user.password}     
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
        height:120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#1f487e",
        borderBottomLeftRadius:45,
        borderBottomRightRadius:45,
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
      height:'80%',
      backgroundColor:'#fafafa',
      borderRadius:20,
      alignSelf:'center',
      paddingHorizontal:14,
      paddingBottom:60,
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
    
export default UpdateEC