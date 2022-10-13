import React, { Component } from "react";
import {
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import colors from "./../../assets/colors";
import st from "./../../assets/styles";

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
  View,
  Spinner,
} from "native-base";

import Sound from "react-native-sound";
import { ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";
function setTestState(testInfo, component, status) {
  component.setState({
    tests: { ...component.state.tests, [testInfo.title]: status },
  });
}

class QuranDetail extends Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.pageX = 0;

    Sound.setCategory("Playback", true);
    this.stopSoundLooped = () => {
      console.log("Stop");
      if (!this.state.loopingSound) {
        return;
      }
      this.state.loopingSound.stop().release();
      this.setState({
        loopingSound: null,
        tests: { ...this.state.tests, ["mp3 in bundle (looped)"]: "win" },
      });
    };

    this.state = {
      isLoading: false,
      isLoadingMore: false,
      stopLoadingMore: false,
      title: "",
      ayahs: [],
      ayahs1: [],
      engaya: [],
      surah: {},
      page: 0,
      tajw: "",
      surahNo: "",
      play: false,
      loopingSound: undefined,
      tests: {},
      show: false,
      show1: false,
      show2: false,
      getJuzz: false,
      bismillah: "",
      en: "",
      translation: "",
    };
  }
  playSound(testInfo, component) {
    setTestState(testInfo, component, "pending");

    const callback = (error, sound) => {
      if (error) {
        Alert.alert("error", error.message);
        setTestState(testInfo, component, "fail");
        return;
      }
      setTestState(testInfo, component, "playing");
      testInfo.onPrepared && testInfo.onPrepared(sound, component);
      this.setState({ loopingSound: sound });
      sound.play(() => {
        setTestState(testInfo, component, "win");
        sound.release();
      });
    };

    if (testInfo.isRequire) {
      const sound = new Sound(testInfo.url, (error) => callback(error, sound));
    } else {
      const sound = new Sound(testInfo.url, testInfo.basePath, (error) =>
        callback(error, sound)
      );
    }
  }

  componentWillUnmount() {
    this.stopSoundLooped();
  }
  getTajweed = async () => {
    const tajw = await AsyncStorage.getItem("tajweed");
    const aaa = JSON.parse(tajw);
    this.setState({ tajw: aaa.tajweed });
    const tra = await AsyncStorage.getItem("value");
    const trans = await AsyncStorage.getItem("translate");
    const aaaa = JSON.parse(trans);
    this.setState({ transl: aaaa.translate });
    console.log("Translation", this.state.transl);
    this.setState({ trans: tra });
  };
  componentDidMount() {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    this.getTajweed();
    this.init((isSurah, surah, juz) => {
      if (isSurah) {
        this.getAyahsFromSurah(surah.number, false);
        var str = "" + this.props.navigation.state.params.surah.id;
        var pad = "000";
        var ans = pad.substring(0, pad.length - str.length) + str;
        // console.log("Answer", ans);
        this.setState({ surahNo: ans });
      } else {
        this.getAyahsFromJuz(juz, false);
      }
    });
  }

  init = (callback) => {
    const params = this.props.navigation.state.params;
    // console.log("PARAMS", params);
    if (params.isSurah === true) {
      this.setState({ show: true });
    }
    this.setState({
      title: params.surah ? params.surah.englishName : "Juz " + params.juz,
      surah: params.surah,
      juz: params.juz,
    });

    callback(params.isSurah, params.surah, params.juz);
  };

  getAyahsFromJuz = (number, isLoadingMore) => {
    // console.log("request send");
    fetch(
      "https://api.alquran.cloud/v1/juz/" +
        this.props.navigation.state.params.juz +
        "/ar.asad"
    )
      .then((res) => res.json())
      .then((response) => {
        var items = [];
        fetch(
          "https://api.alquran.cloud/v1/juz/" +
            this.props.navigation.state.params.juz +
            "/en.asad"
        )
          .then((res2) => res2.json())
          .then((response2) => {
            fetch(
              "https://api.quran.com/api/v4/verses/by_juz/" +
                this.props.navigation.state.params.juz +
                "?language=en&words=true&page=&per_page=50"
            )
              .then((res3) => res3.json())
              .then((response3) => {
                for (var i = 0; i < response3.verses.length; i++) {
                  items.push({
                    ArabicText: response.data.ayahs[i].text,
                    EnglishText: response2.data.ayahs[i].text,
                    RomanText: response3.verses[i].words,
                  });
                  console.log("ArabText", response.data.ayahs[i].text);
                  // console.log(response3.verses.length);
                }

                this.setState({ ayahs: items });
              })
              .then(() => {});
          })
          .then(() => {});
      });
  };

  getAyahsFromSurah = (number, isLoadingMore) => {
    // console.log("request send");

    fetch(
      `https://api.quran.sutanlab.id/surah/${
        this.props.navigation.state.params.surah.id
      }`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())

      .then((responsejosn) => {
        // console.log("Response", responsejosn.data.preBismillah);
        this.setState({
          ayahs: responsejosn.data.verses,
        });

        if (responsejosn.data.preBismillah !== null) {
          this.setState({
            ayahs: responsejosn.data.verses,
            bismillah: responsejosn.data.preBismillah.text.arab,
            en: responsejosn.data.preBismillah.text.transliteration.en,
            translation: responsejosn.data.preBismillah.translation.en,
          });
        }
        this.setState({ isLoading: false });
        console.log("state", JSON.stringify(this.state.ayahs, null, 2));
      });
  };

  getTranslation = () => {
    console.log("request send");
    let formdata = new FormData();
    fetch(
      `https://api.alquran.cloud/v1/surah/${
        this.props.navigation.state.params.surah.id
      }/en.asad`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())

      .then((responsejosn) => {
        this.setState({ ayahs1: responsejosn.data.ayahs });
        this.setState({ isLoading: false });
      });
  };
  _handleLoadMore = () => {
    if (this.state.stopLoadingMore) {
      return null;
    }

    this.page = this.page + 1;
    this.pageX = this.pageX + 10;
    this.setState({
      isLoadingMore: true,
    });

    this.init((isSurah, surah, juz) => {
      if (isSurah) {
        this.getAyahsFromSurah(surah.number, true);
      } else {
        this.getAyahsFromJuz(juz, true);
      }
    });
  };

  render() {
    const bismillah = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم";
    const en = "Bismi Allahi alrrahmani alrraheemi";
    const translation =
      "In the name of Allah, the Entirely Merciful, the Especially Merciful";
    const surat = "سورۃ  ";
    const getFooter = () => {
      if (!this.state.isLoadingMore) return null;

      return <Spinner color={colors.primaryColor} />;
    };
    const audio = [
      {
        url: `https://download.quranicaudio.com/quran/abdullaah_basfar/${
          this.state.surahNo
        }.mp3`,
      },
    ];

    return (
      <Container>
        <LinearGradient
          colors={["#02967c", "#049e6a", "#06a558"]}
          style={{
            height: h("12%"),
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {this.state.show === true ? (
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: h("2%"),
              }}
            >
              {this.props.navigation.state.params.surah.name_simple}
            </Text>
          ) : (
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: h("2%"),
              }}
            >
              Juzz {this.props.navigation.state.params.juz}
            </Text>
          )}
        </LinearGradient>
        <View
          style={{
            backgroundColor: colors.backgroundColor,
            width: "100%",
            height: "100%",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={{ width: "100%", height: 136 }}
          >
            {this.state.surah && this.state.surah.number != 1 && (
              <View
                style={{
                  flexDirection: "column",
                  padding: 10,
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {this.state.show === true ? (
                  <Text style={st.txtArabicBold}>
                    {surat}{" "}
                    {this.props.navigation.state.params.surah.name_arabic}
                  </Text>
                ) : null}
                <Text style={{ fontSize: 18 }}>{bismillah}</Text>
                <Text style={{ fontSize: 15, color: "black", marginTop: "3%" }}>
                  {en}
                </Text>
              </View>
            )}
          </ImageBackground>

          {!(this.state.isLoadingMore && this.state.isLoading) &&
          this.state.ayahs.length != 0 ? (
            <View
              style={{
                height: "100%",
              }}
            >
              <View style={{ height: "90%" }}>
                {this.state.surahNo === "" ? (
                  <ScrollView style={{ marginBottom: h("15%") }}>
                    {this.state.ayahs.map((item, i) => {
                      return (
                        <View style={{ padding: 20 }} key={i}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.setState(
                                  { show1: item, show2: true },
                                  () => {}
                                );
                              }}
                              style={{
                                marginLeft: -h("3%"),
                                width: "20%",
                              }}
                            >
                              <Image
                                source={require("../../assets/share.png")}
                                style={{
                                  height: h("3%"),
                                  width: "80%",
                                  resizeMode: "contain",
                                }}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 30,
                                fontWeight: "bold",
                                width: "86%",
                              }}
                            >
                              {item.ArabicText}
                            </Text>
                          </View>
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                          >
                            {item.RomanText.map((res) => {
                              return (
                                <View>
                                  <Text
                                    style={{ fontSize: 15, marginTop: h("2%") }}
                                  >
                                    {res.transliteration.text}
                                  </Text>
                                </View>
                              );
                            })}
                          </ScrollView>
                          {/* <Text style={{ fontSize: 15, marginTop: h("1%") }}>
                            {item.EnglishText}
                          </Text> */}
                        </View>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <ScrollView style={{ marginBottom: h("25%") }}>
                    {this.state.ayahs.map((item, i) => {
                      return (
                        <View style={{ padding: 20 }} key={i}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.setState(
                                  { show1: item, show2: true },
                                  () => {
                                    console.log("SHOW", this.state.show1);
                                  }
                                );
                              }}
                              style={{
                                marginLeft: -h("3%"),
                                width: "20%",
                              }}
                            >
                              <Image
                                source={require("../../assets/share.png")}
                                style={{
                                  height: h("3%"),
                                  width: "80%",
                                  resizeMode: "contain",
                                }}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 21,
                                color: "black",
                                width: "74%",
                                marginRight: "4%",
                              }}
                            >
                              {item.text.arab}
                            </Text>

                            <ImageBackground
                              source={require("../../assets/images/circle.png")}
                              style={{
                                height: 38,
                                width: 38,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{ textAlign: "center", fontSize: 12 }}
                              >
                                {i + 1}
                              </Text>
                            </ImageBackground>
                          </View>
                          <View>
                            {this.state.tajw ? (
                              <Text
                                style={{ fontSize: 15, marginTop: h("1%") }}
                              >
                                {item.text.transliteration.en}
                              </Text>
                            ) : null}
                            {this.state.transl == true ? (
                              <Text
                                style={{ fontSize: 15, marginTop: h("1%") }}
                              >
                                {item.translation.en}
                              </Text>
                            ) : null}
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
              <View
                style={{
                  height: "10%",
                  width: "100%",
                  marginTop: -200,
                  alignItems: "flex-end",
                }}
              >
                {this.state.show2 !== false ? (
                  <View
                    style={{
                      height: h("7%"),
                      width: "100%",
                      alignItems: "center",
                      marginTop: -h("10%"),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ show2: false }, () => {
                          this.props.navigation.navigate("ImageScreen", {
                            item: this.state.show1.text.transliteration.en,
                            arabic: this.state.show1.text.arab,
                            translation: this.state.show1.translation.en,
                          });
                        });
                      }}
                      style={{
                        height: h("7%"),
                        width: "90%",
                        backgroundColor: "#07A851",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: h("1%"),
                      }}
                    >
                      <Text style={{ fontSize: 20, color: "#fff" }}>
                        Share Image
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ show2: false }, () => {
                          this.props.navigation.navigate("Editor", {
                            item: this.state.show1.text.transliteration.en,
                            arabic: this.state.show1.text.arab,
                            translation: this.state.show1.translation.en,
                          });
                        });
                      }}
                      style={{
                        height: h("7%"),
                        width: "90%",
                        backgroundColor: "#07A851",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: h("1%"),
                        borderRadius: h("1%"),
                      }}
                    >
                      <Text style={{ fontSize: 20, color: "#fff" }}>
                        Share Text
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {audio.map((testInfo) => {
                  return (
                    <View
                      style={{
                        height: "100%",
                        width: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.play === false ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ play: true }, () => {
                              this.playSound(testInfo, this);
                            });
                          }}
                          style={{
                            height: "100%",
                            marginBottom: 60,
                            width: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AntDesign
                            name="play"
                            size={50}
                            color="#07A851"
                            style={{
                              backgroundColor: "white",
                              borderRadius: 60,
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ play: false });
                          }}
                          onPressIn={this.stopSoundLooped}
                          style={{
                            height: "100%",
                            width: "50%",
                            marginBottom: 60,

                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AntDesign
                            name="pausecircle"
                            size={50}
                            color="#07A851"
                            style={{
                              backgroundColor: "white",
                              borderRadius: 60,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <Spinner color={colors.primaryColor} />
          )}
        </View>
      </Container>
    );
  }
}

export default QuranDetail;
