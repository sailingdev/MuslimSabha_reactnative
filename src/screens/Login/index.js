import React, { Component } from 'react'
import { View, Text, Alert, StatusBar, Image, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from './../../assets/colors'
import st from './../../assets/styles'

import { observer, inject } from 'mobx-react'
import {
  Button,
} from 'native-base'

import ArchRoundedButton from './../../components/ArchRoundedButton'
import ArchInput from './../../components/ArchInput'

class LoginScreen extends Component {
  componentDidMount() {}

  render() {
    const { userStore } = this.props.store;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.primaryColor} barStyle="light-content" />
        <LinearGradient colors={[colors.primaryColor, colors.secondaryColor, colors.primaryColor]} style={st.centerView}>
          <View style={st.contentForm}>
            <Image source={require(`./../../assets/images/logo.png`)} resizeMode='contain' style={st.logoImage}  />

            <View style={st.separator} />

            <ArchInput name='email' />
            <ArchInput name='password' />
            <View style={{ flexDirection:'row' }}>
              <Button transparent>
                <Text style={{ color: 'white' }}>Forgot your password?</Text>
              </Button>
              <Button transparent style={{ marginLeft: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Click Here</Text>
              </Button>
            </View>

            <ArchRoundedButton text='LOGIN' navigation={this.props.navigation} />
          </View>
          <View style={{ flexDirection:'row', marginBottom: Platform.OS === 'ios' ? 30 : 5 }}>
            <Button transparent>
              <Text style={{ color: 'white' }}>New here?</Text>
            </Button>
            <Button transparent style={{ marginLeft: 5 }} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Register Now</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default inject('store')(observer(LoginScreen))
