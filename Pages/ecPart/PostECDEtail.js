//update Detail Post
import React, {useEffect, useState,Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Button,
  
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import { MaterialIcons,FontAwesome ,FontAwesome5,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { Avatar, TouchableRipple } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";

class PostECDEtail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid:'',
      id:this.props.route.params.id,
      userId:this.props.route.params.userId,
      postData: this.props.route.params.postData,
      postId: this.props.route.params.postId,

      post: this.props.route.params.post,
      postTime: firebase.firestore.Timestamp.fromDate(new Date()),
      postImg:this.props.route.params.postImg,
      uploading:false,
      transferred:0,
      imageUrl:null,
      myPosts:[],
      posts: [],
      isLoading: true
    };
  }
 

  getMyPosts = () => {
    console.log('uid=>>>>>>>>>', this.state.uid)
    firebase.firestore().collection('posts').where('userId', '==', this.state.uid).get()
        .then((posts) => {

            let p = []
            //let likes = 0
            posts.docs.map((post) => {
                p.push({ ...post.data(), ...{ postId: post.id } })
                //likes += post.data().likes.length
            })
            this.setState({ myPosts: p,  loading: false }, () => console.log(this.state.myPosts))
        })
}


  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateUser = async () => {
    this.setState({
      isLoading: true,
    });

    let imgUrl = await this.uploadImage();

    if( imgUrl == null &&  this.setState({imgUrl}) ) {
      imgUrl = this.setState({imgUrl});
    }


    const updateDBRef = firebase.firestore().collection('posts').doc(this.state.postId);
    updateDBRef.update({
     // userId: this.state.userId,
      post: this.state.post,
      postTime: this.state.postTime,
      postImg: this.state.postImg,

    }).then(() => {
   

    this.setState({ loading: false })
      this.props.navigation.navigate('HomeEc');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
 uploadImage = async () => {
    if( this.state.imageUrl == null ) {
      return null;
    }
    const uploadUri = this.state.imageUrl;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    this.setState({
      uploading: true,
      transferred:0
    });
  
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



      this.setState({
        transferred:  Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      });
    
    
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      this.setState({
       uploading:false,
       postImg:null
      });
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  }; 



  componentDidMount() {
    this.getMyPosts()
 
  
   }
   pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState(
        {
          postImg:result.uri
        }
       );
    }
  };

   openCamera = async () => {
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
      this.setState(
        {
          postImg:result.uri
        }
       );
      console.log(result.uri);
    }
  }


  deleteUser(id) {
    const dbRef = firebase.firestore().collection('posts').doc(this.state.postId)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('HomeEc');
      })
  }
  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  render() {
   
    
    return (
      <View>

{/* Header*/}
<StatusBar barStyle="light-content" backgroundColor="#1f487e" />  

<View style={styles.header}>

<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
     </TouchableOpacity>
     <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

<Text style={styles.headerTitle}>Post Detail</Text>



</View>

</View>



<View style={styles.authBox}>
      <View >
          <View style={{      marginTop:20,}}>
          <TouchableRipple
                            onPress={() => this.RBSheet.open()}
                            rippleColor="rgba(0, 0, 0, .32)"
                            borderless={true}
                        >
        {this.state.postImg != null ? 
        <Image 
        source={{
          uri: this.state.postImg
      }}  
     style={{

      width: 210,
      height: 120,
     // borderRadius: 150 / 2,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "#777777",
      alignSelf:'center',
      marginTop:20,
      
    }}/>: <Image source={require('../../assets/images/default-img.jpg')}
    
    style={{
      width: 200,
      height: 120,
     // borderRadius: 150 / 2,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "#777777",
      alignSelf:'center',
      marginTop:20,
     
    }}
    />}  
       
     
                  
                        </TouchableRipple>
                        <RBSheet
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={150}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    justifyContent: 'space-evenly',

                                }
                            }}
                        >
                            <TouchableRipple
                                onPress={this.openCamera}
                                rippleColor="rgba(0, 0, 0, .32)"
                                borderless={true}
                            >
                                <View style={styles.editProfile_bottom_option} >
                                    <FontAwesome
                                        name="camera"
                                        size={20}
                                        color={"#032468"}
                                    />
                                    <Text style={styles.editProfile_bottom_option_text}  >Take from camera</Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple
                                onPress={this.pickImage}
                                rippleColor="rgba(0, 0, 0, .32)"
                                borderless={true}
                            >
                                <View style={styles.editProfile_bottom_option} >
                                    <MaterialIcons
                                        name='perm-media'
                                        size={20}
                                        color={"#032468"}
                                    />
                                    <Text style={styles.editProfile_bottom_option_text} >Choose from Gallery</Text>
                                </View>
                            </TouchableRipple>
                        </RBSheet>
     </View>
     <View style={styles.viewTextInput}>

 
            
                <TextInput 
                  multiline = {true}
                  numberOfLines = {3}
                 placeholder={'Post'}
                 value={this.state.post}
                 onChangeText={(val) => this.setState({ post: val })}
                 
                    style={[styles.textInput1,{marginBottom:15}]}
                    autoCapitalize="none"         
                /> 

          
      
        <View style={[{marginTop:15}]}>

        <View style={[styles.buttonSaveApprenant,{backgroundColor:'#19AC52'}]}>
        <TouchableOpacity onPress={() => this.updateUser()}>
          <Text style={{color:'#fff'}}>Update post</Text>
        </TouchableOpacity>
      </View>



      
      <View style={[styles.buttonSaveApprenant,{backgroundColor:'#E37399',marginTop:20}]}>
        <TouchableOpacity onPress={() => this.openTwoButtonAlert()}>
          <Text style={{color:'#fff'}}>Delete post</Text>
        </TouchableOpacity>
      </View>

          </View>
        
        </View>
        </View> 
      
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  buttonSaveApprenant:{
    width: 320,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 10,
    backgroundColor:'#1f487e',
    //opacity:0.8,
  

  },
  editProfile: {
    flex: 1,
    alignItems: 'center',
    padding: 20

},
authBox:{
  width:'90%',
  height:'70%',
  backgroundColor:'#fafafa',
  borderRadius:20,
  marginTop:70,
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
viewTextInput:{
  alignSelf:'center',
  justifyContent: "center",
  width:'90%',
  marginBottom:20,
  marginTop:40,
  color:'#000'
},
editProfile_bottom_option: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 25
},
editProfile_bottom_option_text: {
    marginLeft: 15
},
editProfile_icon: {
    flexDirection: 'row',
    marginTop: 10
},
editProfile_icon_text: {
    marginLeft: 10,
    color: '#032468',
},
editProfile_form: {
    width: '100%',
    marginTop: 15
},
editProfile_form_text: {
    color: '#032468',
    marginTop: 10,
    fontWeight: 'bold'
},
input: {
    borderBottomWidth: 0.5,
    borderColor: '#9da5b7',

},
editProfile_update: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7d86f8',
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 20
},
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    height:90,

    
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
  marginTop:28,
  alignSelf:'center'
  
},
textInput1: {
  padding:30,
  alignSelf:'center',
  borderStartWidth : 1,
  borderLeftWidth:1,
  borderTopWidth : 1,
  borderRightWidth: 1,
  borderBottomWidth : 1,
  borderColor: "#BDBDBD",
  color:'#000',
  width:320,
  height:120
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



export default PostECDEtail