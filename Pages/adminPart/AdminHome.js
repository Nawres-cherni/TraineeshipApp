//AdminHome s7i7a
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
import places from '../places';
import  firebase from 'firebase';

const {width} = Dimensions.get('screen');


const AdminHome = ({navigation}) => {
  const categoryIcons = [
    <Icon name="flight" size={25} color={"#001845"} />,
    <Icon name="beach-access" size={25} color={"#001845"} />,
    <Icon name="near-me" size={25} color={"#001845"} />,
    <Icon name="place" size={25} color={"#001845"} />,
  ];

  const [Quote, setQuote] = useState('Loading...');
    const [Author, setAuthor] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    const randomQuote = () => {
      setIsLoading(true);
      fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      })
    }
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
    useEffect(() => {
      randomQuote();
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
    }, []);

    if (initializing) return null;
 

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', place)}>
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={20} color={"#fff"} />
              <Text style={{marginLeft: 5, color: "#fff"}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={20} color={"#fff"} />
              <Text style={{marginLeft: 5, color: "#fff"}}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({place}) => {

  
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={22} color={"#fff"} />
              <Text style={{color: "#fff", marginLeft: 5}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={22} color={"#fff"} />
              <Text style={{color: "#fff", marginLeft: 5}}>5.0</Text>
            </View>
          </View>
          <Text style={{color: "#fff", fontSize: 13}}>
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
   
      <View style={style.header}>

      <TouchableOpacity onPress={()=>navigation.openDrawer()}>
      <Icon name="sort" size={28} color={"#fff"} />
                       </TouchableOpacity>
       
        <Icon name="notifications-none" size={28} color={"#fff"} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#1f487e",
            height: 90,
            paddingHorizontal: 20,
            borderBottomLeftRadius:45,
            borderBottomRightRadius:45,
            paddingHorizontal:20,
          }}>
          <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
            <Text style={style.headerTitle}>Welcome {user.email}</Text>
            <Text style={style.headerTitle}>Accueil</Text>
           
           
            <View
        style={style.inputContainer}>
           <Text
          style={{        
            fontSize: 18,
            fontWeight: '200',
            color: '#001845',
          marginTop:-170,
          marginLeft:80
           
          }}>
          Quote of the Day
        </Text>
          <View style={{marginLeft:-240}}>
          </View>
        <FontAwesome5
          name="quote-left"
          style={{
           // fontSize: 20,
             marginBottom: 100}}
          color="#000"
        />
        <Text
          style={{
            color: '#000',
            //fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            fontWeight: '400',
            textAlign: 'center',
           // marginBottom: 10,
            //paddingHorizontal: 30,
          }}>
          {Quote}
        </Text>
        <FontAwesome5
          name="quote-right"
          style={{
            //fontSize: 20,
            textAlign: 'right',
            marginTop: -20,
            marginBottom: -100,
          }}
          color="#000"
        />
        <Text
          style={{
            textAlign: 'right',
            fontWeight: '300',
            fontStyle: 'italic',
            fontSize: 16,
            color: '#000',
            marginTop:180,
            marginLeft:-200
          }}>
          —— {Author}
        </Text>
       {/*
<TouchableOpacity
          onPress={randomQuote}
          style={{
            backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
            padding: 20,
            borderRadius: 10,
            marginVertical: 20,
          }}>
          <Text style={{color: '#fff', 
          //fontSize: 18, 
          textAlign: 'center'}}>
            {isLoading ? "Loading..." : "New Quote"}
          </Text>
        </TouchableOpacity>
        */ } 

      </View>
          </View>
        </View>
       {/*  <ListCategories />*/}
        <Text style={style. sectionTitle1}>Places</Text>
    
<View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />
        </View>
        <View style={{marginBottom:90}}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1f487e",
    
  },
  headerTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    
  },
  inputContainer: {
    height: 220,
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    position: 'absolute',
    top: 150,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: "#e1e8e9",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle1: {
    marginTop:260,
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default AdminHome;