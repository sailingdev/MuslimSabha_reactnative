import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import colors from "./../../assets/colors";
import st from "./../../assets/styles";

import { Container, Content } from "native-base";
// import WaveForm from 'react-native-audiowaveform'

import ArchHeader from "./../../components/ArchHeader";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    return (
      <Container>
        <ArchHeader title="Play Broadcast" isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
          {/* <WaveForm
            source={require('./../../assets/audio/fajr.mp3')}
            waveFormStyle={{waveColor:'red', scrubColor:'white'}}
          >
          </WaveForm> */}
        </Content>
      </Container>
    );
  }
}

export default Event;
