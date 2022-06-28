//Home Ec ta3 video 
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

import ECPostCard from './components/ECPostCard';
import { Avatar,TouchableRipple } from "react-native-paper";

import  firebase from 'firebase';
import 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('screen');
let onEndReachedCalledDuringMomentum = false;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeEC extends Component {

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
            chats: [],
            bgColor: '#FFF'
        }
    }

    

    componentDidMount() {
        let chatData = []
        const user = firebase.auth().currentUser.uid; 
        this.unsubscribe = firebase.firestore()
        .collection("e_conventionnées")
        .doc(user)
        .onSnapshot(doc =>{
          chatData = doc.data().chats
          this.setState({user: doc.data(),chats: chatData, bgColor: doc.data().bgColor,});
        });
        this.getposts();
        this.randomQuote();

    }
    
    componentWillUnmount(){
        this.unsubscribe();
      }

    getposts = async () => {

       // this.setState({ isLoading: true });

        const snapshot = await firebase.firestore().collection('posts').orderBy('postTime', 'desc').limit(10).get();

        if (!snapshot.empty) {
            let newPosts = [];

            this.setState({ lastDoc: snapshot.docs[snapshot.docs.length - 1] });

            for (let i = 0; i < snapshot.docs.length; i++) {
                let userData = {}
                console.log(snapshot.docs[i].data().userId)

                if (snapshot.docs[i].data().userId === firebase.auth().currentUser.uid) {
                    firebase.firestore().collection('e_conventionnées').doc(snapshot.docs[i].data().userId).get()
                        .then(snap => userData = snap.data())
                        .then(() => {
                            newPosts.push({ ...snapshot.docs[i].data(), ...userData, ...{ postId: snapshot.docs[i].id } });
                        })
                    }
    
                }
    
    
    
                this.setState({ posts: newPosts })
            } else {
                this.setState({ lastDoc: null })
            }
            setTimeout(() => this.setState({ isLoading: false }), 1200)
    
        }

  


        randomQuote = () => {
            this.setState({ isLoading:true });
          
            fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
              // console.log(result.content);
            this.setState({ Quote:result.content });
            this.setState({ Author:result.author });
            this.setState({ isLoading:false });
    
            
            })
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
           
            <Text style={style.headerTitle}>Accueil</Text>
           
           
      
          </View>
          <Avatar.Image size={45}     source={{uri : this.state.user.imageUrl}} style={{marginTop:10}} />
  
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
         <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
       

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
          {this.state.Quote}
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
          —— {this.state.Author}
        </Text>

      </View>

      </View>
     
        </View>       



        <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
 <View>
          <View>
          
         
        </View>
        <View>
         
        </View>
        </View>
   
      </ScrollView>


      <View style={style.sectionTitle1}> 
<View>
          <Text style={[style.sectionTitle,{marginTop:45}]}>Accueil</Text>
     

               <FlatList
                  vertical
                  showsVerticalScrollIndicator={false}
                  data={this.state.posts}
                  keyExtractor={item => item.postTime.toString()}
                  renderItem={({ item }) =>


 /* <TouchableRipple
                    onPress={() => this.props.navigation.push('ecDetail', { postData: item,postId:item.postId
                        ,post:item.post,postImg:item.postImg })}
                    borderless={true}

                >
                       */



                        <ECPostCard
                            userName={item.nom_soc}
                            userIconUrl={item.imageUrl}
                            postId={item.postId}
                            userId={this.state.uid}
                            postImg={item.postImg}
                            post={item.post}
                            postTime={item.postTime}
                            postLikes={item.likes}
                            postComments={item.comments}
                            navigation={this.props.navigation}

                            

                            
                        />
                       /* 
                       </TouchableRipple>
                       */
                    }
                    ListFooterComponent={this.renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.onRefresh}
                        />
                    }
                    initialNumToRender={2}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
                   

                    ListEmptyComponent={<View style={{alignItems:'center',justifyContent:'center'}} >
                   
                </View>}

                />

</View>       
        
      
</View>  
      </ScrollView>   
      <View style={{marginBottom:50}}>
        </View>  
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