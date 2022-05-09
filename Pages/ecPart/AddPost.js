import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const AddPost = (props) => {
    const [imageUrl, setimageUrl] = useState();
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);
    const navigation = useNavigation();
    const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
    const submitPost = async () => {
        const user = firebase.auth().currentUser.uid; 
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', post);
    
        firebase.firestore()
        .collection('posts')
        .add({
          userId: user,
          post: post,
          postImg: imageUrl,
          postTime: firebase.firestore.Timestamp.fromDate(new Date()),
          likes: null,
          comments: null,
        })
        .then((result) => {
          console.log(result) 

          Alert.alert(  
            'Success',  
            'Add Post is Success',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>  navigation.replace("homeEc")},  
            ]  
        );  
          setPost(null);
        })
        .catch((error) => {
          console.log('Something went wrong with added post to firestore.', error);
        });
      }   
  


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
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
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


  return (
    <View style={styles.container}>

<View style={styles.header1}>
<TouchableOpacity onPress={()=>navigation.openDrawer()}>
      <Icon name="sort" size={28} color={"#fff"} />
                       </TouchableOpacity>
                 <Text style={styles.headerTitle}>Add post</Text>
                 <Icon name="notifications-none" size={28} color={"#fff"} />
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
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>

<View style={styles.centrizedView}>
<ScrollView>

  <View  style={styles.authBox}>
      
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>


                      <ImageBackground source={require('../../assets/images/default-img.jpg')} resizeMode="cover" style={{width:150,height:150,marginTop:200,alignSelf:'center',marginBottom:110}}>
{imageUrl != null ? <Image source={{uri: imageUrl}}  
    style={{width:150,height:150}}/> : null}  
</ImageBackground>
            </View>
          </TouchableOpacity>

<View style={styles.viewTextInput}>
<TextInput
      style={styles.textInput}
        placeholder="Add Post"
        multiline = {true}
        numberOfLines = {3}
        value={post}
        onChangeText={(content) => setPost(content)}
      />
</View>
   
      {uploading ? (
        <View>
          <Text>{transferred} % Completed!</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
     
        <View style={styles.buttonSaveApprenant}>
        <TouchableOpacity onPress={() => submitPost()}>
          <Text style={{color:'#fff'}}>Add post</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  
    

</View>
</ScrollView>

</View>
      </Animated.View>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:80
  },
  centrizedView:{
    width:'100%',
  
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
    marginBottom:90

  },
  viewTextInput:{
    alignSelf:'center',
    justifyContent: "center",
    width:'90%',
    marginBottom:20,
    marginTop:40,
    color:'#000'
  },
  textInput: {
padding:20,
marginTop:50,
borderStartWidth : 1,
borderLeftWidth:1,
borderTopWidth : 1,
borderRightWidth: 1,
borderBottomWidth : 1,
borderColor: "#BDBDBD",
color:'#000'
  },


  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:20
  },
  header1: {
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
  authBox:{
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
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#1f487e',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    marginBottom:80
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },

});