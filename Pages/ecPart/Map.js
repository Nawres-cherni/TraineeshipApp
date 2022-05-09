import React, { useEffect, useState,Component ,useRef} from 'react'

import MapView from 'react-native-maps';
import { Marker,Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,Image,} from 'react-native';

import  firebase from 'firebase';
export default class Map extends  Component{
  constructor(props){
    super(props);
  this.state={
    user: {},
    latitude:0,
    longitude:0

   
  };}
  unsubscribe=null;
  initialRegion=null;
  componentDidMount() {
    const user = firebase.auth().currentUser.uid; 
    this.unsubscribe = firebase.firestore()
    .collection("e_conventionnées")
    .doc(user)
    .onSnapshot(doc =>{
      this.setState({user: doc.data()});
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
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
        latitude: this.state.latitude,
        longitude:  this.state.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
          <Marker
          coordinate={{ latitude:  this.state.latitude ,longitude: this.state.longitude}}
         // image={markerImg} style={{height: 35, width:35 }}
          >

<Callout>
               
                    <Text>Steg</Text>
             
                </Callout>
             

          </Marker>

          </MapView>
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
});