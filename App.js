//App s7i7a
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Animated ,Dimensions,LogBox,} from 'react-native';
import * as firebase from 'firebase';
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './redux/reducers';
//import thunk from 'redux-thunk';

import React, { useEffect, useState,useContext ,useRef} from 'react'
import { FontAwesome5 ,Foundation,MaterialIcons,Ionicons,AntDesign} from '@expo/vector-icons'
//const  store = createStore(rootReducer, applyMiddleware(thunk))
import 'react-native-gesture-handler';
const firebaseConfig = {
  apiKey: "AIzaSyBXvS-cUDNmD0h2betfplMSIyMTZb9GVb4",
  authDomain: "mobile-12b08.firebaseapp.com",
  projectId: "mobile-12b08",
  storageBucket: "mobile-12b08.appspot.com",
  messagingSenderId: "942531933715",
  appId: "1:942531933715:web:a581d030a35e2d0a94b1e6"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true,merge:true });
  }
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email)
  };


 // LogBox.ignoreAllLogs(true)
import { NavigationContainer,DefaultTheme,DarkTheme ,useTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './welcomePages/SplashScreen';
import WelcomeScreen from './welcomePages/WelcomeScreen';
import Login from './Pages/auth/Login';
import ForgotPassword from './Pages/auth/ForgotPassword';
import CustomDrawer from './Pages/Navigation/CustomDrawer';
import CustomDrawerApprenant from './Pages/Navigation/CustomDrawerApprenant';
import CustomDrawerEC from './Pages/Navigation/CustomDrawerEC';

import { createDrawerNavigator,DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHome from './Pages/adminPart/AdminHome';
import CreateApprenants from './Pages/adminPart/Apprenants/CreateApprenants';
import ListApprenants from './Pages/adminPart/Apprenants/ListApprenants';
import UpdateApprenants from './Pages/adminPart/Apprenants/UpdateApprenants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthProvider from './Pages/Navigation/AuthProvider'
import ProfilApp from './Pages/apprenantPart/ProfilApp';
import EditProfilApp from './Pages/apprenantPart/EditProfilApp';
import SendEmail from './Pages/adminPart/Apprenants/SendEmail';
import CreateAccountEC  from './Pages/adminPart/E.conventionn??esPart/CreateAccountEC';
import ListEC from './Pages/adminPart/E.conventionn??esPart/ListEC';
import DetailEC from './Pages/adminPart/E.conventionn??esPart/DetailEC';
import ProfilEC from './Pages/ecPart/ProfilEC';
import EditProfilEC from './Pages/ecPart/EditProfilEC';
import Map from './Pages/ecPart/Map';
import UpdateEC from './Pages/adminPart/E.conventionn??esPart/UpdateEC';
import AddPost from './Pages/ecPart/AddPost';
import PostDetailScreen from './Pages/apprenantPart/PostDetailScreen';
import HomeEC from './Pages/ecPart/HomeEC';
import Profil from './Pages/ecPart/Profil';
import PostECDEtail from './Pages/ecPart/PostECDEtail';
import ECPostCard from './Pages/ecPart/components/ECPostCard';
import Favorite from './Pages/apprenantPart/Favorite';
import ProgressiveImage from './Pages/ecPart/components/ProgressiveImage';
import MapApp from './Pages/apprenantPart/MapApp';
import ListLike from './Pages/ecPart/ListLike';





//Apprenant Oart
import Home from './Pages/apprenantPart/Home';
import ProfilHome from './Pages/apprenantPart/ProfilHome';
import DetailProfilEC from './Pages/apprenantPart/DetailProfilEC';
import { EventRegister } from 'react-native-event-listeners'
import themeContext from './Pages/Styles/themeContext';
import theme from './Pages/Styles/theme';


//chat Apprenants Part
import MessageApp from './Pages/apprenantPart/ChatPartApp/MessageApp';
import ChatApp from './Pages/apprenantPart/ChatPartApp/ChatApp';
import Notification from './Pages/ecPart/Notification/Notification';
import ChatEc from './Pages/ecPart/ChatPartEc/ChatEc';
import MessageEc from './Pages/ecPart/ChatPartEc/MessageEc';
const DrawerApprenant = createDrawerNavigator();
const DrawerEC = createDrawerNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TabEc = createBottomTabNavigator();
const TabApp = createBottomTabNavigator();


const StackHomeAdmin = createNativeStackNavigator();
const StackSplash = createNativeStackNavigator();
const StackListAppre = createNativeStackNavigator();
const StackListEC = createNativeStackNavigator();
const StackApprenPart = createNativeStackNavigator();






const navOptionHandler = () =>({
  headerShown: false
})



function CustomHeadet({title, isHome,navigation}){
  return(
    <View style={{flexDirection:'row',height:50}}>
      <View style={{flex:1,justifyContent:'center'}}>
{
isHome ?
<TouchableOpacity   style={{marginLeft:5}}  onPress={()=>navigation.openDrawer()}>
<Icon name="sort" size={28} color={"#fff"}  />
                 </TouchableOpacity>:

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Icon name="angle-left" size={28} color={"#fff"} />
</TouchableOpacity>
 
}
      </View>

    </View>
  )
}



function HomeStack(){
  return(
    <StackHomeAdmin.Navigator initialRouteName='Home' >
      <StackHomeAdmin.Screen name="Home"  component={AdminHome} options={navOptionHandler}/>
    </StackHomeAdmin.Navigator>
  )
}

function ListApprenantsStack(){
  return(
    <StackListAppre.Navigator initialRouteName='listApprenants' >
      <StackListAppre.Screen name="listApprenants"  component={ListApprenants} options={navOptionHandler}/>
      <StackListAppre.Screen  name="apprenantdetail"  component={UpdateApprenants} options={navOptionHandler}/>
      <StackListEC.Screen  name="createApprenants"  component={CreateApprenants} options={{headerShown: false}}/>  

    </StackListAppre.Navigator>
  )
}




function ListECStack(){
  return(
<StackListEC.Navigator initialRouteName='listec' >
      <StackListEC.Screen name="listec"  component={ListEC} options={navOptionHandler}/>
      <StackListEC.Screen  name="updateEC"  component={UpdateEC} options={navOptionHandler}/>
      <StackListEC.Screen  name="sendmail"  component={SendEmail} options={{headerShown: false}}/>
      <StackListAppre.Screen  name="createEC"  component={CreateAccountEC} options={{headerShown: false}}/>  

    </StackListEC.Navigator>
  )
}


function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}

function TabNavigator(){
const theme=useContext(themeContext);

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
     /* <NavigationContainer independent={true}>*/

  <Tab.Navigator 
  tabBarOptions={{
    keyboardHidesTabBar: true,
  

  }}
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    
    // Floating Tab Bar...
    tabBarStyle: {
      backgroundColor: theme.tabBackground,
      position: 'absolute',
      bottom: 20,
      //marginTop:-40,
      marginHorizontal: 20,
      // Max Height...
      height: 60,
      borderRadius: 10,
      // Shadow...
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: {
        width: 10,
        height: 10
      },
      paddingHorizontal: 20,
   
    }
  }}>

