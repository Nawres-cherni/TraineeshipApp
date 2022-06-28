//Map Class with 3 button satellite ..., w button ta3 position
import React, { useEffect, useState,Component ,useRef} from 'react'

import MapView from 'react-native-maps';
import { Marker,Callout } from 'react-native-maps';
import { StyleSheet, 
  TouchableWithoutFeedback,
  Text, View, Dimensions ,Image,TouchableOpacity,Button,TouchableHighlight,Modal} from 'react-native';
  import * as Location from 'expo-location';
  import BottomSheet from 'reanimated-bottom-sheet';
  import Animated from 'react-native-reanimated';
  import { ScrollView } from 'react-native-gesture-handler';
  import { FontAwesome,FontAwesome5 ,Entypo,MaterialCommunityIcons,Foundation} from '@expo/vector-icons'

import  firebase from 'firebase';
const {width} = Dimensions.get('screen');
const carImage = require('../../assets/images/map_marker.png')



export default class Map extends  Component{
  constructor(props){
    super(props);
  this.state={
    user: {},
    latitude:0,
    longitude:0,
  userId: this.props.route.params.userId,

    modalVisible: false,
 mapType:'standard',
 origine:({
  latitude:36.4006557,
  longitude: 10.6190626,
}),
destination:({
  latitude:36.4006557,
  longitude: 10.6190626,
})

   
  };}
  unsubscribe=null;
  initialRegion=null;
 


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  componentDidMount() {
    const user = firebase.auth().currentUser.uid; 
    this.unsubscribe = firebase.firestore()
    .collection("e_conventionnées")
    .doc(user)
    .onSnapshot(doc =>{
      this.setState({
        user: doc.data(),
      
      });
    });
    this._getLocationPermission();

  }

  componentWillUnmount(){
    this.unsubscribe();

  }


_getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    this.setState({origine:current});
  } 




  render(){
 
  return (
    <View style={styles.container}>
  
  


      <MapView style={styles.map}
          enableZoomControl={true}
          showsUserLocation = {true}
          showsMyLocationButton = {true}

          zoomEnabled = {true}
      initialRegion={{
        latitude:Number(this.state.userId.latitude),
        longitude:  Number(this.state.userId.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType={this.state.mapType}

      >

        
             <Marker 
          draggable
          coordinate={
        this.state.origine
          }
        
       onDragEnd={(direction) => this.setState(direction.nativeEvent.coordinate)}
        >
          <View
          style={{
            height:70,
            width:70,
           // backgroundColor:'#000',
            borderRadius:100,
            justifyContent:'center',
            alignItems:'center'
          }}
          >
          <Image source={{uri : this.state.userId.imageUrl}}
          style={{backgroundColor:'#000',width:65,height:65,borderRadius:100}} 
/>
          </View>

          </Marker>


          <Marker
          coordinate={{ latitude: Number(this.state.userId.latitude) 
            ,longitude: Number(this.state.userId.longitude)}}
         // image={markerImg} style={{height: 35, width:35 }}


         image={require('../../assets/images/map_marker.png')}
         title="Test Title"
         description="This is the test description"

       

          >

<Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Favourite Restaurant</Text>
                  {/* <Text>A short description</Text> */}



                  <Text> <Image style={{ height: 100, width:100 }}  source={require('../../assets/images/map_marker.png')}resizeMode="cover" /> </Text>
                  
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
         
              </View>
            </Callout>
             

          </Marker>

          </MapView>
          
  
<TouchableWithoutFeedback>

<View style={styles.card}>


<Image 
style={styles.images}
source={{uri : this.state.userId.imageUrl}}

/>

<Text
style={styles.textDesc}
>{this.state.userId.nom_soc}</Text>

<Text
style={styles.textDescDetail}
>Societer</Text>


<Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}>
        <View
          style={{
            height: '40%',
            marginTop: 'auto',
            backgroundColor:'#FAFAFA'
          }}>
       <TouchableOpacity 
        onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}
       > 
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />        
        </View> 
      </TouchableOpacity>

      <TouchableOpacity
         style={styles.panelButton}
         onPress={()=> this.setState({mapType:'satellite'})}>
         <Text style={styles.panelButtonTitle}>Satellite Mode</Text>
       </TouchableOpacity>


       <TouchableOpacity
         style={styles.panelButton}
         onPress={()=>  this.setState({mapType:'hybrid'})}>
         <Text style={styles.panelButtonTitle}>Hybrid Mode</Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.panelButton}
         onPress={()=>  this.setState({mapType:'standard'})}>
         <Text style={styles.panelButtonTitle}>Standard Mode</Text>
       </TouchableOpacity>



          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text style={styles.panelButtonTitle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          
          style={{backgroundColor:'#fff',width:60,height:60,marginTop:-60,marginLeft:320}}
          >
            <View    style={{backgroundColor:'#fff',height:150}}>
            <Foundation name="map" size={35}  />

            </View>
       
        </TouchableHighlight>
      
</View>

</TouchableWithoutFeedback>



 
<View >


          </View>



       
          
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
  card:{
    backgroundColor:"#fff",
    height:90,
    width:width - 20,
    position:'absolute',
    overflow:'hidden',
    margin:10,
    bottom:50,
    shadowRadius:20,
    borderRadius:8,
    padding:10
  },
  images:{
    height:70,
    width:100
  },
  textDesc:{
    position:'absolute',
    paddingLeft:width/2,
    paddingTop:10,
    textAlign:'center',
    fontWeight:"bold"
  },
  textDescDetail:{
    position:'absolute',
    paddingLeft:120,
    paddingTop:30,
  },


  buttonSaveApprenant:{
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 10,
    backgroundColor:'#1f487e',
    //opacity:0.8,
    marginBottom:90

  },
  viewTextInput:{
    alignSelf:'center',
    justifyContent: "center",
    width:'90%',
    marginBottom:20,
    marginTop:40,
    color:'#000'
  },
  textInput: {
padding:20,
marginTop:50,
borderStartWidth : 1,
borderLeftWidth:1,
borderTopWidth : 1,
borderRightWidth: 1,
borderBottomWidth : 1,
borderColor: "#BDBDBD",
color:'#000'
  },


  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:20
  },
  header1: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    top:-80,
    height:90,
    borderBottomLeftRadius:45,
    borderBottomRightRadius:45
    
  },
  authBox:{
  width:'90%',
  height:'85%',
  backgroundColor:'#fafafa',
  borderRadius:20,
  alignSelf:'center',
  paddingHorizontal:14,
  paddingBottom:30,
  shadowColor:'#000',
  shadowOffset:{
    width:0,
    height:2
  },
  shadowOpacity:0.25,
  shadowRadius:3.84,
  elevation:10
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#1f487e',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {

    padding: 20,
  
    backgroundColor: '#FFFFFF',
    paddingTop: -220,
 

  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
//paddingHorizontal:20,
    borderRadius: 10,
    backgroundColor: '#1f487e',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },

});