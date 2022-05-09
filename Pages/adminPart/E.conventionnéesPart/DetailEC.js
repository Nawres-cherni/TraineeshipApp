import React, { useState ,useEffect} from 'react'
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity,
    Text
  } from "react-native";
import  firebase from 'firebase';

const DetailEC = ({navigation, route}) => {

    const [currentUserId, setcurrentUserId] = useState(
        route.params.currentUserId,
      );
      const [currentUseremail, setcurrentUseremail] = useState(
        route.params.currentUseremail,
      );
    
      const [lieu, setLieu] = useState('');


      const handleQuestionSave = async () => {
        firebase.firestore()
    .collection('e_conventionnées')
    .doc(currentUserId)
    .collection('detail_ec')
    .doc(currentUseremail)
    .set({
        lieu
    })  
  };

      
  return (
    <View style={{marginTop:50,alignContent:'center',alignItems:'center'}}>
  <Text style={{textAlign: 'center', marginBottom: 20}}>
            For {currentUseremail}
          </Text>
          <TextInput
            placeholderText="enter Lieu"
            onChangeText={val => setLieu(val)}
            value={lieu}
          />


<View  style={{backgroundColor:'#000', marginTop:20}}>
        <TouchableOpacity onPress={() => handleQuestionSave()}>
          <Text style={{color:'#fff'}}>Enregistrer Apprenant</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DetailEC