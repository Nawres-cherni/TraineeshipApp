import React from 'react'
import {
    View,
    Text,
    StyleSheet,

} from 'react-native'
import { Avatar, TouchableRipple } from 'react-native-paper'


const UserListItem = ({ name, iconUrl, totalLikes, chat, lastMessage, seen, typing }) => {
    return (
        <View style={styles.user} >
            <Avatar.Image size={50} source={{ uri: iconUrl }} />
            <View style={styles.user__data} >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} >{name}</Text>
                {typeof chat === 'undefined' ?
                    <>
                        {totalLikes ? <Text style={{ color: '#878787', fontSize: 10 }} > followed by {totalLikes} users</Text> :
                            <Text style={{ color: '#878787', fontSize: 10 }} >new user</Text>}
                    </>
                    :
                    <>
                        
                    </>

                }
            </View>
        </View>
    );
}

export default UserListItem;

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        padding: 5,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
        alignItems: 'center',
        borderRadius: 30
    },
    user__data: {
        marginLeft: 15,
        justifyContent: 'space-evenly',

    }
})