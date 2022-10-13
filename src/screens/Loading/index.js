import React, { Component } from 'react'
import { Container, Content, Spinner } from 'native-base'
import Geocoder from 'react-native-geocoding'
import auth from '@react-native-firebase/auth'
import {View,Text, ImageBackground, StatusBar, Image} from 'react-native';
import colors from '../../assets/colors'

class LoadingScreen extends Component {
  // check if user is already logged in
  componentDidMount() {
    Geocoder.init('AIzaSyBC0KVa-UF8wZMv9JRMUmbflqVAVP4BktI', {language : 'en'})
    
    const surah = {
      number: 2,
      name: 'سورة البقرة',
      englishName: 'Al-Baqara',
      englishNameTranslation: 'The Cow',
      numberOfAyahs: 286,
      revelationType: 'Medinan'
    }

    // auth().onAuthStateChanged(user => {
      this.props.navigation.navigate('MainStack');
      // this.props.navigation.navigate(user ? 'LoginStack' : 'MainStack'); //-- MainStack
    // });
  }

  render() {
    return (
      <ImageBackground 
      source={require('../../assets/images/Splash.png')}
      style={{
        flex:1,
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
      }}
      >
      <StatusBar translucent backgroundColor="transparent"/>
      <Image
      style={{
        height:'30%',
        width:'30%',
        resizeMode:'contain'
      }}
        source={require('../../assets/images/SplashIcon.png')}
      />
      </ImageBackground>
      // <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Spinner color={colors.primaryColor} />
      // </Container>
    );
  }
}

export default LoadingScreen
