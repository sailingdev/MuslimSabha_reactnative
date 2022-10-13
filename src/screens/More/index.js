import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert,Image} from 'react-native';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>;
const Images = ({children, style}) => <Image source={{uri:children}} style={[styles.header, style]}/>;

const Feature = ({title, onPress,img, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Images style={{flex: 1}}>{img}</Images>
    {status ? <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text> : null}
    <Button title={buttonLabel} onPress={onPress} />
  </View>
);

const resultIcons = {
  '': '',
  pending: '?',
  playing: '\u25B6',
  win: '\u2713',
  fail: '\u274C',
};

const audioTests = [
  {
    title: 'mp3 in bundle',
    url: 'https://download.quranicaudio.com/quran/abdullaah_basfar/001.mp3',
    basePath: Sound.MAIN_BUNDLE,
    img:'https://cdn.islamic.network/quran/images/2_1.png'
  },
];

function setTestState(testInfo, component, status) {
  component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
}

/**
 * Generic play function for majority of tests
 */
function playSound(testInfo, component) {
  setTestState(testInfo, component, 'pending');

  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(testInfo, component, 'fail');
      return;
    }
    setTestState(testInfo, component, 'playing');
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound));
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
  }
}

class More extends Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true); // true = mixWithOthers

    // Special case for stopping
    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return;
      }

      this.state.loopingSound.stop().release();
      this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
    };

    this.state = {
      loopingSound: undefined,
      tests: {},
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.title}>Quran Pak</Header>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          {audioTests.map(testInfo => {
            return (
                <View 
                style={{
                    flexDirection: 'row',
                    padding: 40,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: 'rgb(180,180,180)',
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgb(230,230,230)',
                                    }}
                >
              {/* <Feature
                status={this.state.tests[testInfo.title]}
                key={testInfo.title}
                img={testInfo.img}
                onPress={() => {
                  return playSound(testInfo, this);
                }}
              /> */}
              <TouchableOpacity
              onPress={() => {
                  return playSound(testInfo, this);
                }}
              >
                  <Text>Play</Text>
              </TouchableOpacity>
              <Image style={{height:'2000%',width:'100%',resizeMode:'contain'}} source={{uri:testInfo.img}}/>
              </View>
            );
          })}
          {/* <Feature title="mp3 in bundle (looped)" buttonLabel={'STOP'} onPress={this.stopSoundLooped} /> */}
        </ScrollView>
      </View>
    );
  }
}

export default More;
