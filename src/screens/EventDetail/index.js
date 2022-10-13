import React, { Component } from 'react'
import { View, Text } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'

import {
  Container,
  Content,
} from 'native-base'

import ArchHeader from './../../components/ArchHeader'
import ArchHero from './../../components/ArchHero'

class Qibla extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
      const event = {
        title: 'Upgrad.ID Event',
        time: 'Monday, 7th Oct 7:45pm',
        location: 'Jl. Manunggal 2, Jakarta, Jakarta Raya',
      }

    return (
      <Container>
        <ArchHeader title="Event Detail" isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
            <ArchHero for='event' uri='https://upgrad.id/public/event/defaultevent.png' event={event} />

            <View style={{
                margin: 20,
            }}>
                <Text style={{
                    lineHeight: 20
                }}>In the following example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines.</Text>
                
                <Text style={{
                    lineHeight: 20,
                    marginTop: 10
                }}>In the following example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines.</Text>
            </View>
        </Content>
      </Container>
    );
  }
}

export default Qibla
