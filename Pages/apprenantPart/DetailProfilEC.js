import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'


const DetailProfilEC = ({navigation, route}) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);



  const getUser = async() => {
    const user = firebase.auth().currentUser; 
    await firebase.firestore()
    .collection('e_conventionnées')
    .doc( route.params ? route.params.userId : user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, [navigation, loading]);


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
              <View style={styles.header}>

              <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginTop:10}}>
<Icon name="chevron-left" size={28} color={"#fff"} />
                 </TouchableOpacity>
                 <Text style={styles.headerTitle}>Detail Profil d'Entreprise</Text>
  <Icon name="notifications-none" size={28} color={"#fff"} />
</View>
   
           <View style={styles.inputContainer}>
        <Image
          style={styles.userImg}
          source={{uri: userData ? userData.imageUrl || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />

        <View style={styles.row}>
        <Foundation name="torso-business"  color="#777" size={18} style={{marginLeft:-120}} />
        <Text style={[styles.userName,{marginStart:10,marginTop:-5}]}>{userData ? userData.nom_soc || 'Test' : 'Test'} </Text>
        </View>
       
        <View style={styles.row}>
        <FontAwesome5 name="user-circle" color="#777" size={18} style={{marginLeft:-120}} />
        <Text style={[styles.userName,{marginStart:10,marginTop:-5}]}>{userData ? userData.nom_res || 'Test' : 'Test'} </Text>
        </View>
       

        <View style={styles.row}>
        <FontAwesome name="envelope" color="#777" size={18} style={{marginLeft:-70}} />
        <Text style={[styles.userName,{marginStart:10,marginTop:-5}]}>{userData ? userData.email || 'Test' : 'Test'} </Text>
        </View>
       

        <View style={styles.row}>
        <FontAwesome5 name="fax" color="#777" size={18} style={{marginLeft:-100}} />
        <Text style={[styles.userName,{marginStart:10,marginTop:-5}]}>{userData ? userData.fax || 'Test' : 'Test'} </Text>
        </View>
       


        <View style={styles.row}>
        <FontAwesome5 name="blender-phone" color="#777" size={18} style={{marginLeft:-100}} />
        <Text style={[styles.userName,{marginStart:10,marginTop:-5}]}>{userData ? userData.fax || 'Test' : 'Test'} </Text>
        </View>
       


        <View style={styles.row}>
        <MaterialCommunityIcons name="web" color="#777" size={18} style={{marginLeft:-120}} />
        <Text style={[styles.userName,{marginStart:10,marginTop:-5}]}>{userData ? userData.site || 'Test' : 'Test'} </Text>
        </View>
       

        <View style={styles.row}>
        <TouchableOpacity onPress={()=> navigation.navigate("map")} >
        <Entypo name="location"  color="#777" size={18}  style={{color:"#777777", marginLeft: -120,marginTop:-10}}/>
        <Text style={{color:"#777777", marginLeft: -90, fontSize: 18,fontWeight: 'bold',  color:'#000' ,marginTop:-20 }}>{userData ? userData.location || 'Test' : 'Test'} </Text>
        </TouchableOpacity>
        </View>
       
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
    
        </View>
    
    </SafeAreaView>
  );
};

export default DetailProfilEC;

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
    marginTop: 10,
    marginBottom: 10,
    marginLeft:-70
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    height:90,
    borderBottomLeftRadius:45,
    borderBottomRightRadius:45,
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
   marginTop:20,
   borderColor:'#777'
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