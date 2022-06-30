//EC Post Card ta3 video 
import React, { Component, useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions

} from "react-native";
import  firebase from 'firebase';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import { Avatar, TouchableRipple } from 'react-native-paper';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";

import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ECPostCard extends Component {

    // const [expand, setExpand] = useState(false);
    // const [likes, setLikes] = useState(postLikes);
    constructor(props) {
        super(props)
        this.state = {
            expand: false,
            likes: this.props.postLikes,
           
        }
    }

    handleExpand = () => {
        this.setState({
            expand: !this.state.expand
        })
    }
    handleLike = () => {
        // console.log('like pressed', likes.includes(userId))
        if (this.state.likes.includes(this.props.userId)) {
            let id = this.props.userId
            console.log('unlike')
            let likearray = this.state.likes.filter(function (item) {
                return item !== id
            })
            console.log('filyered', likearray)
            this.setState({ likes: likearray },
                () => firebase.firestore().collection('posts').doc(this.props.postId).update({
                    likes: this.state.likes
                }).then(() => console.log('unliked')))

        }
        else {
            console.log('like',)
            let x = this.state.likes
            x.push(this.props.userId)
            this.setState({ likes: x },
                () => firebase.firestore().collection('posts').doc(this.props.postId).update({
                    likes: this.state.likes
                }).then(() => console.log('liked')))
        }
    }

  


    render() {

   
        return (
            <View style={styles.post}>
                <View style={styles.header} >
                    <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                      
                    <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                        <Avatar.Image size={40} source={{ uri: this.props.userIconUrl }} />
                        <Text style={{ marginLeft: 15 }}>{this.props.userName}{'\n'}</Text>
                        <Text style={{fontSize:12,color: '#666', marginLeft: -30,marginTop:25 }}>{moment(this.props.postTime.toDate()).fromNow()}</Text>
                    </View>
                    </View>
                    <TouchableRipple
                            onPress={() => this.RBSheet.open()}
                            rippleColor="rgba(0, 0, 0, .32)"
                            borderless={true}
                        >
                            <Entypo
                                name='dots-two-vertical'
                                color='#303233'
                                size={30}
                            />
                        </TouchableRipple>

                </View>
                {this.props.postImg != null ? (
       <Image
       style={{ resizeMode:'center',height:windowHeight*0.4 }} source={{ uri: this.props.postImg }}
   />
      ) : (
   null
                        
      )}


                <View style={styles.bottom}>
                    <View style={styles.bottom__left} >
                        <TouchableRipple
                            onPress={() => this.handleLike()}
                            rippleColor="rgba(0, 0, 0, .32)"
                            borderless={true}
                        >
                            {this.state.likes.includes(this.props.userId) ? <AntDesign
                                name='heart'
                                color='#e95950'
                                size={25}
                            /> :
                                <AntDesign
                                    name='hearto'
                                    color='#000'
                                    size={25}
                                />}
                        </TouchableRipple>
                     


                    </View>
                    <TouchableRipple
                        onPress={() => this.handleExpand()}
                        rippleColor="rgba(0, 0, 0, .32)"
                        borderless={true}
                    >
                        {this.state.expand ? <MaterialIcons
                            name='expand-less'
                            color='#000'
                            size={25}
                        /> : <MaterialIcons
                                name='expand-more'
                                color='#000'
                                size={25}
                            />
                        }
                    </TouchableRipple>
                </View>
                <View>
                    <Text>{this.state.likes.length} likes</Text>
                 
                </View>
                {typeof this.props.postImg === 'undefined' ? null :
                    <>
                        {this.state.expand ?
                            <Text>{this.props.post}</Text> :
                            <Text>{this.props.post}</Text>
                        }
                    </>}
                    <RBSheet
ref={ref => {
    this.RBSheet = ref;
}}
height={150}
openDuration={250}
customStyles={{
    container: {
        justifyContent: 'space-evenly',

    }
}}
>
<TouchableRipple
      onPress={() => this.props.navigation.push('ecDetail', { postData: this.props,postId:this.props.postId
        ,post:this.props.post,postImg:this.props.postImg })}
    rippleColor="rgba(0, 0, 0, .32)"
    borderless={true}
    style={styles.bottomButtons}
>
    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <MaterialCommunityIcons
            name='file-document-edit-outline'
            color='#1aa260'
            size={30}
        />
        <Text style={{ marginLeft: 15, color: '#23395D' }} >Detail Post</Text>
    </View>
</TouchableRipple>


<TouchableRipple
      onPress={() => this.props.navigation.push('ListLike')}
    rippleColor="rgba(0, 0, 0, .32)"
    borderless={true}
    style={styles.bottomButtons}
>
    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <MaterialCommunityIcons
            name='account-heart'
            color='#B40404'
            size={30}
        />
        <Text style={{ marginLeft: 15, color: '#23395D' }} >List Jaime</Text>
    </View>
</TouchableRipple>




<TouchableRipple
    onPress={() => this.RBSheet.close()}
    rippleColor="rgba(0, 0, 0, .32)"
    borderless={true}
    style={styles.bottomButtons}
>
    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <Entypo
            name='cross'
            color='red'
            size={30}
        />
        <Text style={{ marginLeft: 15, color: '#23395D' }} >Close</Text>
    </View>
</TouchableRipple>
</RBSheet>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    post: {
        width: '100%',
        borderRadius: 15,
        padding: 15,
        backgroundColor: '#FFF',
        marginTop: 10,
        marginBottom: 15,
        shadowColor: "#7d86f8",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    header: {
        alignItems: "center",
        padding: 15,
        flexDirection: "row",
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        borderBottomWidth:0.5,
        borderColor:'#d4d4d4',
    },
    bottom: {
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bottom__left: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})