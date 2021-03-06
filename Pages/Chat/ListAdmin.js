//list s7i7a
//ListAdmin


import React, { useState, useEffect ,useRef} from "react";
import { ScrollView, Text, View, Animated,StyleSheet ,TouchableOpacity,Image,TextInput} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';
import { ListItem, Avatar } from "react-native-elements";
import  firebase from 'firebase';
import ActionButton from 'react-native-action-button';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontAwesome,FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
const HEADER_HEIGHT = 170;

const AnimatedHeader = ({ animatedValue,navigation }) => {



  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 170,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#1f487e",
  borderBottomEndRadius:25,
  borderBottomLeftRadius:25
      }}>
{/* Open Drawer Button */}
<TouchableOpacity onPress={()=>navigation.openDrawer()} style={{marginTop:-5}}>
          <Icon name="sort" size={30} color={"#fff"}/>
                           </TouchableOpacity>

                           <View style={{alignContent:'center',alignItems:'center', marginTop:50}}>
            <Text style={styles.headerTitle}>List Entreprises conventionnées</Text>
</View>
{/* Open DrawerNotification*/}

{/* Open DrawerNotification*/}
<TouchableOpacity style={{marginTop:-5}}>
        <Icon name="notifications-none" size={28} color={"#fff"} />
        </TouchableOpacity>


{/* Search Input*/}
        <View style={styles.inputContainer}    
        //blurOnSubmit={false}
        >
              <Icon name="search" size={28} />
              <TextInput
                placeholder="Search place"
                style={{color:"#dddedd"}}
              />
            </View>
 {/*
 <View
      style={{
        backgroundColor: "#1f487e",    
        paddingHorizontal: 20,
        borderBottomLeftRadius:45,
        borderBottomRightRadius:45,    
        paddingHorizontal:20,
      }}>
    
    </View>  
    */}    
    </View>



       
  );
};
const ListAdmin = ({props,navigation}) => {
  const offset = useRef(new Animated.Value(0)).current;
  const [users, setUsers] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
      firebase.firestore().collection("users").onSnapshot((querySnapshot) => {
      
          const users = [];
         
          querySnapshot.docs.forEach((doc) => {
      
            const {email} = doc.data();
            users.push({
              id: doc.id,
              email,
            });
            
          });
        
     
      setUsers(users);
      setFilteredData(users);

    });
  }, []);


  const searchFilterFunction = (text) => {
    if(text){  
        const newData = users.filter(item => {
            const itemData = item.email ? item.email.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        setFilteredData(newData);
    } else {
        setFilteredData(users);
    }
}

    return (
      <SafeAreaProvider>     
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>   

  
{/* ---Header--- */}     
      <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 170,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#1f487e",
  borderBottomEndRadius:25,
  borderBottomLeftRadius:25
      }}>
{/* Open Drawer Button */}
<TouchableOpacity onPress={()=>navigation.openDrawer()} style={{marginTop:-5}}>
          <Icon name="sort" size={30} color={"#fff"}/>
                           </TouchableOpacity>
                           <View style={{alignContent:'center',alignItems:'center', marginTop:50}}>
            <Text style={styles.headerTitle}>List Entreprises conventionnées</Text>
</View>
{/* Open DrawerNotification*/}
<TouchableOpacity style={{marginTop:-5}}>
        <Icon name="notifications-none" size={28} color={"#fff"} />
        </TouchableOpacity>
{/* Search Input*/}
        <View style={styles.inputContainer}    
        //blurOnSubmit={false}
>
              <Icon name="search" size={28} />
              <TextInput
                placeholder="Search Entreprise"
                style={{color:"#dddedd"}}
                onChangeText={(text) => searchFilterFunction(text)}
              />
            </View>   
    </View>
{/* ---Header--- */}   

        <ScrollView
   style={{ flex: 1, backgroundColor: 'white' }}
   contentContainerStyle={{
     alignItems: 'center',
     paddingTop: 220,
     paddingHorizontal: 20
   }}
   showsVerticalScrollIndicator={false}
   scrollEventThrottle={16}
   onScroll={Animated.event(
     [{ nativeEvent: { contentOffset: { y: offset } } }],
     { useNativeDriver: false }
   )}>
          
       


             {users.map((user) => {

               
          return (
            
           <View style={{ marginBottom: -5}}>
 
<Card
   key={user.id}
   bottomDivider
   onPress={() => {
    navigation.navigate("chat", {
      userId: user.id,
    });
  }}
style={{padding: 10, margin: 10 , width:370,height:100,borderRadius:25,  elevation: 15,marginBottom:20}}>
  

              <View style={{marginTop:-90,marginLeft:100}}>

        <Text style={{marginTop:100,fontSize:20,marginLeft:-80}}>{user.email}</Text>
     
     

        
              </View>
    
     
            
      </Card>
 
             </View>
               
            
          );
        })}



        
        </ScrollView>
 
      </SafeAreaView>


    </SafeAreaProvider>




    /*     
        <Button
          onPress={() => navigation.navigate("creatuser")}
          title="Create User"
        />
        
      <Card style={{padding: 10, margin: 10 , borderRadius:25,elevation:5}}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </Card>

        {users.map((user) => {
          return (
            <ListItem
              key={user.id}
              bottomDivider
              onPress={() => {
                navigation.navigate("userdetail", {
                  userId: user.id,
                });
              }}
            >
              <ListItem.Chevron />             
             <Avatar
              source={user.imageUrl && {uri: user.imageUrl }}
                rounded
              />
            
              <ListItem.Content>
                <ListItem.Subtitle>{user.name}</ListItem.Subtitle>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                <ListItem.Subtitle>{user.password}</ListItem.Subtitle>

                </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>

    */
    
    
    );
  };
  const styles = StyleSheet.create({
    inputContainer: {
      height: 60,
      width: '100%',
      backgroundColor: "#fff",
      borderRadius: 10,
      position: 'absolute',
      top: 50,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      elevation: 12,
    marginLeft:20,
    marginTop:80
         },
    cartCard: {
      height: 100,
      elevation: 15,
      borderRadius: 10,
      backgroundColor: "white",
      marginVertical: 10,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      color: "#fff",
      fontWeight: 'bold',
      fontSize: 18,
    },
    buttonImage:{
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor:"#1f487e",
     marginLeft:130
  
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
      borderRadius:45,
      marginBottom:20
  
    },
    container: {
      flex: 1,
      padding: 35,
    },
    footer: {
      flex: Platform.OS === 'ios' ? 3 : 5,
      paddingHorizontal:35,
      paddingVertical: 10,
      marginTop:40
  },
  footer1: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    paddingHorizontal: 35,
    paddingVertical: 10
  },
  textInput1: {
    flex: 1,
    padding: 3,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
  },
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: "#1f487e",
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  
  
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  
  });
export default ListAdmin