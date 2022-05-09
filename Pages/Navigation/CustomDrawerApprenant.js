import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class  CustomDrawerApprenant  extends  Component{
  constructor(props){
    super(props);
  this.state={
    user: {}
  };}
  unsubscribe=null;
  componentDidMount() {
    const user = firebase.auth().currentUser.uid; 


    this.unsubscribe = firebase.firestore()
    .collection("apprenants")
    .doc(user)
    .onSnapshot(doc =>{
      this.setState({user: doc.data()});
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }



  userSignOut (){
     firebase.auth().signOut()

    .then(() =>  this.props.navigation.replace('login'))
    .catch((error)=>{
        console.log(error)  
    })
     }
     openConfirmationAlert  () {
      Alert.alert(
        "Sign Out",
        "Are you sure?",
        [
          { text: "Yes", onPress: () => this.userSignOut() },
          { text: "No", onPress: () => console.log("canceled") },
        ],
        {
          cancelable: true,
        }
      );
      
    };
     
  render(){
    return (
      <SafeAreaView style={{flex: 1}}>
          <View
          style={{backgroundColor:'#1f487e',width:"100%"}}>
            <Image
             source={{uri : this.state.user.imageUrl}}
              style={{height: 80, width: 80,borderRadius: 40, marginBottom: 10}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                
                marginBottom: 15,
              }}>
           {this.state.user.name}
            </Text>
           
          </View>
          <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerContentScrollView
          {...this.props}
          drawerContent={props => <CustomDrawerApprenant {...props}/>} 
          >
            <DrawerItemList {...this.props} />
      
        </DrawerContentScrollView>
        </View>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableOpacity onPress={() => this.openConfirmationAlert()} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  
                  marginLeft: 5,
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
};

