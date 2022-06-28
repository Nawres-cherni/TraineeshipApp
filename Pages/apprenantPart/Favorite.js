import React, { Component } from "react";
import {
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Text,
    StyleSheet
} from "react-native";
import { StatusBar } from 'expo-status-bar';


import PostCard from "./component/PostCard";

import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar, TouchableRipple } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
let onEndReachedCalledDuringMomentum = false;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const {width} = Dimensions.get('screen');
export default class Favorite extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uid: firebase.auth().currentUser.uid,
            isLoading: null,
            moreLoading: null,
            lastDoc: [],
            posts: [],
            myFlollowing: [],
            Quote:'Loading...',
            Author:'Loading...',
            user: {},
            postLikes:this.props.likes
        }
    }

    

    componentDidMount() {
    
        this.getposts();
  
    }
   
    
  

    getposts = async () => {

        this.setState({ isLoading: true });

        const snapshot = await firebase.firestore().collection('posts').orderBy('postTime', 'desc')
     //   .where('likes', '==',this.state.postLikes)
        .get();

        if (!snapshot.empty) {
            let newPosts = [];

            this.setState({ lastDoc: snapshot.docs[snapshot.docs.length - 1] });

            for (let i = 0; i < snapshot.docs.length; i++) {
                let userData = {}
                console.log(snapshot.docs[i].data().userId)

              
                    firebase.firestore().collection('e_conventionnées').doc(snapshot.docs[i].data().userId).get()
                        .then(snap => userData = snap.data())
                        .then(() => {
                            newPosts.push({ ...snapshot.docs[i].data(), ...userData, ...{ postId: snapshot.docs[i].id } });
                        })
                

            }

            


            this.setState({ posts: newPosts })
        } 
        setTimeout(() => this.setState({ isLoading: false }), 1200)

    }

  
  
    

    onRefresh = () => {
        setTimeout(() => {
            this.getposts();
        }, 1000);
    }

    renderFooter = () => {
        if (!this.state.moreLoading) return true;

        return (
            <ActivityIndicator
                size='large'
                color={'#D83E64'}
                style={{ marginBottom: 10 }}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#FFF' }}>
                <StatusBar barStyle="light-content" backgroundColor="#1f487e" />  
             <View style={style.header}>

<TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
<Icon name="sort" size={28} color={"#fff"} style={{marginTop:10}} />
                 </TouchableOpacity>
                 <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
           
            <Text style={style.headerTitle}>Favorite</Text>
           
           
      
          </View>
        

</View>
<ScrollView 
  refreshControl={
    <RefreshControl
        refreshing={this.state.isLoading}
        onRefresh={this.onRefresh}
    />
}
>
        <View
          style={{
            backgroundColor: "#1f487e",
            height: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,           
            elevation: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
          }}>
    
        </View>       





    
<View>
      
               <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={this.state.posts}
                    keyExtractor={item => item.postTime.toString()}
                    renderItem={({ item }) =>
                  <View>
                      <TouchableRipple
                    onPress={() => this.props.navigation.push('appProfilEC', { postData: item,userId:item.userId,post:item.post
                        
                    
                    })}
                    borderless={true}

                >

                      <PostCard
                    
                            userName={item.nom_soc}
                            userIconUrl={item.imageUrl}
                            postId={item.postId}
                            userId={this.state.uid}
                            postImageUrl={item.postImg}
                            postDescription={item.post}
                            postTime={item.postTime}
                            postLikes={item.likes}
                            postComments={item.comments}
                           
                        />
                        </TouchableRipple>                     
                         </View>
                    
                }
                ListFooterComponent={this.renderFooter}
              
                initialNumToRender={2}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
              

                ListEmptyComponent={<View style={{alignItems:'center',justifyContent:'center'}} >
               <Text>Loading..</Text>
            </View>}

                />

</View>       
        
      
 
      </ScrollView>     
    </View>
  
  );
        
    }
}

const style = StyleSheet.create({
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
      width: '95%',
      backgroundColor: "#fff",
      borderRadius: 10,
      position: 'absolute',
      top: 80,
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