import React, { Component } from 'react'
import {
  Header,
  Body,
  Title,
  Left,
  Right,
  Spinner
} from 'native-base'
import st from './../assets/styles'
import colors from './../assets/colors'

class ArchHeader extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: colors.primaryColor }}
        androidStatusBarColor={colors.primaryColor}
        hasTabs={this.props.hasTabs ? true : false }
      >
        <Left style={{ flex: 1}} />
        <Body style={st.centerTitle}>
          <Title style={st.headerTitle}>{this.props.title}</Title>
        </Body>
        <Right style={{ flex: 1}}>
          {this.props.isLoading && <Spinner size='small' color='white' />}
        </Right>
      </Header>
    );
  }
}

export default ArchHeader
