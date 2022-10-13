import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "./../../assets/colors";
import st from "./../../assets/styles";
import moment from "moment";
import Geocoder from "react-native-geocoding";

import * as locationService from "./../../services/location";
import * as calendarService from "./../../services/calendar";
import Carousel from "react-native-snap-carousel";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Spinner,
} from "native-base";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";

var Sound = require("react-native-sound");
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";

function setTestState(testInfo, component, status) {
  component.setState({
    tests: { ...component.state.tests, [testInfo.title]: status },
  });
}
var adIdSet = false;
class Prayer extends Component {
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
      isListLoading: false,
      nowDate: moment().format("DD MMMM YYYY"),
      timings: [],
      cityName: "",
      play: false,
      playSound: false,
      date: "",
      hijridate: "",
      stat: "",
      hijrimonth: "",
      fixDate: "",
      azan: false,
      nextprayer: "",
      nexttime: "",
      ad: false,
      loopingSound: undefined,
      images: [
        {
          title: "Item 1",
          text: "Text 1",
          img: require("../../assets/quran-verses.png"),
        },
        {
          title: "Item 2",
          text: "Text 2",
          img: require("../../assets/quranic-ayah-min.png"),
        },
      ],
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

  getDate = () => {};
  getNextTime = () => {
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds();
    var currentTime = hours + ":" + min;
    var startTime = moment()
      .utcOffset("+05:30")
      .format("HH:mm a");
    var startTime1 = moment(startTime, "HH:mm a");
    var Fajr = moment(this.state.timings.Fajr, "HH:mm a");
    var Dhuhr = moment(this.state.timings.Dhuhr, "HH:mm a");
    var Asr = moment(this.state.timings.Asr, "HH:mm a");
    var Maghrib = moment(this.state.timings.Maghrib, "HH:mm a");
    var Isha = moment(this.state.timings.Isha, "HH:mm a");
    if (!startTime1.isAfter(Fajr)) {
      this.setState({
        nextprayer: "Dhuhr",
        nexttime: this.state.timings.Dhuhr,
      });
    } else if (startTime1.isAfter(Dhuhr)) {
      this.setState({ nextprayer: "Asr", nexttime: this.state.timings.Asr });
    } else if (startTime1.isAfter(Asr)) {
      this.setState({
        nextprayer: "Maghrib",
        nexttime: this.state.timings.Maghrib,
      });
    } else if (startTime1.isAfter(Maghrib)) {
      this.setState({ nextprayer: "Isha", nexttime: this.state.timings.Isha });
    } else if (startTime1.isAfter(Isha)) {
      this.setState({ nextprayer: "Fajr", nexttime: this.state.timings.Fajr });
      // console.log("nextprayer", this.state.nextprayer);
    }
  };
  azan = () => {
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var currentTime = hours + ":" + min;
    var Fajr = moment(this.state.timings.Fajr).format("HH:mm a");
    var Dhuhr = moment(this.state.timings.Dhuhr).format("HH:mm a");
    var Asr = moment(this.state.timings.Asr).format("HH:mm a");
    var Maghrib = moment(this.state.timings.Maghrib).format("HH:mm a");
    var Isha = moment(this.state.timings.Isha).format("HH:mm a");
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    console.log(time);
    if (
      time === "5:17" ||
      time === "12:17" ||
      time === "16:17" ||
      time === "17:55" ||
      time === "19:17"
    ) {
      this.setState({ azan: true });
      // console.log("AZAN", this.state.azan);
      var whoosh = new Sound(require("./azan.mp3"), (error) => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
        whoosh.play();
        whoosh.play((success) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
      });
    }
  };
  componentWillMount() {
    if (adIdSet != true) {
      AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
      // AdMobInterstitial.setTestDeviceID([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
      adIdSet = true;
    } else {
      AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
    }

    // AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
    // // AdMobInterstitial.setTestDeviceID([AdMobInterstitial.simulatorId]);
    // AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
  }
  componentDidMount() {
    // Display an interstitial

    this.getDate();
    this.getNextTime();
    var date = moment()
      .utcOffset("+05:30")
      .format("ddd,DD,MMM");
    this.setState({ date: date });
    var Date = moment()
      .utcOffset("+05:30")
      .format("DD-MM-YYYY");
    fetch(`http://api.aladhan.com/v1/gToH?date=${Date}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responsejosn) => {
        this.setState({ hijridate: responsejosn.data.hijri.day });
        this.setState({ hijrimonth: responsejosn.data.hijri.month.en });
      });
    locationService.requestLocationPermission((isGranted) => {
      if (isGranted) {
        this.setState({ isLoading: true });
        locationService.getLocation((coords) => {
          if (coords != null) {
            this.getCity(coords.latitude, coords.longitude);
            this.getPrayerTimes(coords.latitude, coords.longitude);
          }
        });
      }
    });
    if (this.state.azan === false) {
      this.azan();
      setInterval(() => {
        this.azan();
      }, 100000);
    }
  }

  getCity = (lat, long) => {
    Geocoder.from(lat, long)
      .then((res) => {
        let addressComponent = res.results[0].address_components[4];
        this.setState({
          cityName: addressComponent.long_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getPrayerTimes = (lat, long) => {
    this.setState({ isListLoading: true });
    calendarService
      .getPrayerTimes(null, lat, long)
      .then((res) => {
        this.setState({
          timings: res.data.data.timings,
        });
        // console.log(res.data.data.timings);
        this.getNextTime();
        // this.azan();
        this.setState({ isLoading: false, isListLoading: false });
      })
      .catch((error) => {
        if (!error.status) {
          Alert.alert("Error", "Network Error");
        }
        this.setState({ isLoading: false, isListLoading: false });
      });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          height: 220,
          width: "100%",
          marginRight: -5,
        }}
      >
        <Image
          source={item.img}
          style={{
            height: 200,
            width: "100%",
          }}
        />
      </View>
    );
  };

  render() {
    const audio = [
      {
        url: `https://www.islamcan.com/audio/adhan/azan1.mp3`,
      },
    ];
    const { movie } = this.props;
    const getTiming = (name, time) => {
      if (!this.state.isListLoading) {
        return (
          <ListItem icon noBorder style={{ marginTop: 5, marginBottom: 10 }}>
            <Left
              style={{
                borderLeftWidth: 3,
                borderLeftColor: colors.backgroundColor,
              }}
            />
            <Body>
              <Text style={[st.txtBoldLarge, { color: "#000" }]}>{name}</Text>
            </Body>
            <Right>
              <View style={{ width: 100, alignItems: "flex-end" }}>
                <Text style={[st.txtBoldLarge, { color: "#000" }]}>{time}</Text>
              </View>
            </Right>
          </ListItem>
        );
      } else {
        return <View />;
      }
    };

