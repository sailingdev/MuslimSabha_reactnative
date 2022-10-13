import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import {
  Button,
} from 'native-base'
import st from './../assets/styles'
import iosStyle from './../assets/iosStyles'
import colors from './../assets/colors'

class ArchRoundedButton extends Component {
  render() {
    const { navigation, text } = this.props

    if (Platform.OS === 'ios') {
      return (
        <View style={iosStyle.btnView}>
          <Button rounded light style={iosStyle.btnRounded} onPress={() => navigation.navigate('MainStack')}>
            <Text style={{ color: colors.primaryColor, fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>{text}</Text>
          </Button>
        </View>
      )
    }

    // return (
    //   <View style={{ alignSelf: 'stretch', marginTop: 10 }}>
    //     <Button rounded style={st.btnRounded} onPress={() => navigation.navigate('MainStack')}>
    //       <Text style={{ color: colors.primaryColor, fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>{text}</Text>
    //     </Button>
    //   </View>
    // )
    return (
      <View style={iosStyle.btnView}>
        <TouchableOpacity style={st.btnRounded} onPress={() => navigation.navigate('MainStack')}>
          <Text style={{ color: colors.primaryColor, fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>{text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ArchRoundedButton
