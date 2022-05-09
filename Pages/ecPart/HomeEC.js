//HomeEC
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import  firebase from 'firebase';
import 'firebase/storage';
import ECPostCard from './components/ECPostCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddPost from './AddPost';
import CustomSwitch from './components/CustomSwitch';
const {width} = Dimensions.get('screen');
const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../../assets/images/1.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../../assets/images/edit_user.png'),
      liked: true,
      likes: '14',
      comments: '5',
    },]
const HomeEC = ({navigation}) => {
    const [deleted, setDeleted] = useState(false);
    const [Quote, setQuote] = useState('Loading...');
    const [Author, setAuthor] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [gamesTab, setGamesTab] = useState(1);

    const onSelectSwitch = value => {
      setGamesTab(value);
    };
  

    const randomQuote = () => {
      setIsLoading(true);
      fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      })
    }
    const fetchPosts = async () => {
        try {
          const list = [];
    
          await firebase.firestore()
            .collection('posts')
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
                  userImg:
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
  
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
      
      useEffect(() => {
        fetchPosts();
      }, []);
    
      
      useEffect(() => {
        fetchPosts();
        setDeleted(false);
        randomQuote();
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
      }, [deleted]);
    
      const handleDelete = (postId) => {
        Alert.alert(
          'Delete post',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => deletePost(postId),
            },
          ],
          {cancelable: false},
        );
      };
      const deletePost = (postId) => {
        console.log('Current Post Id: ', postId);
    
        firebase.firestore()
          .collection('posts')
          .doc(postId)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              const {postImg} = documentSnapshot.data();
    
              if (postImg != null) {
                const storageRef = firebase.storage().refFromURL(postImg);
                const imageRef = firebase.storage().ref(storageRef.fullPath);
    
                imageRef
                  .delete()
                  .then(() => {
                    console.log(`${postImg} has been deleted successfully.`);
                    deleteFirestoreData(postId);
                  })
                  .catch((e) => {
                    console.log('Error while deleting the image. ', e);
                  });
                // If the post image is not available
              } else {
                deleteFirestoreData(postId);
              }
            }
          });
      };
    

      const deleteFirestoreData = (postId) => {
        firebase.firestore()
          .collection('posts')
          .doc(postId)
          .delete()
          .then(() => {
            Alert.alert(
              'Post deleted!',
              'Your post has been deleted successfully!',
            );
            setDeleted(true);
          })
          .catch((e) => console.log('Error deleting posst.', e));
      };

      if (initializing) return null;
      const ListHeader = () => {
        return null;
      };
  return (
    <SafeAreaView style={{flex: 1}}>
 <View style={style.header}>

<TouchableOpacity onPress={()=>navigation.openDrawer()}>
<Icon name="sort" size={28} color={"#fff"} />
                 </TouchableOpacity>
 
  <Icon name="notifications-none" size={28} color={"#fff"} />
</View>
<ScrollView>
<View
          style={{
            backgroundColor: "#1f487e",
            height: 60,
            paddingHorizontal: 20,
            borderBottomLeftRadius:45,
            borderBottomRightRadius:45,
            paddingHorizontal:20,
           
          }}>
          <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
            <Text style={style.headerTitle}>Welcome {user.email}</Text>
            <Text style={style.headerTitle}>Accueil</Text>
           
           
            <View
        style={style.inputContainer}>
           <Text
          style={{        
            fontSize: 18,
            fontWeight: '200',
            color: '#001845',
          marginTop:-170,
          marginLeft:80
           
          }}>
          Quote of the Day
        </Text>
          <View style={{marginLeft:-240}}>
          </View>
        <FontAwesome5
          name="quote-left"
          style={{
           // fontSize: 20,
             marginBottom: 100}}
          color="#000"
        />
        <Text
          style={{
            color: '#000',
            //fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            fontWeight: '400',
            textAlign: 'center',
           // marginBottom: 10,
            //paddingHorizontal: 30,
          }}>
          {Quote}
        </Text>
        <FontAwesome5
          name="quote-right"
          style={{
            //fontSize: 20,
            textAlign: 'right',
            marginTop: -20,
            marginBottom: -100,
          }}
          color="#000"
        />
        <Text
          style={{
            textAlign: 'right',
            fontWeight: '300',
            fontStyle: 'italic',
            fontSize: 16,
            color: '#000',
            marginTop:180,
            marginLeft:-200
          }}>
          —— {Author}
        </Text>

      </View>
          </View>
        </View>
    {loading ? (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 60, height: 60, borderRadius: 50}} />
            <View style={{marginLeft: 20}}>
              <View style={{width: 120, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
              />
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
            />
            <View
              style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
            />
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 60, height: 60, borderRadius: 50}} />
            <View style={{marginLeft: 20}}>
              <View style={{width: 120, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
              />
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
            />
            <View
              style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
            />
          </View>
        </View>
      </ScrollView>
    ) : (
      <View> 
      <View  style={style.sectionTitle1}></View>
      <Text style={[style.sectionTitle,{marginTop:45}]}>Accueil</Text>
     

   

      
      <FlatList
          data={posts}
          renderItem={({item}) => (
            <ECPostCard            
              item={item}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('ecDetail', { userId: item.id,})
                }
            />
        
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}
        />



       </View>
      
    
   
    )}
    <View style={{marginBottom:190}}></View>
    </ScrollView>
  </SafeAreaView>
  )
}
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    
  },
  inputContainer2: {
    height: 320,
    width: 200,
    marginTop:10,
    top:-25,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
    shadowColor:'#1f487e'
  },
  inputContainer1: {
    height: 425,
    width: 350,
    marginTop:20, 
    alignItems: 'center',
    elevation:15,
    shadowColor:'#1f487e',
   marginLeft:-10
  },
  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    
  },
  itemContainer: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 16,
    height:192,
    width:450,
    marginLeft:-10,
    //marginRight:40,
    //justifyContent: 'center',
    marginBottom: 20,
    shadowColor:'#000',
    marginTop:20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  inputContainer: {
    height: 220,
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    position: 'absolute',
    top: 150,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: "#e1e8e9",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle1: {
    marginTop:280,
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default HomeEC