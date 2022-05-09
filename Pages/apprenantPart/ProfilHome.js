//Profil Home 


import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Card
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostCard from './component/PostCard';

const ProfilHome = ({navigation, route}) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);


  const fetchPosts = async () => {
    try {
      const list = [];
  

      const user = firebase.auth().currentUser; 
      await firebase.firestore()
        .collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              imageUrl:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);
      if (loading) {
        setLoading(false);
      }
      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async() => {
 
    const user = firebase.auth().currentUser;
    await firebase.firestore()
    .collection('e_conventionnées')
    .doc(route.params ? route.params.userId : user.uid)
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
    fetchPosts();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  const handleDelete = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.header}>

<TouchableOpacity onPress={()=>navigation.openDrawer()}>
<Icon name="sort" size={28} color={"#fff"} />
                 </TouchableOpacity>
                 <Text style={styles.headerTitle}>Detail Posts</Text>
  <Icon name="notifications-none" size={28} color={"#fff"} />
</View>
<View ></View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
          <Image
          style={styles.userImg}
          source={{uri: userData ? userData.imageUrl || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' :
           'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />
        <Text style={styles.userName}>{userData ? userData.nom_soc || 'Test' : 'Test'}</Text>
       
         {/*<Text>{route.params ? route.params.userId : user.uid}</Text>*/}
         <View  style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
         {posts.map((item) => (
<TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('appDetailProfilEC', { userId: item.userId})}>
  <Text style={styles.userBtnTxt}>Voir Profil Detail</Text>
</TouchableOpacity>
         ))}
     
     <TouchableOpacity style={styles.userBtn}>
   <Text style={styles.userBtnTxt}>Contacter</Text>
   </TouchableOpacity>
   </View>




        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
        </View>
        </View>
        <View style={styles.inputContainer1}>
        {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
          
        ))}
        </View>
        <View style={{marginBottom:150}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer1: {
    height: 425,
    width: 350,
    marginTop:20, 
    //borderRadius: 10,
    //paddingHorizontal: 20,
    alignItems: 'center',
    elevation:15,
    shadowColor:'#1f487e',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
  },
  inputContainer: {
    height: 320,
    width: '100%',
    marginTop:10,
    top:-25,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
    shadowColor:'#1f487e'
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
    height:90,
    borderBottomLeftRadius:45,
    borderBottomRightRadius:45,
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 75,
    marginTop:20
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
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