<Tab.Screen name="listApprenants" component={ListApprenantsStack} 

options={{
  tabBarIcon: ({ focused }) => (
    <View style={{
      // centring Tab Button...
      position: 'absolute',
      top: 15,
      alignItems:"center",
      justifyContent:"center"
    }}>
      <FontAwesome5
         name="users"
        size={20}
        color={focused ? theme.iconTabClair : theme.iconTabDarka }
      ></FontAwesome5>
              <Text style={{color: focused ? theme.iconTabClair : theme.iconTabDarka,fontSize:12,marginTop:-5}}>Apprenants</Text>

    </View>
  )
}} listeners={({ navigation, route }) => ({
  // Onpress Update....
  tabPress: e => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth()  - 60,
      useNativeDriver: true
    }).start();
  }
})}
/>
  

    <Tab.Screen name="homeAdmin" component={HomeStack}
    screenOptions={{unmountOnBlur: false }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <FontAwesome5
            name="home"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></FontAwesome5>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Home</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    
    />
    <Tab.Screen name="listEnC" component={ListECStack} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 15,
              alignItems:"center",
              justifyContent:"center"
            }}>
              <Foundation
                name="torso-business"
                size={20}
                color={focused ? "#1f487e" : 'gray'}
              ></Foundation>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-5}}>Societ??</Text>

            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3.5,
              useNativeDriver: true
            }).start();
          }
        })} />
   
  </Tab.Navigator>
    

   /*
<Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: "#1f487e",
        position: 'absolute',
        bottom: 80,
        start:getWidth(),
        // Horizontal Padding = 20...
        left: 5,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
      */  
  )
}




