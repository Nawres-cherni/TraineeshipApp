import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
//import { withNavigation } from 'react-navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { FAB, TouchableRipple, ActivityIndicator } from 'react-native-paper';
import PostCardDetail from './component/PostCardDtail';
import firebase from 'firebase';
 class PostDetailScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.route.params.userName,
            iconUrl: this.props.route.params.userIconUrl,
            postItem: this.props.route.params.postData,
            uid: firebase.auth().currentUser.uid
        }
    }

    
    componentDidMount() {
        console.log('Post Data =>>>>>>>>>>>>>', this.state.postItem)
    }

    render() {
        return (
            <>
       
                <PostCardDetail
                    userName={this.state.name}
                    userIconUrl={this.state.iconUrl}
                    postId={this.state.postItem.postId}
                    userId={this.state.uid}
                    postImageUrl={this.state.postItem.postImg}
                    postDescription={this.state.postItem.post}
                    postLikes={this.state.postItem.likes}
                    //postComments={this.state.postItem.comments}
                />
            </>
        );
    }
}


export default PostDetailScreen;
