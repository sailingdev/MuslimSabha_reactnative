import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Picker,
  AsyncStorage,
} from "react-native";
import ArchHeader from "../../components/ArchHeader";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import { AdMobInterstitial } from "react-native-admob";

const Settings = () => {
  const nativeAdViewRef = useRef();
  useEffect(() => {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    nativeAdViewRef.current?.loadAd();
    setTajweed();
    setTranslate();
    setTrans();
    // console.log("====================================");
    // console.log(selectedValue);
    // console.log("====================================");
  }, []);

  const [name, setName] = useState(false);
  const [translation, setTranslation] = useState(false);
  const [selectedValue, setSelectedValue] = useState("English");

  const toggleSwitch = async (n) => {
    setName(n);
    await AsyncStorage.setItem("tajweed", JSON.stringify({ tajweed: n }));
  };

  const toggleSwitch1 = async (p) => {
    setTranslation(p);
    await AsyncStorage.setItem("translate", JSON.stringify({ translate: p }));
  };

  const setTrans = async () => {
    const tra = await AsyncStorage.getItem("value");
    setSelectedValue(tra);
  };

  const setTranslate = async () => {
    const tra = await AsyncStorage.getItem("translate");
    const aa = JSON.parse(tra);
    setTranslation(aa.translate);
    // console.log(translation);
  };
  const setTajweed = async () => {
    const taj = await AsyncStorage.getItem("tajweed");
    const aaa = JSON.parse(taj);
    setName(aaa.tajweed);
  };

  return (
    <View style={styles.main}>
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
      <View style={styles.main1}>
        <View style={styles.whiteView}>
          <Text style={styles.name}>Tajweed</Text>
          <Switch
            trackColor={{ false: "#E7E8EB", true: "#04A35F" }}
            thumbColor={name ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onChange={() => toggleSwitch(!name)}
            // onValueChange={toggleSwitch}
            value={name}
          />
        </View>
        <View style={styles.whiteView}>
          <Text style={styles.name}>Translation</Text>
          <Switch
            trackColor={{ false: "#E7E8EB", true: "#04A35F" }}
            thumbColor={translation ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onChange={() => toggleSwitch1(!translation)}
            value={translation}
          />
        </View>
        {translation == true ? (
          <View>
            <Text style={styles.translation}>Select Translation Language</Text>
            <View style={styles.pickerView}>
              <Picker
                mode={"dropdown"}
                selectedValue={selectedValue}
                style={{ height: 50, width: "97%", marginLeft: "3%" }}
                onValueChange={(itemValue, itemIndex) => {
                  (async () => {
                    await AsyncStorage.setItem(`value`, itemValue);
                  })();
                  setSelectedValue(itemValue);
                }}
              >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="Arabic" value="Arabic" />
              </Picker>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  main1: {
    padding: 15,
  },
  whiteView: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 6,
    marginTop: "4%",
  },
  pickerView: {
    backgroundColor: "white",
    borderRadius: 6,
    marginTop: "2%",
  },
  name: {
    fontSize: 15,
  },
  translation: {
    fontSize: 15,
    marginVertical: "3%",
  },
});
export default Settings;