function DrawerNavigation(){
const theme=useContext(themeContext);

return(
  <Drawer.Navigator
  drawerContent={(props) => <CustomDrawer {...props} />}
  screenOptions={{
    headerShown: false,
    drawerActiveBackgroundColor:  theme.drawerColor,
    drawerLabelStyle: {
      //marginLeft: -25,
      //fontFamily: 'Roboto-Medium',
      fontSize: 15,
      color:theme.textDrawer
    },

  }}
  >
          <Drawer.Screen name="Homee" component={TabNavigator} 
      options={{
        headerShown: false,
        drawerItemStyle: { display: 'none' }
      }}
    />
    
      <Drawer.Screen name="Home" component={HomeStack} 
      options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={22} style={{marginRight:-15}} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}
    />
      <Drawer.Screen name="List Apprenants" component={ListApprenantsStack}  options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <FontAwesome5
          name="users"  style={{marginRight:-15}} size={22} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>
      <Drawer.Screen name="List Entreprise" component={ListEC}  options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <Foundation
          name="torso-business"  style={{marginRight:-10}} size={22} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>
      </Drawer.Navigator>
)
}



function TabNavigatorECPart(){
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
     /* <NavigationContainer independent={true}>*/
  <TabEc.Navigator 
  tabBarOptions={{
    keyboardHidesTabBar: true
  }}
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    
    // Floating Tab Bar...
    tabBarStyle: {
      backgroundColor: 'white',
      position: 'absolute',
    // bottom: 20,
      //marginTop:-40,
      marginHorizontal: 20,
      // Max Height...
      height: 60,
      borderRadius: 10,
      // Shadow...
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: {
        width: 10,
        height: 10
      },
      paddingHorizontal: 20,
   
    }
  }}>




    <TabEc.Screen name="homeEc" component={HomeEC}
    screenOptions={{unmountOnBlur: true }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <FontAwesome5
            name="home"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></FontAwesome5>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Home</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    />
    <TabEc.Screen name="addpost" component={AddPost}
    screenOptions={{unmountOnBlur: true }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <MaterialIcons
            name="post-add"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></MaterialIcons>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Add Post</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    />
   

   <TabEc.Screen name="Message" component={MessageEc}
    screenOptions={{unmountOnBlur: true }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <AntDesign
            name="wechat"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></AntDesign>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Message</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    />


<TabEc.Screen name="Notification" component={Notification}
    screenOptions={{unmountOnBlur: true }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <AntDesign
            name="notification"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></AntDesign>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Notification</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    />
  </TabEc.Navigator>
  
  )
}



function TabNavigatorAppPart(){
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
     /* <NavigationContainer independent={true}>*/
  <TabApp.Navigator 
  tabBarOptions={{
    keyboardHidesTabBar: true
  }}
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    
    // Floating Tab Bar...
    tabBarStyle: {
      backgroundColor: 'white',
      position: 'absolute',
    // bottom: 20,
      //marginTop:-40,
      marginHorizontal: 20,
      // Max Height...
      height: 60,
      borderRadius: 10,
      // Shadow...
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: {
        width: 10,
        height: 10
      },
      paddingHorizontal: 20,
   
    }
  }}>




    <TabApp.Screen name="Home" component={Home}
    screenOptions={{unmountOnBlur: true }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <FontAwesome5
            name="home"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></FontAwesome5>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Home</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    />
  
   

   <TabApp.Screen name="MessageApp" component={MessageApp}
    screenOptions={{unmountOnBlur: true }}
    options={{
     
      tabBarIcon: ({ focused }) => (
        <View style={{
          // centring Tab Button...
          position: 'absolute',
          top: 15,
          alignItems:"center",
          justifyContent:"center"
        }}>
          <AntDesign
            name="wechat"
            size={30}
            color={focused ? "#1f487e" : 'gray'}
            style={{top:-10}}
          ></AntDesign>
              <Text style={{color: focused ? "#1f487e" : 'gray',fontSize:12,marginTop:-15}}>Message</Text>          
        </View>     
      )
    }} listeners={({ navigation, route }) => ({
      // Onpress Update....
      tabPress: e => {
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.8,
          useNativeDriver: true
        }).start();
      }
    })}
    />
  </TabApp.Navigator>
  
  )
}


function DrawerNavigationApprenants(props){
  const theme=useContext(themeContext);
  return(
    <DrawerApprenant.Navigator
    drawerContent={(props) => <CustomDrawerApprenant {...props} />}>      
        <DrawerApprenant.Screen name="HomeApp" component={TabNavigatorAppPart}  options={{
                    headerShown: false,
                  drawerItemStyle: { display: 'none' }
        }}/>
        <DrawerApprenant.Screen name="Accueil" component={Home}   options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={22} style={{marginRight:-15}} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>




        <DrawerApprenant.Screen name="Profil" component={ProfilApp}  options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <FontAwesome5 name="user-circle" size={22} style={{marginRight:-15}} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>
        
        <DrawerEC.Screen name="PostECDEtail" component={PostECDEtail} {...props} options={{
                    headerShown: false,
                  drawerItemStyle: { display: 'none' }
        }}/>       
        <DrawerApprenant.Screen name="appProfilEC" component={ProfilHome} {...props} options={{
                    headerShown: false,
                  drawerItemStyle: { display: 'none' }
        }}/>       

        </DrawerApprenant.Navigator>
  )
  }



  
