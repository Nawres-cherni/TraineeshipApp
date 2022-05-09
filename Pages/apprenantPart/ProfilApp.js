import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialIcons';
import  firebase from 'firebase';
export default class ProfilApp extends  Component{
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



  render(){
  return(



    <SafeAreaView style={styles.container}>

<View style={styles.header}>
<TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
      <Icon name="sort" size={28} color={"#fff"} />
                       </TouchableOpacity>
                 <Text style={styles.headerTitle}>Profil</Text>
                 <Icon name="notifications-none" size={28} color={"#fff"} />
</View>


<View style={styles.centrizedView}>
  <View  style={styles.authBox}>

   <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EditProfile")
                }}>
                  <Text style={{marginLeft:400,marginTop:-20}}>Edit</Text>

      <Image
      source={require('../../assets/images/edit_user.png')}
            style={{top:-60,marginLeft:300,width:55,height:55}}
          />  

              </TouchableOpacity>
    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row',marginTop:-50}}>
        <Avatar.Image 
        source={
          // this.state.user.imageUrl
           //? 
           {uri : this.state.user.imageUrl}
          // : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
         
         }
          size={80}
        />
        <View style={{marginLeft: 20}}>
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
          }]}>{this.state.user.name}</Title>
          <Caption style={styles.caption}>{this.state.user.email}</Caption>
        </View>
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <FontAwesome5 name="id-card" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.cin}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="phone-alt" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.phone}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="user-lock" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.password}</Text>
      </View>
    </View>

    

    <View style={styles.menuWrapper}>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Ionicons name="heart" color="#FF6347" size={25}/>
          <Text style={styles.menuItemText}>Your Favorites</Text>
        </View>
      </TouchableRipple>
      </View>
      </View>
      </View>

  </SafeAreaView>









  )
}
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

  authBox:{
  width:'90%',
  height:'90%',
  backgroundColor:'#fafafa',
  borderRadius:20,
  alignSelf:'center',
  paddingHorizontal:14,
  paddingBottom:30,
  shadowColor:'#1f487e',
  shadowOffset:{
    width:0,
    height:2
  },
  shadowOpacity:0.25,
  shadowRadius:3.84,
  elevation:10,
  marginTop:-40
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
  });
  