import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import st from './../../../assets/styles'
import colors from './../../../assets/colors'

import {
  Content,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Body
} from 'native-base'

class Juz extends Component {
  render() {
    const juzList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    const getListOfJuz = () => {
      return juzList.map(i => (
        <ListItem icon key={i} onPress={() => this.props.goToJuz(i)}>
          <Left>
            <Button transparent>
              <Text style={{ color: colors.grey }}>{i}</Text>
            </Button>
          </Left>
          <Body>
            <Text style={st.txtBoldPrimary}>Juz {i}</Text>
          </Body>
          <Right>
            <Text style={st.txtArabicBoldPrimary}>جُزْءْ</Text>
          </Right>
        </ListItem>
      ))
    }

    return (
      <Content style={{ backgroundColor: colors.backgroundColor }}>
        <List>
          {!this.props.isLoading &&
            getListOfJuz()
          }
        </List>
      </Content>
    );
  }
}

export default Juz