import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import React, { useEffect, useState,Component } from 'react'
const  store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBXvS-cUDNmD0h2betfplMSIyMTZb9GVb4",
  authDomain: "mobile-12b08.firebaseapp.com",
  projectId: "mobile-12b08",
  storageBucket: "mobile-12b08.appspot.com",
  messagingSenderId: "942531933715",
  appId: "1:942531933715:web:a581d030a35e2d0a94b1e6"
};
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
  }
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './welcomePages/SplashScreen';
import WelcomeScreen from './welcomePages/WelcomeScreen';
import Login from './Pages/auth/Login';
import Test from './Pages/auth/Test';
import MainScreen from './Pages/Main';
const Stack = createNativeStackNavigator();
export default class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View>
          <Text>Loaded</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer initialRouteName="test">
        <Stack.Navigator>
        <Stack.Screen name="test" component={Test} options={{headerShown: false}} />
        <Stack.Screen name="main" component={MainScreen} options={{headerShown: false}} />
          <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
          <MainScreen/>
        </Provider>

    )
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

