import React, { Component } from 'react'
import st from './../assets/styles'

import {
  Input,
  Item,
} from 'native-base'

class ArchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'transparent'
    }
  }

  componentDidMount() {
    this.getPlaceholder(this.props.name)
  }

  getPlaceholder = (name) => {
    switch (name) {
      case 'email':
        this.setState({
          placeholder: 'Email Address'
        })
        break;
      case 'password':
        this.setState({
          placeholder: 'Password'
        })
        break;
      case 'repeatPassword':
        this.setState({
          placeholder: 'Repeat Password'
        })
        break;
      case 'mobile':
        this.setState({
          placeholder: 'Mobile'
        })
        break;
      case 'location':
        this.setState({
          placeholder: 'Location'
        })
        break;
      case 'address':
        this.setState({
          placeholder: 'Address'
        })
        break;
      default:
        this.setState({
          placeholder: 'Username'
        })
    }
  }

  onFocus = () => {
    this.setState({
      backgroundColor: '#fff'
    })
  }

  onBlur = () => {
    this.setState({
      backgroundColor: 'transparent'
    })
  }

  render() {
    const getContentType = (name) => {
      switch (name) {
        case 'email':
          return 'emailAddress'
          break;
        case 'password':
          return 'password'
          break;
        case 'repeatPassword':
          return 'password'
          break;
        case 'mobile':
          return 'telephoneNumber'
          break;
        case 'location':
          return 'addressCity'
          break;
        case 'address':
          return 'fullStreetAddress'
          break;
        default:
          return 'none'
          break;
      }
    }

    return (
      <Item rounded style={st.loginInput}>
        <Input placeholder={this.state.placeholder}
          placeholderTextColor='white'
          secureTextEntry={(this.props.name == 'password' || this.props.name == 'repeatPassword') ? true : false}
          textContentType={getContentType(this.props.name)}
          autoCapitalize={(this.props.name == 'password' || this.props.name == 'repeatPassword' || this.props.name == 'username' || this.props.name == 'email') ? 'none' : 'sentences'}
          style={{ color: 'white', textAlign: 'center', backgroundColor: this.state.backgroundColor }}
          onFocus={() => this.onFocus()}
          onFocus={() => this.onBlur()}
        />
      </Item>
    )
  }
}

export default ArchInput