function DrawerNavigationEC(props){
const theme=useContext(themeContext);

  return(
    <DrawerEC.Navigator
    drawerContent={(props) => <CustomDrawerEC {...props} />}>     
     
        <DrawerEC.Screen name="HomeEc" component={TabNavigatorECPart}  options={{
                    headerShown: false,
                  drawerItemStyle: { display: 'none' }
        }}/>
        <DrawerEC.Screen name="Home" component={HomeEC}  options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={22} style={{marginRight:-15}} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>
       
    


        <DrawerEC.Screen name="Profil" component={ProfilEC}  options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <FontAwesome5 name="user-circle" size={22} style={{marginRight:-15}} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>
        <DrawerEC.Screen name="Add Post" component={AddPost}  options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <MaterialIcons name="post-add" size={22} style={{marginRight:-15}} color={focused ? theme.iconDrawerActive : theme.iconDrawerAnActive} />
        ),
      }}/>
    

        <DrawerEC.Screen name="ProfilECDetail" component={ProfilHome}  options={{
                    headerShown: false,
                  drawerItemStyle: { display: 'none' }
        }}/>       




        </DrawerEC.Navigator>
  )
  }
export default function App(props){



const [darkApp,setDarkApp]=useState(false);

useEffect(()=>{

  let eventListner= EventRegister.addEventListener
  ('ChangeThemeEvent',
   (data) => {
    setDarkApp(data)
},
);



   return()=>{

    EventRegister.removeEventListener(eventListner)
   };
 },[]);



  return(
    
    
    <themeContext.Provider  value={darkApp === true ? theme.dark : theme.light}>
 
 <NavigationContainer //</themeContext.Provider>}
 >
      <StackSplash.Navigator >
      <StackSplash.Screen name="login"  component={Login} options={navOptionHandler}/>
    
    
      <StackSplash.Screen name="Favorite"  component={Favorite} options={navOptionHandler}/>
      <StackSplash.Screen name="MessageApp"  component={MessageApp} options={navOptionHandler}/>
      <StackSplash.Screen name="ChatApp"  component={ChatApp} options={navOptionHandler}/>


      <StackSplash.Screen name="ChatEC"  component={ChatEc} options={navOptionHandler}/>

      <StackSplash.Screen name="ListLike"  component={ListLike} options={navOptionHandler}/>





      <StackSplash.Screen name="MapApp"  component={MapApp} options={navOptionHandler}/>


      <StackSplash.Screen name="map"  component={Map} options={navOptionHandler}/>


      <StackSplash.Screen name="homeEc"  component={DrawerNavigationEC} options={navOptionHandler}/>

      <StackSplash.Screen name="Home"  component={DrawerNavigation} options={navOptionHandler}/>


      <StackSplash.Screen name="splash"  component={SplashScreen} options={navOptionHandler}/>

      

      <StackSplash.Screen name="PostDetailScreen"  component={PostDetailScreen} options={navOptionHandler}/>




      <StackSplash.Screen name="addpost"  component={AddPost} options={navOptionHandler}/>

      <StackSplash.Screen name="appHome"  component={DrawerNavigationApprenants} options={navOptionHandler}/>
      
      <StackSplash.Screen name="appProfilEC"  component={ProfilHome} options={navOptionHandler} {...props}/>
      <DrawerEC.Screen name="PostECDEtail" component={PostECDEtail} {...props} options={{
                    headerShown: false,
                 
        }}/> 
      <StackSplash.Screen name="appDetailProfilEC"  component={DetailProfilEC} options={navOptionHandler}/> 
      <StackSplash.Screen name="profil"  component={Profil} options={navOptionHandler}/>
      <StackSplash.Screen name="ecDetail"  component={PostECDEtail} options={navOptionHandler}/>
      <StackSplash.Screen name="ProfilEC"  component={ProfilEC} options={navOptionHandler}/>
      <StackSplash.Screen name="EditProfileEC"  component={EditProfilEC} options={navOptionHandler}/>
      <StackSplash.Screen name="detailec"  component={DetailEC} options={navOptionHandler}/>
      <StackSplash.Screen name="profilApp"  component={ProfilApp} options={navOptionHandler}/>
      <StackSplash.Screen name="EditProfile"  component={EditProfilApp} options={navOptionHandler}/>
      <StackSplash.Screen name="resetPassword"  component={ForgotPassword} options={navOptionHandler}/>
    </StackSplash.Navigator>
    </NavigationContainer>
    </themeContext.Provider>
   
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

