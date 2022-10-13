import React, { Component } from 'react'
import { Text } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'
import moment from 'moment'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
  Tabs,
  Tab,
  TabHeading
} from 'native-base'

import ArchHeader from './../../components/ArchHeader'

import LiveBroadcast from './tabs/LiveBroadcast'
import ListBroadcast from './tabs/ListBroadcast'

class Broadcasting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    return (
      <Container>
        <ArchHeader title="Broadcasting" isLoading={this.state.isLoading} hasTabs={true} />
        <Tabs tabBarUnderlineStyle={st.tabs}>
          <Tab tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>Start</Text>
              </TabHeading>
            }
          >
            <LiveBroadcast isLoading={this.state.isLoading} />
          </Tab>
          <Tab tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>List</Text>
              </TabHeading>
            }
          >
            <ListBroadcast navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Broadcasting
