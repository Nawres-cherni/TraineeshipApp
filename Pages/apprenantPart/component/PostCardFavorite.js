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
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Avatar, TouchableRipple } from 'react-native-paper';

import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class PostCardFavorite extends Component {

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
 

  


    render() {

   
        return (
            <View style={styles.post}>
                <View style={styles.header} >
                    <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                        <Avatar.Image size={40} source={{ uri: this.props.userIconUrl }} />
                        <Text style={{ marginLeft: 15 }}>{this.props.userName}{'\n'}</Text>
                        <Text style={{fontSize:12,color: '#666', marginLeft: -30,marginTop:25 }}>{moment(this.props.postTime.toDate()).fromNow()}</Text>
                    </View>
                   
                </View>

                {this.props.postImageUrl != null ? (
       <Image
       style={{ resizeMode:'center',height:windowHeight*0.4 }} source={{ uri: this.props.postImageUrl }}
   />
      ) : (
   null
                        
      )}







                <View style={styles.bottom}>
                    <View style={styles.bottom__left} >
                    
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
                {typeof this.props.postImageUrl === 'undefined' ? null :
                    <>
                        {this.state.expand ?
                            <Text>{this.props.postDescription}</Text> :
                            <Text>{this.props.postDescription.slice(0, 50)}....</Text>
                        }
                    </>}
             
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
        shadowColor: "#1f487e",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 10,
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