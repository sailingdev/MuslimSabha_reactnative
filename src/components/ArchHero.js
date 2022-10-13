import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import {
  Text,
  Icon
} from 'native-base'
import moment from 'moment'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { AnimatedCircularProgress } from 'react-native-circular-progress'

import st from './../assets/styles'
import colors from './../assets/colors'

class ArchHero extends Component {
  render() {
    const { currentTime, currentDate, timings } = this.props

    let fill = 0
    if (timings) {
      let now = moment(Date.now()).format('DD/MM/YYYY HH:mm')
      let dateNow = moment(Date.now()).format('DD/MM/YYYY')

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' ' + timings.Fajr, 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' ' + timings.Sunrise, 'DD/MM/YYYY HH:mm'))) {
        fill = 15
      }

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' ' + timings.Sunrise, 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' ' + timings.Dhuhr, 'DD/MM/YYYY HH:mm'))) {
        fill = 30
      }

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' ' + timings.Dhuhr, 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' ' + timings.Asr, 'DD/MM/YYYY HH:mm'))) {
        fill = 45
      }

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' ' + timings.Asr, 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' ' + timings.Maghrib, 'DD/MM/YYYY HH:mm'))) {
        fill = 60
      }

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' ' + timings.Maghrib, 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' ' + timings.Isha, 'DD/MM/YYYY HH:mm'))) {
        fill = 75
      }

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' ' + timings.Isha, 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' 24:00', 'DD/MM/YYYY HH:mm'))) {
        fill = 90
      }

      if ((moment(now, 'DD/MM/YYYY HH:mm') >= moment(dateNow + ' 01:00', 'DD/MM/YYYY HH:mm')) &&
        (moment(now, 'DD/MM/YYYY HH:mm') < moment(dateNow + ' ' + timings.Imsak, 'DD/MM/YYYY HH:mm'))) {
        fill = 100
      }
    }

    return (
      <View style={st.cardHero}>
        {this.props.for == 'welcome' &&
          <Image source={require('./../assets/images/masjid-home.png')}
            style={st.imageHero}
          />
        }
        
        {this.props.for == 'event' &&
          <Image source={{uri: 'https://upgrad.id/public/event/defaultevent.png'}}
            style={st.imageHero}
          />
        }

        {this.props.for == 'prayer' &&
          <Image source={require('./../assets/images/masjid-home.png')}
            style={st.imageHero}
          />
        }
        
        {this.props.for == 'event' &&
          <View style={st.overlayWhite} />
        }
        
        {this.props.for == 'welcome' &&
          <View style={st.heroText}>
            <Text style={st.timeTitle}>{currentTime}</Text>
            <Text style={st.dateTitle}>{currentDate}</Text>
          </View>
        }

        {this.props.for == 'event' &&
          <View style={st.heroTextEvent}>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: 20
              }}>{this.props.event.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="time" style={{fontSize: 20, color: colors.primaryColor}} />
                <Text style={{paddingLeft: 5}}>Monday, 7th Oct 7:45pm</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="pin" style={{fontSize: 20, color: colors.primaryColor, paddingLeft: 2}} />
                <Text style={{paddingLeft: 5}}>Jl. Manunggal 2, Jakarta, Jakarta Raya</Text>
            </View>
          </View>
        }
        
        {this.props.for == 'prayer' &&
          <Grid style={{...StyleSheet.absoluteFillObject}}>
            <Row style={st.menuRow}>
              <Col>
                <View style={st.heroText, {paddingTop: 70, paddingLeft: 15}}>
                  <AnimatedCircularProgress
                    size={180}
                    width={20}
                    fill={fill}
                    arcSweepAngle={180}
                    rotation={270}
                    tintColor={colors.primaryColor}
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor={colors.backgroundColor}
                  />
                </View>
              </Col>
              <Col>
                <View style={st.heroText}>
                  <Text style={st.dateSubTitle}>{currentDate}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', height: null }}>
                    <Icon name='md-locate' style={{fontSize: 30, color: 'white', marginTop: 15, marginRight: 10}} />
                    <Text style={st.dateSubTitle}>{this.props.cityName}</Text>
                  </View>
                </View>
              </Col>
            </Row>
          </Grid>
        }
      </View>
    );
  }
}

export default ArchHero
