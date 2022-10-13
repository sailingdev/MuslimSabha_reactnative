import React, { Component } from 'react'
import { View, Text, Alert, TouchableHighlight } from 'react-native'
import colors from './../../../assets/colors'

import {
  Content,
  Icon,
  Item,
  Input
} from 'native-base'

class LiveBroadcast extends Component {
  render() {
    return (
      <Content style={{ backgroundColor: colors.backgroundColor }}>
        <View style={{
          flex: 1,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            paddingBottom: 20,
            paddingTop: 20,
            fontSize: 25,
          }}>Enter Broadcast Name</Text>
          <Item regular>
            <Input placeholder="Broadcast Name" placeholderTextColor='white' />
          </Item>
        </View>
        <View style={{
          flex: 1,
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableHighlight
          style={style.highButton}
          underlayColor={colors.backgroundColor}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={style.iconButton}>
              <Icon name='ios-microphone' style={{fontSize: 60, color: 'white'}} />
            </View>
            <Text style={{
              flex: 1,
              fontSize: 25,
            }}>Start Broadcast</Text>
          </View>
        </TouchableHighlight>
        </View>
      </Content>
    );
  }
}

const style = {
  highButton: {
    flex: 1,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    width:120,
    height:120,
    padding: 15,
    borderRadius:60,
  },
  icon: {
    flex: 1,
    width: 45,
    height: undefined,
  },
  menuText: {
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 10
  }
}

export default LiveBroadcast