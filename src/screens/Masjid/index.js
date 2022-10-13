import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import colors from "./../../assets/colors";
import st from "./../../assets/styles";

import MapView, { Marker } from "react-native-maps";
import getDistance from "geolib/es/getDistance";
import openMap from "react-native-open-maps";

import * as locationService from "./../../services/location";

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
  Input,
  Item,
  Thumbnail,
  Icon,
} from "native-base";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";

import ArchHeader from "./../../components/ArchHeader";

class Masjid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isListLoading: false,
      latitude: 0,
      longitude: 0,
      masjids: [],
    };
  }

  componentDidMount() {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    locationService.requestLocationPermission((isGranted) => {
      if (isGranted) {
        this.setState({ isLoading: true });
        locationService.getLocation((coords) => {
          console.log(coords);
          if (coords != null) {
            this.setState({ isListLoading: true });
            locationService
              .getNearbyMasjids(coords.latitude, coords.longitude)
              .then((res) => {
                if (res.status === 200) {
                  const results = res.data.results;
                  if (results.length > 0) this.setState({ masjids: results });
                } else {
                  Alert.alert("Error", response.status);
                }
                this.setState({ isListLoading: false });
              })
              .catch((error) => {
                if (!error.status) {
                  Alert.alert("Error", "Network Error");
                }

                this.setState({ isListLoading: false });
              });

            this.setState({
              latitude: coords.latitude,
              longitude: coords.longitude,
              isLoading: false,
            });
          }
        });
      }
    });
  }

  goToMap = (lat, long) => {
    openMap({ latitude: lat, longitude: long });
  };

  render() {
    const getListOfMasjid = () => {
      if (this.state.masjids.length > 0) {
        return this.state.masjids.map((masjid, index) => {
          const ref =
            (masjid.photos && masjid.photos.length) > 0
              ? masjid.photos[0].photo_reference
              : null;
          const icon = masjid.icon;

          const masjidLat = masjid.geometry.location.lat;
          const masjidLong = masjid.geometry.location.lng;

          const mDistance = getDistance(
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
            {
              latitude: masjidLat,
              longitude: masjidLong,
            }
          );

          const distance = parseInt(mDistance) / 1000;
          const fixDistance = distance.toFixed(1);

          return (
            <ListItem
              avatar
              key={index}
              style={{ marginTop: 5, marginBottom: 10 }}
            >
              <Left>
                {ref != null && (
                  <Thumbnail
                    square
                    source={{
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${ref}&key=AIzaSyBuwq2z4lsEb6ve5s_PwSMJnuNlTgnU9bY`,
                    }}
                  />
                )}
                {ref === null && <Thumbnail square source={{ uri: icon }} />}
              </Left>
              <Body>
                <Text style={st.txtLarge} numberOfLines={1}>
                  {masjid.name}
                </Text>
                <Text note>
                  <Icon
                    name="md-locate"
                    style={{
                      fontSize: 20,
                      color: colors.primaryColor,
                      marginTop: 15,
                      marginRight: 10,
                    }}
                  />{" "}
                  {fixDistance} km
                </Text>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => this.goToMap(masjidLat, masjidLong)}
                >
                  <Icon
                    name="md-navigate"
                    style={{ fontSize: 30, color: colors.primaryColor }}
                  />
                </Button>
              </Right>
            </ListItem>
          );
        });
      } else {
        return <View />;
      }
    };

    return (
      <Container>
        <ArchHeader title="Masjid Finder" isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
          <View style={st.viewInput}>
            <Item regular style={st.itemInput}>
              <Input placeholder="Search" placeholderTextColor="white" />
            </Item>
          </View>
          <View style={{ flex: 1 }}>
            {!this.state.isLoading && (
              <MapView
                initialRegion={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0083,
                  longitudeDelta: 0.0074,
                }}
                style={{ height: 300 }}
              >
                {!this.state.isListLoading &&
                  this.state.masjids.length > 0 &&
                  this.state.masjids.map((masjid, i) => (
                    <Marker
                      key={i}
                      coordinate={{
                        latitude: masjid.geometry.location.lat,
                        longitude: masjid.geometry.location.lng,
                      }}
                      title={masjid.name}
                      description={masjid.vicinity}
                    />
                  ))}
              </MapView>
            )}
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            {!this.state.isListLoading && getListOfMasjid()}
          </View>
        </Content>
      </Container>
    );
  }
}

export default Masjid;
