import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Linking,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from "react-native";
import { Avatar } from 'react-native-paper';
import firebase from 'firebase'
import { TouchableRipple } from "react-native-paper";
import UserListItem from "./UserListItem";

const ProfileSection = ({ count, title }) => {
    return (
        <View style={styles.profile__section}>
            <View style={{ marginLeft: 5, alignItems: 'center' }}>
                <Text style={[styles.profile__sectionText, { color: '#303233', fontWeight: 'bold' }]}>{count}</Text>
                <Text style={styles.profile__sectionText}>{title}</Text>
            </View>
        </View>
    );
}

const ProfileContainer = ({ post, name, imageUrl,email,
    fax,
    fix,
    site,
    location

    ,totalLikes,totalPost, myprofile,totalPosts, nom_res,   propsid, navigation }) => {

    const [loading, setLoading] = useState(false);
    const uid=firebase.auth().currentUser.uid
    const user=firebase.auth().currentUser.uid
    const [chatId, setchatId] = useState('');
    const [bgColor, setbgColor] = useState('#FFF');

useEffect(()=>{
    getMessages()
})


    const getMessages = () => {
       
        let data = []
        firebase.firestore().collection('apprenants').doc(firebase.auth().currentUser.uid).onSnapshot((snap) => {
            data = snap.data().chats
            //this.setState({ bgColor: snap.data().bgColor })
            if (data.length) {
                console.log('chats =>>>>', data)
                getLastMessage(data)
            }
            
        })
      }
 const     getLastMessage = (data) => {
        let chats = data
        chats.map((chat) => {
            firebase.firestore().collection('chats').doc(chat.chatId).onSnapshot((snap) => {
                if (typeof snap.data().messages !== 'undefined') {
                    console.log(chat.chatId, snap.data())
                    chat['lastMessage'] = snap.data().messages[snap.data().messages.length - 1].message
                    chat['seen'] = snap.data().messages[snap.data().messages.length - 1].seen
                    chat['blocked'] = snap.data().blocked
                    chat['blockId'] = snap.data().blockId
                    chat['typing'] = snap.data().typing
                }
                if (chats.indexOf(chat) === chats.length - 1) {
                   getMessageData(chats)
                }
            })
        })
      }


     const getMessageData = (data) => {
        let userData = []
        data.map(async (d) => {
            await firebase.firestore().collection('apprenants').doc(d.uid).get()
                .then((snap) => {
                    userData.push({
                        name: snap.data().name,
                        uid: d.uid,
                        imageUrl: snap.data().imageUrl,
                        lastMessage: d.lastMessage,
                        seenUid: d.uid,
                        chatId: d.chatId,
                        blocked: d.blocked,
                        blockId: d.blockId,
                        typing: d.typing
                    })
                })
         
        })
      }

   const   navigateToChat = (data) => {
 
        let found = false
      //  let finduid = data.uid
        let chatId = undefined
        let blocked = false
  

        if (found) {
            console.log('found', chatId)
            navigation.push('ChatApp', { name:name, imageUrl:imageUrl, uid:uid, chatId: chatId, typing: [], bgColor:bgColor })
       
       
       
        }
        else {
            console.log('not found',chatId)
          navigation.push('ChatApp', { name:name, imageUrl:imageUrl, uid:uid, typing: [], bgColor: bgColor })
        }
    }
           
    return (
        <View
            style={styles.profile}
        >
          <View style={styles.profile_top} >
            <View style={{marginLeft:100,marginTop:20}}>
            <Avatar.Image size={80} source={{ uri: imageUrl }}  />
                </View>          

                <View style={{ flex: 0.8, alignItems: 'center' ,marginLeft:-110}} >
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#303233', marginTop: 5 }}>{name}</Text>
                    <Text style={{ fontSize: 12, color: '#9da5b7' }}>{nom_res}</Text>

                
                </View>
            </View>
            <View style={styles.profile_about}>
            <View  style={{ flexDirection: "row" , justifyContent: 'space-evenly',alignContent:'center',alignItems:'center' }}>
      
<TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('appDetailProfilEC',
 { userId: user.userId,
 userName: name,
 nom_res: nom_res,
 imageUrl:imageUrl,
 email:email,
 fax:fax,
 fix:fix,
 site:site,
 location:location,




 
 })}>
  <Text style={styles.userBtnTxt}>Voir Profil Detail</Text>
</TouchableOpacity>
<TouchableOpacity
                                onPress={() => navigation.push('ChatApp', { name:name, imageUrl:imageUrl, uid:uid, chatId: chatId, typing: [], bgColor:bgColor })
       
                            }
                               
                               
                                rippleColor="rgba(0, 0, 0, .32)"
                                borderless={true}
                            >
                                <Text>Con</Text>
                            </TouchableOpacity>   
     
    
   </View>
            </View>
            <View style={styles.profile__bottom}>
              
            <ProfileSection
                    count={totalLikes}
                    title={'Hearts'}
                />

                   
            <ProfileSection
                    count={totalPosts}
                    title={'Post'}
                />
            </View>
           

        </View>

    );
}

export default ProfileContainer;

const styles = StyleSheet.create({

    profile: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#FFF',
        width: '92%',
       // padding: 15,
       alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        marginTop:40,
        //height:250

    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        borderRadius:15
      },
      userBtnTxt: {
        color: '#2e64e5',
      },
    profile_top: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around'
    },
    profile_about: {
        padding: 10,
        marginTop: 15,
        width: '100%'
    },
    profile__section: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    profile__sectionText: {
        color: '#9da5b7',
        fontSize: 12,
        fontWeight: '100'
    },
    profile__bottom: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    profile_button: {
        borderRadius: 20,
        backgroundColor: '#7d86f8',
        padding: 5,
        paddingHorizontal: 15,
        marginTop: 10
    },
    profile_button_text: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    compliment: {
        marginTop: 10
    }

})