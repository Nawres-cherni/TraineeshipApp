import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    Card,
    Alert
  } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Notification = () => {
  return (
    <View>
                  <View style={styles.header}>

<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<Icon name="chevron-left" size={28} color={"#fff"}style={{marginTop:10}}  />
     </TouchableOpacity>
     <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

<Text style={styles.headerTitle}>List Like</Text>



</View>

</View>
      <Text>Notification</Text>
    </View>
  )
}

export default Notification
const styles = StyleSheet.create({
    profileScreen: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#FFF'
  
    },
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
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#23395D'
    },
  })