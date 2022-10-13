import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import st from './../../../assets/styles'
import colors from './../../../assets/colors'

import {
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Right,
  Body,
  Button,
  Icon
} from 'native-base'

class ListBroadcast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6]
    }
  }

  playBroadcast = () => {
    this.props.navigation.navigate('BroadcastPlayer')
  }

  render() {
    // const getListofBroadcast = () => {
    //   this.state.numbers.maps(index => (
    //     <ListItem avatar key={index} style={{ marginTop: 5, marginBottom: 10 }}>
    //       <Left>
    //         <Thumbnail square source={{ uri: icon }} />
    //       </Left>
    //       <Body>
    //         <Text style={st.txtLarge} numberOfLines={1}>Masjid Name</Text>
    //         <Text note><Icon name='md-people' style={{fontSize: 20, color: colors.grey, marginTop: 15, marginRight: 10}} />10</Text>
    //       </Body>
    //       <Right>
    //         <Button transparent onPress={() => this.playBroadcast()}>
    //           <Icon name='md-play' style={{fontSize: 30, color: colors.primaryColor}} />
    //         </Button>
    //       </Right>
    //     </ListItem>
    //   ))
    // }

    return (
      <Content style={{ backgroundColor: colors.backgroundColor }}>
        <List>
          <ListItem avatar style={{ marginTop: 5, marginBottom: 10 }}>
            <Left>
              <Thumbnail square source={{ uri: `https://cdn.onlinewebfonts.com/svg/img_515601.png` }} />
            </Left>
            <Body>
              <Text style={st.txtLarge} numberOfLines={1}>Masjid Name</Text>
              <Text note><Icon name='md-people' style={{fontSize: 20, color: colors.grey, marginTop: 15, marginRight: 10}} />10</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.playBroadcast()}>
                <Icon name='md-play' style={{fontSize: 30, color: colors.primaryColor}} />
              </Button>
            </Right>
          </ListItem>
          <ListItem avatar style={{ marginTop: 5, marginBottom: 10 }}>
            <Left>
              <Thumbnail square source={{ uri: `https://cdn.onlinewebfonts.com/svg/img_515601.png` }} />
            </Left>
            <Body>
              <Text style={st.txtLarge} numberOfLines={1}>Masjid Name</Text>
              <Text note><Icon name='md-people' style={{fontSize: 20, color: colors.grey, marginTop: 15, marginRight: 10}} />10</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.playBroadcast()}>
                <Icon name='md-play' style={{fontSize: 30, color: colors.primaryColor}} />
              </Button>
            </Right>
          </ListItem>
          <ListItem avatar style={{ marginTop: 5, marginBottom: 10 }}>
            <Left>
              <Thumbnail square source={{ uri: `https://cdn.onlinewebfonts.com/svg/img_515601.png` }} />
            </Left>
            <Body>
              <Text style={st.txtLarge} numberOfLines={1}>Masjid Name</Text>
              <Text note><Icon name='md-people' style={{fontSize: 20, color: colors.grey, marginTop: 15, marginRight: 10}} />10</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.playBroadcast()}>
                <Icon name='md-play' style={{fontSize: 30, color: colors.primaryColor}} />
              </Button>
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}

export default ListBroadcast