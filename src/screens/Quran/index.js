import React, { Component } from "react";
import { Text, Alert, View } from "react-native";
import colors from "./../../assets/colors";
import { observer, inject } from "mobx-react";

import { Container, Content, Tabs, Tab, TabHeading } from "native-base";

import * as quranService from "./../../services/quran";

import st from "./../../assets/styles";
import ArchHeader from "./../../components/ArchHeader";

import Surah from "./tabs/Surah";
import Juz from "./tabs/Juz";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";

class QuranScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      surahs: [],
    };
  }

  componentDidMount() {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    this.getQuranSurahs();
  }

  getQuranSurahs = () => {
    console.log("request send");
    // this.setState({ isLoading: true })
    let formdata = new FormData();
    fetch("https://api.quran.com/api/v4/chapters?language=en", {
      method: "GET",
    })
      .then((response) => response.json())

      .then((responsejosn) => {
        console.log("Response", responsejosn);
        this.setState({ surahs: responsejosn.chapters });
        this.setState({ isLoading: false });
      });

    // this.setState({ isLoading: true })
    // quranService.getSurahs().then(res => {
    //   const response = res.data
    //   if (response.code === 200) {
    //     this.setState({ surahs: response.data})
    //   } else {
    //     Alert.alert('Error', response.status)
    //   }

    //   this.setState({ isLoading: false})
    // }).catch(error => {
    //   if (!error.status) {
    //     Alert.alert('Error', 'Network Error')
    //   }

    //   this.setState({ isLoading: false})
    // })
  };

  goToSurah = (surah) => {
    this.props.navigation.navigate("QuranDetail", {
      isSurah: true,
      surah: surah,
    });
  };

  goToJuz = (juz) => {
    this.props.navigation.navigate("QuranDetail", {
      isSurah: false,
      juz: juz,
    });
  };

  render() {
    const { userStore } = this.props.store;
    return (
      <Container>
        <View style={{ height: 0 }} />
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
            Quran
          </Text>
        </LinearGradient>
        <Tabs tabBarUnderlineStyle={st.tabs}>
          <Tab
            tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>Surah</Text>
              </TabHeading>
            }
          >
            <Surah
              isLoading={this.state.isLoading}
              surahList={this.state.surahs}
              goToSurah={(surah) => this.goToSurah(surah)}
            />
          </Tab>
          <Tab
            tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>Juz</Text>
              </TabHeading>
            }
          >
            <Juz
              isLoading={this.state.isLoading}
              goToJuz={(juz) => this.goToJuz(juz)}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default inject("store")(observer(QuranScreen));
