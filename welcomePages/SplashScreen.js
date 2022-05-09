//Wave
import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
//import LinearGradient from 'react-native-linear-gradient';
import ImageBlurShadow from '../welcomePages/style/ImageBlurShadow';


const SplashScreen = ({navigation}) =>  {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
setTimeout(() => {
  navigation.navigate('login') ;
}, 3000);
  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: Dimensions.get('window').width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    }).start();
  }, [moveAnim, fadeAnim]);

  return (
    <SafeAreaView style={styles.container } >
      <View     
    style = {{
     top: '30%',
     marginLeft:-50,
     alignItems: 'center',
   }}>
       <ImageBlurShadow
          style={{marginLeft:-350 , top:'-5%'}}
          source={require('../assets/images/log.png')}
          imageWidth={500}
          imageHeight={250}
          imageBorderRadius={22}
          shadowOffset={40}
          shadowBlurRadius={12}
          shadowBackgroundColor={'#ffffff'}
        />

<Animated.View style={[styles.logoContainer, {marginLeft: moveAnim}]}>
          <Text style={[styles.logoText]}>T</Text>
          <Animated.Text style={[styles.logoText, {opacity: fadeAnim}]}>
          raineeship
          </Animated.Text>
        </Animated.View>
      </View>
    
      
  
    </SafeAreaView>
    
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',  
  },
  image: {
    marginLeft:-350,
    width: 500,
    height: 200,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  }, 
  bottomWavy: {
    position: 'absolute',
    bottom: -55,
  },

  logoText: {
    fontSize: 35,
    color: '#161c6b',
    fontWeight: '700',
    top:'-15%',
  
  },
  image: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    flexDirection: 'row',

  },
});