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
  Button
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import { MaterialIcons,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';


class PostECDEtail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:'',
      post: '',
      postTime: firebase.firestore.Timestamp.fromDate(new Date()),
      postImg:null,
      uploading:false,
      transferred:0,
      imageUrl:null,
    
      isLoading: true
    };
  }
 

  fetchPost (id){
    const dbRef = firebase.firestore().collection('posts').doc(id)
    dbRef.get().then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        this.setState({
          id: doc.id,
          userId: user.userId,
          post: user.post,
          postTime: user.postTime,
          postImg:user.postImg,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
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


    const updateDBRef = firebase.firestore().collection('posts').doc(this.state.id);
    updateDBRef.set({
      userId: this.state.userId,
      post: this.state.post,
      postTime: this.state.postTime,
      postImg: this.state.postImg,

    }).then((docRef) => {
      this.setState({
        id: '',
        userId: '',
        post: '',
        postTime: '',
        postImg: this.state.imageUrl,
        uploading:false,
        transferred:0,
        isLoading: true,
      });
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
    this.fetchPost(this.props.route.params.userId)
 
  
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


  deleteUser() {
    const dbRef = firebase.firestore().collection('posts').doc(this.props.route.params.userId)
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
<View style={styles.header}>

<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"} />
                 </TouchableOpacity>
                 <View style={{alignContent:'center',alignItems:'center', marginTop:35}}>
            <Text style={styles.headerTitle}>Update Post</Text>
</View>
  <Icon name="notifications-none" size={28} color={"#fff"} />
</View>



<View style={styles.centrizedView}>
      <View style={styles.box}>
          <View>

        {this.state.postImg != null ? 
        <Image 
        source={{
          uri: this.state.postImg
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
    }}/>: <Image source={require('../../assets/images/default-img.jpg')}
    
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
    />}  
       
     <ActionButton buttonColor="#05375a" style={{marginRight:45,marginBottom:-10}} >
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Take Photo"
        onPress={this.openCamera}>
        <FontAwesome5 name="camera-retro" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Choose Photo"
        onPress={this.pickImage}>
        <FontAwesome5 name="images" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
     </View>
     <View style={{ padding: 10 }}>

     <View style={styles.action}>
                <MaterialIcons
            name="post-add"
                    color="#05375a"
                    size={28}
                   
                   
                />
                <TextInput 
                 placeholder={'Post'}
                 value={this.state.post}
                 onChangeText={(val) => this.inputValueUpdate(val, 'post')}
                    style={[styles.textInput1,{marginBottom:15}]}
                    autoCapitalize="none"         
                /> 
</View>
          
      
        <View style={[styles.button,{marginTop:15,marginBottom:15}]}>
          <Button
            title='Update'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
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



export default PostECDEtail