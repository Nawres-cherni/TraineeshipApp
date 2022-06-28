import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator,Dimensions,TouchableOpacity,Text } from 'react-native';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableRipple } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase'
import UserListItem from './UserListItem';
import Header from './Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class MessageApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            messagesData: [],
            chatsData: [],

            name: '',
            users: [],
            searchLoading: false,

            chatModal: false,
            chatId: '',
            userName: '',
            userIconUrl: '',
            chatUid: '',

            loading: false,
            bgColor: '#FFF'

        }
    }

    componentDidMount() {
        this.getMessages()
    }



    getMessages = () => {
        this.setState({ loading: true })
        let data = []
        firebase.firestore().collection('apprenants').doc(firebase.auth().currentUser.uid).onSnapshot((snap) => {
            data = snap.data().chats
            this.setState({ bgColor: snap.data().bgColor })
            if (data.length) {
                console.log('chats =>>>>', data)
                this.getLastMessage(data)
            }
            else {
                this.setState({ loading: false })
            }
        })
    }

    getLastMessage = (data) => {
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
                    this.getMessageData(chats)
                }
            })
        })
    }



    getMessageData = (data) => {
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
            if (data.indexOf(d) === data.length - 1) {
                this.setState({
                    chatsData: userData,
                    loading: false
                })
            }
        })
    }
    userSignOut (){
        firebase.auth().signOut()
   
       .then(() =>  this.props.navigation.replace('login'))
       .catch((error)=>{
           console.log(error)  
       })
        }
    searchUser = (val) => {
        console.log('searching for ', val, this.state.users)
        this.setState({ name: val }, () => {
            if (this.state.name.length) {
                this.fetchUser()
            }
            else {
                this.setState({ users: [] })
            }
        })
    }
    fetchUser = () => {
        this.setState({ searchLoading: true })
        console.log(this.state.name)
        let myid = firebase.auth().currentUser.uid
        firebase.firestore()
            .collection('e_conventionnées')
            .orderBy('name')
            .startAt(this.state.name.trim().toLowerCase())
            .endAt(this.state.name.trim().toLowerCase() + '\uf8ff')
            .get()
            .then((snap) => {
                let userData = []
                snap.docs.map((data) => {


                    if (data.id !== myid) {

                        userData.push({ ...data.data(), ...{ uid: data.id } })
                    }
                })
                this.setState({ users: userData, searchLoading: false })
            })
    }

    finduid = (uid) => {
        this.state.chatsData.map((data) => {
            if (data.uid === uid) {
                return true
            }
        })
        return false
    }


    navigateChatScreen = (data) => {

        let found = false
        let findUid = data.uid
        let chatId = undefined
        let blocked = false
        let blockId =
            this.state.chatsData.map((data) => {
                if (data.uid === findUid) {
                    found = true
                    chatId = data.chatId
                    blocked = data.blocked
                    blockId = data.blockId
                }
            })

        if (found) {
            console.log('found', chatId)
            this.props.navigation.push('ChatApp', { name: data.name, imageUrl: data.imageUrl, uid: data.uid, chatId: chatId, blocked: blocked, blockId: blockId, typing: [], bgColor: this.state.bgColor })
        }
        else {
            console.log('not found')
            this.props.navigation.push('ChatApp', { name: data.name, imageUrl: data.imageUrl, uid: data.uid, blocked: false, blockId: [], typing: [], bgColor: this.state.bgColor })
        }

    }


    render() {
        switch (this.state.loading) {
            case false:
                return (
                    <View style={styles.messagesScreen}>
                                         <View style={styles.header1}>

<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
     </TouchableOpacity>
     <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

<Text style={styles.headerTitle}>Message</Text>



</View>

</View>
                        <View>
                            <View style={styles.search__bar} >
                                <TextInput
                                    placeholder={'search user'}
                                    value={this.state.name}
                                    onChangeText={(val) => this.searchUser(val)}

                                />
                                {this.state.searchLoading ?
                                    <ActivityIndicator size='small' color='#7d86f8' />
                                    :
                                    <TouchableRipple
                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                        borderless={true}
                                    >
                                        <MaterialCommunityIcons
                                            name='account-search-outline'
                                            size={24}
                                            color={"#222222"}
                                        />
                                    </TouchableRipple>}
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                            >
                                {this.state.users.map((user) => (
                                    <TouchableRipple
                                        onPress={() => this.navigateChatScreen(user)}
                                        rippleColor="rgba(0, 0, 0, .32)"

                                    >
                                        <UserListItem
                                            name={user.name}
                                            imageUrl={user.imageUrl}
                                          //  followers={user.followers.length}
                                        />
                                    </TouchableRipple>
                                ))}
                            </ScrollView>
                        </View>

                        {this.state.chatsData.length == 0 && this.state.users.length == 0 ? 
                            <View style={{alignItems:'center',justifyContent:'center'}} >
                  
              
                </View>
                        :null}
                        {this.state.chatsData.map((data) => (
                            <TouchableRipple
                                onPress={() => this.props.navigation.push('ChatApp', { name: data.name, uid: data.uid, imageUrl: data.imageUrl, chatId: data.chatId, blocked: data.blocked, blockId: data.blockId, typing: data.typing, bgColor: this.state.bgColor })}
                                rippleColor="rgba(0, 0, 0, .32)"
                                borderless={true}
                            >
                                <UserListItem
                                    name={data.name}
                                    imageUrl={data.imageUrl}
                                    chat
                                    typing={data.typing.length > 0 ? true : false}
                                    seen={data.seen}
                                    lastMessage={data.lastMessage}
                                />
                            </TouchableRipple>
                        ))}
                                
                    </View>
                );

            default:
                return <View style={styles.loading} >
                    <ActivityIndicator size='large' color='#303233' />
                </View>
        }
    }
}

const styles = StyleSheet.create({
    search__bar: {
        marginTop: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor: '#9da5b7'
    },
    messagesScreen: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },

    headerTitle: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop:28,
        alignSelf:'center'
        
      },
      header1: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#1f487e",
        height:90,
    
        
      },


})