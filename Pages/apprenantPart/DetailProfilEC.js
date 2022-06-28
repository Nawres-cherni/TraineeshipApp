import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'
import { Avatar, TouchableRipple } from 'react-native-paper';

export default class DetailProfilEC extends Component {
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
  userId: this.props.route.params.userId,
  name: this.props.route.params.userName,
  nom_res: this.props.route.params.nom_res,
  imageUrl: this.props.route.params.imageUrl,
  email: this.props.route.params.email,
  fax: this.props.route.params.fax,
  fix: this.props.route.params.fix,
  site: this.props.route.params.site,
  location: this.props.route.params.location,



        
    }
}






render(){
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.header}>

<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
     </TouchableOpacity>
     <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

<Text style={styles.headerTitle}>Profil de Socete Detaille</Text>



</View>

</View>
<ScrollView>
<View style={{alignContent:'center',alignItems:'center'}}>

<Image
style={styles.userImg}
source={{uri: this.state.imageUrl ? this.state.imageUrl || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' :
'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}


/>
<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<Foundation name="torso-business"  color="#777" size={25} style={{marginLeft:150}} />
<Text style={[styles.userName,{marginLeft:-320,marginTop:-5}]}>{this.state.name}</Text>
</View>
<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<FontAwesome5 name="user-circle" color="#777" size={25} style={{marginLeft:150}} />
<Text style={[styles.userName,{marginLeft:-320,marginTop:-5}]}>{this.state.nom_res} </Text>
</View>

<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<FontAwesome name="envelope" color="#777" size={25} style={{marginLeft:150}} />
<Text style={[styles.userName,{marginLeft:-320,marginTop:-5}]}>{this.state.email}</Text>
</View>

<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<FontAwesome5 name="fax" color="#777" size={25} style={{marginLeft:150}} />
<Text style={[styles.userName,{marginLeft:-320,marginTop:-5}]}>{this.state.fax}</Text>
</View>


<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<FontAwesome5 name="blender-phone" color="#777" size={25} style={{marginLeft:150}} />
<Text style={[styles.userName,{marginLeft:-320,marginTop:-5}]}>{this.state.fix}</Text>
</View>


<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<MaterialCommunityIcons name="web" color="#777" size={25} style={{marginLeft:150}} />
<Text style={[styles.userName,{marginLeft:-310,marginTop:-5}]}>{this.state.site}</Text>
</View>

<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>
<Entypo name="location"  color="#777" size={25}  style={{color:"#777777", marginLeft: 320}}/>
<TouchableOpacity onPress={()=> this.props.navigation.navigate("map")} >
<Text style={{color:"#777777", marginLeft: -310, fontSize: 18,fontWeight: 'bold',  color:'#000' ,marginTop:-10 }}>
{this.state.location} </Text>
</TouchableOpacity>
</View>




<View style={{borderWidth:1,  borderColor:'#F2F2F2',width:'90%'}} />
<View style={styles.row}>

<View >
<Text style={[styles.userName,{marginTop:-5,fontSize:15 ,marginStart:10,}]}>

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
standard dummy text ever since the 1500s, when an unknown printer took a galley 

</Text>
</View>

</View>

{/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}

</View>
</ScrollView>


</SafeAreaView>
);
};
}


const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
padding: 20,
},
headerTitle: {
color: "#fff",
fontWeight: 'bold',
fontSize: 18,
marginTop:20
},

row: {
flexDirection: 'row',
marginTop: 20,
marginBottom: 20,
//marginLeft:-70
},
header: {
  paddingVertical: 20,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: "#1f487e",
  height:90,

  
},
inputContainer: {
height: 500,
width: '90%',
marginTop:10,
top:25,
backgroundColor:'#fff',
borderRadius: 10,
//paddingHorizontal: 40,
alignItems: 'center',
elevation: 12,
shadowColor:'#1f487e',
shadowOffset: {
width: 0,
height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,
alignSelf:'center'
},
userImg: {
height: 150,
width: 150,
borderRadius: 75,
marginTop:35,
marginBottom:20,
borderColor:'#000',
borderWidth:1

},
userName: {
fontSize: 18,
fontWeight: 'bold', 
// color:'#1f487e' 
color:'#000'   

},
aboutUser: {
fontSize: 12,
fontWeight: '600',
color: '#666',
textAlign: 'center',
marginBottom: 10,
},
userBtnWrapper: {
flexDirection: 'row',
justifyContent: 'center',
width: '100%',
marginBottom: 10,
},
userBtn: {
borderColor: '#2e64e5',
borderWidth: 2,
borderRadius: 3,
paddingVertical: 8,
paddingHorizontal: 12,
marginHorizontal: 5,
},
userBtnTxt: {
color: '#2e64e5',
},
userInfoWrapper: {
flexDirection: 'row',
justifyContent: 'space-around',
width: '100%',
marginVertical: 20,
},
userInfoItem: {
justifyContent: 'center',
},
userInfoTitle: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 5,
textAlign: 'center',
},
userInfoSubTitle: {
fontSize: 12,
color: '#666',
textAlign: 'center',
},
});