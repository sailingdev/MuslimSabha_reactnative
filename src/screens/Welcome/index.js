import React, { Component } from "react";
import {
  StatusBar,
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { observer, inject } from "mobx-react";
import moment from "moment";
import { Container, Content, Spinner } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";

import * as calendarService from "./../../services/calendar";

import colors from "./../../assets/colors";
import st from "./../../assets/styles";
import ArchHero from "./../../components/ArchHero";
import ArchMenuButton from "./../../components/ArchMenuButton";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nowIs: moment().format("hh:mm A"),
      hijriDate: "",
    };
  }

  componentDidMount() {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
    this.getTodayTime();
    this.getTodayDate();
  }

  getTodayDate = () => {
    this.setState({ isLoading: true });
    calendarService
      .getTodayDate()
      .then((res) => {
        const response = res.data;
        const hijri = response.data.hijri;

        const day = hijri.day;
        const month = hijri.month.en;
        const year = hijri.year;
        const designation = hijri.designation.abbreviated;

        const hijriDate = day + " " + month + ", " + year + " " + designation;

        this.setState({
          hijriDate: hijriDate,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (!error.status) {
          Alert.alert("Error", "Network Error");
        }

        this.setState({ isLoading: false });
      });
  };

  getTodayTime = () => {
    setInterval(() => {
      let date = moment().format("hh:mm A");
      this.setState({
        nowIs: date,
      });
    }, 5000);
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container style={{ backgroundColor: "#1aae72" }}>
        {/* <StatusBar backgroundColor='#1aae72' barStyle="light-content" /> */}
        <Content style={{ backgroundColor: "#fff" }}>
          {/* <ArchHero for='welcome' currentTime={this.state.nowIs} currentDate={this.state.hijriDate} /> */}
          <LinearGradient
            colors={["#02967c", "#049e6a", "#06a558"]}
            style={{
              height: h("12%"),
              width: "100%",
              // backgroundColor:'#00918A',
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: h("2%"),
              }}
            >
              More Features
            </Text>
          </LinearGradient>
          <View
            style={{
              height: h("30%"),
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: h("10%"),
                width: "100%",
                justifyContent: "flex-end",
                marginTop: h("2%"),
              }}
            >
              <Image
                source={require("../../assets/images/diamond.png")}
                style={{
                  height: h("10%"),
                  width: "100%",
                  resizeMode: "contain",
                }}
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Upgrade to Sabha Premium
            </Text>
            <Text>Remove ads and unlock new features for</Text>
            <Text>and experience like never before.</Text>
            <TouchableOpacity
              style={{
                height: h("6%"),
                width: "55%",
                backgroundColor: "#1aae72",
                borderRadius: h("1%"),
                marginTop: h("1%"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Explore Premium Features</Text>
            </TouchableOpacity>
          </View>
          <Content>
            <Grid>
              <Row style={st.menuRow}>
                <Col style={st.menuCol}>
                  <ArchMenuButton
                    icon="broadcast"
                    onPress={() => navigation.navigate("PrayerTime")}
                  />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton
                    icon="prayer"
                    onPress={() => navigation.navigate("Quran")}
                  />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton
                    icon="qibla"
                    onPress={() => navigation.navigate("Dua")}
                  />
                </Col>
              </Row>
              <Row style={st.menuRow}>
                <Col style={st.menuCol}>
                  <ArchMenuButton
                    icon="masjid"
                    onPress={() => navigation.navigate("Setting")}
                  />
                </Col>
                {/* <Col style={st.menuCol}>
                  <ArchMenuButton
                    icon="quran"
                    onPress={() => navigation.navigate("More")}
                  />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton
                    icon="events"
                    onPress={() => navigation.navigate("Event")}
                  />
                </Col> */}
              </Row>
            </Grid>
          </Content>
        </Content>
      </Container>
    );
  }
}

export default inject("store")(observer(WelcomeScreen));
