import React, { Component } from "react";
import { Text, Alert, View, ImageBackground } from "react-native";
import st from "./../../../assets/styles";
import colors from "./../../../assets/colors";

import {
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
} from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import Sound from "react-native-sound";

const audioTests = [
  {
    title: "mp3 in bundle",
    url: "https://download.quranicaudio.com/quran/abdullaah_basfar/001.mp3",
    basePath: Sound.MAIN_BUNDLE,
    img: "https://cdn.islamic.network/quran/images/2_1.png",
  },
];

function setTestState(testInfo, component, status) {
  component.setState({
    tests: { ...component.state.tests, [testInfo.title]: status },
  });
}

class Surah extends Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.pageX = 0;

    Sound.setCategory("Playback", true); // true = mixWithOthers

    // Special case for stopping
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
      surahNo: "001",
      surah: "",
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

  /**
   * Generic play function for majority of tests
   */
  playSound(testInfo, component) {
    setTestState(testInfo, component, "pending");

    const callback = (error, sound) => {
      if (error) {
        Alert.alert("error", error.message);
        setTestState(testInfo, component, "fail");
        return;
      }
      setTestState(testInfo, component, "playing");
      // Run optional pre-play callback
      testInfo.onPrepared && testInfo.onPrepared(sound, component);
      this.setState({ loopingSound: sound });
      sound.play(() => {
        // Success counts as getting to the end
        setTestState(testInfo, component, "win");
        // Release when it's done so we're not using up resources
        sound.release();
      });
    };

    // If the audio is a 'require' then the second parameter must be the callback.
    if (testInfo.isRequire) {
      const sound = new Sound(testInfo.url, (error) => callback(error, sound));
    } else {
      const sound = new Sound(testInfo.url, testInfo.basePath, (error) =>
        callback(error, sound)
      );
    }
  }

  setSurah = () => {
    var str = "" + this.state.surah;
    var pad = "000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    console.log("Answer", ans);
    this.setState({ surahNo: ans });
    const audio = [
      {
        url: `https://download.quranicaudio.com/quran/abdullaah_basfar/${
          this.state.surahNo
        }.mp3`,
      },
    ];
    const testInfo = {
      url: `https://download.quranicaudio.com/quran/abdullaah_basfar/${ans}.mp3`,
    };
    this.playSound(testInfo, this);
  };
  render() {
    const { isLoading, surahList } = this.props;

    const audio = [
      {
        url: `https://download.quranicaudio.com/quran/abdullaah_basfar/${
          this.state.surahNo
        }.mp3`,
      },
    ];

    const getListOfSurah = () => {
      return surahList.map((surah, index) => (
        <ListItem icon key={index} onPress={() => this.props.goToSurah(surah)}>
          <Left>
            <Button transparent>
              <ImageBackground
                source={require("../../../assets/images/back.png")}
                style={{
                  height: 37,
                  width: 37,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageBackground
                  source={require("../../../assets/images/round.png")}
                  style={{
                    height: 33,
                    width: 33,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>{surah.id}</Text>
                </ImageBackground>
              </ImageBackground>
            </Button>
          </Left>
          <Body>
            <Text style={st.txtBoldPrimary}>{surah.name_simple}</Text>
            {/* <Text note>{surah.englishNameTranslation}</Text> */}
          </Body>
          <Right>
            {audio.map((testInfo) => {
              return (
                <View
                  style={{
                    // height:'100%',
                    // width:'50%',
                    // backgroundColor:'#ada',
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {this.state.play === false ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ play: true, surah: surah.id }, () => {
                          this.setSurah();
                        });
                      }}
                      style={{
                        // height:'100%',
                        // width:'50%',
                        // backgroundColor:'#ada',
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={st.txtArabicBoldPrimary}>Play Now</Text>
                      {/* <Image style={{height:'200%',width:'100%'}} source={require('../../assets/play.png')}/> */}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      // onPress={() => {
                      //   this.setState({play:true},()=> {
                      //     return playSound(testInfo, this)
                      //     })
                      //   }}
                      onPress={() => {
                        this.setState({ play: false });
                      }}
                      onPressIn={this.stopSoundLooped}
                      style={{
                        // height:'100%',
                        // width:'50%',
                        // backgroundColor:'#ada',
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Text>Hello</Text> */}
                      {/* <Image style={{height:'200%',width:'100%'}} source={require('../../assets/play.png')}/> */}
                      <Text style={st.txtArabicBoldPrimary}>Stop</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </Right>
        </ListItem>
      ));
    };

    return (
      <Content style={{ backgroundColor: colors.backgroundColor }}>
        <List>{!isLoading && surahList.length != 0 && getListOfSurah()}</List>
      </Content>
    );
  }
}

export default Surah;