    return (
      <Container style={{ backgroundColor: "#1aae72" }}>
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            height: "50%",
            width: "100%",
          }}
        >
          <ImageBackground
            source={require("../../assets/BG123.png")}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <ImageBackground
              source={require("../../assets/123.png")}
              style={{
                height: "100%",
                width: "100%",
                // marginTop:-320
              }}
            >
              <View
                style={{
                  height: "15%",
                  width: "100%",
                  alignItems: "center",
                  // justifyContent:'center',
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "20%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    // backgroundColor:'#ada'
                  }}
                >
                  <Image
                    source={require("../../assets/icon.png")}
                    style={{
                      height: "60%",
                      width: "60%",
                      resizeMode: "contain",
                      // marginTop:-320
                    }}
                  />
                </View>
                <View
                  style={{
                    height: "100%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    // backgroundColor:'#ada'
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#fff" }}>
                    {this.state.date}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "#fff" }}>
                      {this.state.hijridate}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#fff" }}>
                      {" "}
                      {this.state.hijrimonth}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: "60%",
                  width: "100%",
                  // backgroundColor:'#fff',
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 15 }}>
                  Next Prayer {this.state.nextprayer}
                </Text>
                <Text style={{ color: "#fff", fontSize: 60 }}>
                  {this.state.nexttime}
                </Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
        <Content style={{ backgroundColor: "#fff" }}>
          {/* <ArchHero for='prayer' currentDate={this.state.nowDate} timings={this.state.timings} /> */}
          <Content>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Carousel
                layout={"default"}
                ref={(ref) => (this.carousel = ref)}
                data={this.state.images}
                sliderWidth={300}
                itemWidth={300}
                renderItem={this._renderItem}
                onSnapToItem={(index) => this.setState({ activeIndex: index })}
              />
            </View>
            <View
              style={{
                marginVertical: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[st.txtBoldLarge, { color: "#000" }]}>
                {this.state.date}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 13, color: "#000" }}>
                  {this.state.hijridate}
                </Text>
                <Text style={{ fontSize: 13, color: "#000" }}>
                  {" "}
                  {this.state.hijrimonth}
                </Text>
              </View>
            </View>
            {this.state.isListLoading ? (
              <Spinner color="white" />
            ) : (
              <View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: h(".1%"),
                    borderColor: "#0002",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.nextprayer === "Dhuhr" ? (
                      <Image
                        source={require("../../assets/Path4.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Path1.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      // alignItems:'center',
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Fajr</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Fajr}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "fajr" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                { play: true, stat: "fajr" },
                                () => {
                                  this.playSound(testInfo, this);
                                }
                              );
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/Path3.png")}
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      // alignItems:'center',
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Sunrise</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Sunrise}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "sunrise" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                { play: true, stat: "sunrise" },
                                () => {
                                  this.playSound(testInfo, this);
                                }
                              );
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false.valueOf, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: h(".1%"),
                    borderColor: "#0002",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.nextprayer === "Asr" ? (
                      <Image
                        source={require("../../assets/Path4.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Path1.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      // alignItems:'center',
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Dhuhr</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Dhuhr}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "dhur" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                { play: true, stat: "dhur" },
                                () => {
                                  this.playSound(testInfo, this);
                                }
                              );
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: h(".1%"),
                    borderColor: "#0002",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.nextprayer === "Maghrib" ? (
                      <Image
                        source={require("../../assets/Path4.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Path1.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Asr</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Asr}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "Asr" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: true, stat: "Asr" }, () => {
                                this.playSound(testInfo, this);
                              });
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: h(".1%"),
                    borderColor: "#0002",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.nextprayer === "Isha" ? (
                      <Image
                        source={require("../../assets/Path4.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Path1.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      // alignItems:'center',
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Maghrib</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Maghrib}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "magrib" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                { play: true, stat: "magrib" },
                                () => {
                                  this.playSound(testInfo, this);
                                }
                              );
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: h(".1%"),
                    borderColor: "#0002",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.nextprayer === "Fajr" ? (
                      <Image
                        source={require("../../assets/Path4.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Path1.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      // alignItems:'center',
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Isha</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Isha}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "Isha" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                { play: true, stat: "Isha" },
                                () => {
                                  this.playSound(testInfo, this);
                                }
                              );
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: h("6%"),
                    width: "100%",
                    // backgroundColor:'#ada',
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: h(".1%"),
                    borderColor: "#0002",
                  }}
                >
                  <View
                    style={{
                      height: h("6%"),
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/Path2.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "40%",
                      // alignItems:'center',
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>Qiyam</Text>
                  </View>
                  <View
                    style={{
                      height: h("6%"),
                      width: "30%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "#000" }}>
                      {this.state.timings.Imsak}
                    </Text>
                  </View>
                  {audio.map((testInfo) => {
                    return (
                      <View
                        style={{
                          height: h("6%"),
                          width: "10%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {this.state.stat !== "Qiyam" ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                { play: true, stat: "Qiyam" },
                                () => {
                                  this.playSound(testInfo, this);
                                }
                              );
                            }}
                          >
                            <AntDesign
                              name={"sound"}
                              size={25}
                              color={"#07A851"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ play: false, stat: "" });
                            }}
                            onPressIn={this.stopSoundLooped}
                          >
                            <Octicons name="mute" size={25} color={"red"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
              // <List>
              //   {getTiming('Fajr', this.state.timings.Fajr)}
              //   {getTiming('Sunrise', this.state.timings.Sunrise)}
              //   {getTiming('Dhuhr', this.state.timings.Dhuhr)}
              //   {getTiming('Asr', this.state.timings.Asr)}
              //   {getTiming('Maghrib', this.state.timings.Maghrib)}
              //   {getTiming('Isha', this.state.timings.Isha)}
              //   {getTiming('Imsak', this.state.timings.Imsak)}
              // </List>
            )}
          </Content>
        </Content>
      </Container>
    );
  }
}

export default Prayer;
