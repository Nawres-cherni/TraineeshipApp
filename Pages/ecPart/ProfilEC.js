import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import  firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class ProfilEC extends  Component{
  constructor(props){
    super(props);
  this.state={
    user: {},
   
  };}
  unsubscribe=null;
  componentDidMount() {
    const user = firebase.auth().currentUser.uid; 


    this.unsubscribe = firebase.firestore()
    .collection("e_conventionnées")
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


    <SafeAreaView >
<View style={styles.header}>

<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
     </TouchableOpacity>
     <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

<Text style={styles.headerTitle}>Profil</Text>



</View>

</View>

<View style={styles.centrizedView}>
  <View  style={styles.authBox}>

   <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EditProfileEC")
                }}>
                  <Text style={{marginLeft:400,marginTop:-20}}>Edit</Text>

      <Image
      source={require('../../assets/images/edit_user.png')}
            style={{top:-50,marginLeft:280,width:55,height:55}}
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
    <Foundation name="torso-business"  color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.nom_soc}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="fax" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.fax}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="blender-phone" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.fix}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="web" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>{this.state.user.site}</Text>
      </View>


      <View style={styles.row}>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate("map")} >
        <Entypo name="location" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 40,marginTop:-20}}>{this.state.user.location}</Text>
        </TouchableOpacity>
      </View>
    </View>




   {/*
   <View style={styles.inputGroup}>
        <TextInput
          placeholder="lieu"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "lieu")}
          value={this.state.lieu}
        />
      </View>
 

    

 
      <View style={styles.button}>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>

        */} 
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
    marginTop:28,
    alignSelf:'center'
    
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    height:90,

    
  },
  authBox:{
    marginTop:80,
  width:'85%',
  height:'70%',
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
    //flex:1,
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop:10,
    justifyContent: 'space-between',
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
    paddingVertical:5
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
  