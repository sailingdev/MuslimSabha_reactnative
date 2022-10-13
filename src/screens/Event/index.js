import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'
import moment from 'moment'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'

import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Body
} from 'native-base'

import ArchHeader from './../../components/ArchHeader'

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    return (
      <Container>
        <ArchHeader title="Events" isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
          <Card transparent style={{marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}>
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('EventDetail')}>
              <Image source={{uri: 'https://upgrad.id/public/event/defaultevent.png'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem button onPress={() => this.props.navigation.navigate('EventDetail')}>
              <Body style={{ borderBottomWidth: 2, paddingBottom: 10, borderBottomColor: colors.grey }}>
                <Text style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}>Upgrad.ID Event</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="time" style={{fontSize: 20, color: colors.primaryColor}} />
                  <Text style={{paddingLeft: 5}}>Monday, 7th Oct 7:45pm</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="pin" style={{fontSize: 20, color: colors.primaryColor, paddingLeft: 2}} />
                  <Text style={{paddingLeft: 5}}>Jl. Manunggal 2, Jakarta, Jakarta Raya</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('EventDetail')}>
              <Image source={{uri: 'https://upgrad.id/public/event/defaultevent.png'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem button onPress={() => this.props.navigation.navigate('EventDetail')}>
              <Body style={{ borderBottomWidth: 2, paddingBottom: 10, borderBottomColor: colors.grey }}>
                <Text style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}>Upgrad.ID Event</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="time" style={{fontSize: 20, color: colors.primaryColor}} />
                  <Text style={{paddingLeft: 5}}>Monday, 7th Oct 7:45pm</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="pin" style={{fontSize: 20, color: colors.primaryColor, paddingLeft: 2}} />
                  <Text style={{paddingLeft: 5}}>Jl. Manunggal 2, Jakarta, Jakarta Raya</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Event
