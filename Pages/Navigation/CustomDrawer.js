import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  
} from 'react-native';
import ToggleButton from 'react-native-toggle-element';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../Styles/themeContext';
import { Fontisto ,Entypo,Ionicons} from '@expo/vector-icons'
import { Switch } from 'react-native-switch';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = props => {

const theme=useContext(themeContext);
  const [loading, setLoading] = useState(true);
  const [darkApp, setDarkApp] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [icon, setIcon] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const { colors } = useTheme();

  const navigation = useNavigation(); 

  const userSignOut= () =>{
     firebase.auth().signOut()
    .then(() =>    
 props.navigation.navigate('login')
  
    )
    .catch((error)=>{
      console.log(error)  
  })

   }



    const openConfirmationAlert = () => {
      Alert.alert(
        "Sign Out",
        "Are you sure?",
        [
          { text: "Yes", onPress: () => userSignOut() },
          { text: "No", onPress: () => console.log("canceled") },
        ],
        {
          cancelable: true,
        }
      );
      
    };

    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }


    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
    }, []);

    if (initializing) return null;
 


  return (
    <SafeAreaView style={{flex: 1}} >
        <View
        style={{backgroundColor: theme.background,width:"100%",height:150}}>
          <Image
            source={require('../../assets/images/admin.png')}
            style={{height: 75, width: 75,borderRadius: 40, marginBottom: 10,marginTop:20,marginLeft:10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              marginLeft:10,
              marginBottom: 5,
              marginTop:10
            }}>
         {user.email}
          </Text>
         
        </View>
        <View style={{flex: 1, backgroundColor: theme.backClair, paddingTop: 10}}>
        <DrawerContentScrollView
        {...props}
        drawerContent={props => <CustomDrawer {...props}/>} 
        >
          <DrawerItemList {...props} />
    
      </DrawerContentScrollView>
      </View>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc',backgroundColor: theme.backClair,}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                color: theme.text ,
                marginLeft: 5,
                marginRight:25
              }}>
             Dark Theme
            </Text>

<Switch
value={darkApp}
onValueChange={(val)=>{
  setDarkApp(val),
  EventRegister.emit('ChangeThemeEvent', val)
}}
disabled={false}
activeText={[<Entypo name="moon" size={22} color={"#000"} />]}
inActiveText={[<Ionicons name="sunny-sharp" size={22} color={"#fff"} />]}
backgroundActive={'#fff'}
backgroundInactive={'#1C1C1C'}
circleActiveColor={'#fff'}
circleInActiveColor={'#1C1C1C'}



/>


          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openConfirmationAlert()} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                color: theme.text ,
                
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;