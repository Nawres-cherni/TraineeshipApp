//Profil Home 


import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Card,
  Alert
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableRipple } from "react-native-paper";
import { Avatar } from 'react-native-paper';
import ProfileContainer from './component/ProfileContainer';
import UserPostImageGrid from './component/UserPostImageGrid';
import { withNavigation } from 'react-navigation';
   class ProfilHome extends Component {
    constructor(props) {
      super(props)
      this.state = {
          uid: '',
          name: '',
          imageUrl: '',
          phoneno: '',
          email: '',
          website: '',
          compliments: [],
          totalLikes: 0,
          totalPost: 0,
post:0,
          requests: [],
          posts: [],
          followers: [],
          following: [],
          myPosts: [],
          phone: '',
          about: '',
          loading: true,
    postData: this.props.route.params.postData,
          
      }
  }

  componentDidMount() {
      try{console.log(this.props.route.params.uid)
      if (this.props.route.params.uid === undefined) {
          console.log('inside if')
          this.getMyPosts()
        
      }
      else {
          console.log('got uid', this.props.route.params.uid)
          this.setState({ uid: this.props.route.params.uid },
              () => this.getMyPosts())
       
      }}
      catch(error){
        Alert.alert('Error',error.message)
          console.log(error)  
      }
  }

  getUid = async () => {
      try{let myid = await firebase.auth().currentUser.uid
      this.setState({ uid: myid }, () => this.getUserData())}
      catch(error){
        Alert.alert('Error',error.message)
          console.log(error)  
      }
  }

  getUserData = () => {
     try{ console.log('inside userdata', this.state.uid)
      firebase.firestore().collection('e_conventionnées').doc(this.state.uid)
          .onSnapshot((snap) => {
             
              console.log(snap.data())
              this.getMyPosts()
          })}
          catch(error){
            Alert.alert('Error',error.message)
              console.log(error)  
          }

  }

  getMyPosts = () => {
      try{console.log('uid=>>>>>>>>>',this.props.route.params.userId)
      firebase.firestore().collection('posts').where('userId', '==',this.props.route.params.userId).get()
          .then((posts) => {

              let p = []
              let likes = 0
              posts.docs.map((post) => {
                  p.push({ ...post.data(), ...{ postId: post.id } })
                  likes += post.data().likes.length
              })
              this.setState({ myPosts: p, totalLikes: likes, loading: false }, () => console.log(this.state.myPosts))
          })}
          catch(error){
            Alert.alert('Error',error.message)
              console.log(error)  
          }
  }

  signout = () => {

      firebase.auth().signOut()
  }

  render() {
      switch (this.state.loading) {
          case false:
              return (
                  <View  style={{ flex: 1,backgroundColor:'#FFF' }}>
            <View style={styles.header}>

            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
                 </TouchableOpacity>
                 <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
           
            <Text style={styles.headerTitle}>Posts</Text>
           
           
      
          </View>
        
</View>
                    
        <View style={styles.profileScreen} >
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
                              <ProfileContainer
                                 imageUrl={this.state.postData.imageUrl}
                                  uid={firebase.auth().currentUser.uid}
                                  name={this.state.postData.nom_soc}
                                  nom_res={this.state.postData.nom_res}
                                  email={this.state.postData.email}
                                  fax={this.state.postData.fax}
                                  fix={this.state.postData.fix}
                                  site={this.state.postData.site}
                                  location={this.state.postData.location}
                                navigation={this.props.navigation}
                                 // followers={this.state.followers}
                                 // following={this.state.following}
                                  posts={this.state.postData.myPosts}
                                  totalLikes={this.state.totalLikes}
                                  totalPosts={this.state.postData.post.length}
                                 // website={this.state.website}
                                  propsid={this.props.route.params.uid}
                              //    about={this.state.about}
                                  myprofile={this.state.uid === firebase.auth().currentUser.uid}
                               //   requests={this.state.requests}
                                //  compliments={this.state.compliments}
                              />
                            
                          </View>
               
                          <UserPostImageGrid
                              userName={this.state.nom_soc}
                             userIconUrl={this.state.iconUrl}
                              myPosts={this.state.myPosts}
                             navigation={this.props.navigation}
                          />
                   
            </View>            
                         
            
                     
                  </View>
              );
          default:
              return <View style={styles.loading} >
                 
              </View>
      }
  }
}
export default withNavigation(ProfilHome);
const styles = StyleSheet.create({
  profileScreen: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: '#FFF'

  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    height:90,

    
  },

  inputContainer1: {
    height: 425,
    width: 350,
    marginTop:-150, 
    alignItems: 'center',
    elevation:15,
    shadowColor:'#1f487e',
   marginLeft:-10
  },
  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:28
    
  },
  loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF'
  },
  fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: '#23395D'
  },
})