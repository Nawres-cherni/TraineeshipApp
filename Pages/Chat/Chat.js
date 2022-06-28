import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'

import  firebase from 'firebase';

export default function ChatScreen({route}) {
    const [messages, setMessages] = useState([]);
    const user = firebase.auth().currentUser; 
     const {uid} = route.params;

    useEffect(() => {
      // getAllMessages()

      const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const messageRef = firebase.firestore().collection('chatrooms')
        
        .orderBy('createdAt',"desc")

      const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
            const allmsg =   querySnap.docs.map(docSanp=>{
             const data = docSanp.data()
             if(data.createdAt){
                 return {
                    ...docSanp.data(),
                    createdAt:docSanp.data().createdAt.toDate()
                }
             }else {
                return {
                    ...docSanp.data(),
                    createdAt:new Date()
                }
             }
                
            })
            setMessages(allmsg)
        })


        return ()=>{
          unSubscribe()
        }

        
      }, [])

      const onSend =(messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy:user.uid,
            sentTo:uid,
            createdAt:new Date()
        }
       setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
       const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
 
       firebase.firestore().collection('chatrooms')
       .doc(docid)
       .collection('messages')
       .add({...mymsg,createdAt:firebase.firestore.FieldValue.serverTimestamp()})


      }
    return (
        <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
          
          <Text style={{fontSize:50,marginLeft:50}}>{route.params.nom_soc}</Text>
         
        


        
        </View>
    )
}


//THUQdkImzFVOv2LqHvxdSn3RDLY2-jxgISB0nWgRmtfu2OIn1BIVlBMu1