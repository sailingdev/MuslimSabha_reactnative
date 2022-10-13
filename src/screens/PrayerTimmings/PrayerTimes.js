import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import * as locationService from "../../services/location";
import * as calendarService from "../../services/calendar";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";

const Separator = () => <View style={styles.separator} />;

const PrayerTime = ({ navigation }) => {
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hijrimonth, setHijriMonth] = useState("");

  const [timming, setTimming] = useState([]);

  useEffect(() => {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    Days();
  }, []);
  const Days = () => {
    var date = moment()
      .utcOffset("+05:30")
      .format("ddd,DD,MMM");
    setDate(date);
    var Date = moment()
      .utcOffset("+05:30")
      .format("DD-MM-YYYY");
    fetch(`http://api.aladhan.com/v1/gToH?date=${Date}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responsejosn) => {});
    locationService.requestLocationPermission((isGranted) => {
      if (isGranted) {
        locationService.getLocation((coords) => {
          if (coords != null) {
            getPrayerTimes(coords.latitude, coords.longitude);
          }
        });
      }
    });
  };
  const getPrayerTimes = (lat, long) => {
    calendarService
      .getPrayerTimes(null, lat, long)
      .then((res) => {
        const dataaa = res.data.data.timings;

        setTimming(dataaa);
        console.log(JSON.stringify(res.data.data.date.hijri.month.en, null, 2));
        setMonth(res.data.data.date.gregorian.month.en);
        setYear(res.data.data.date.gregorian.year);
        setHijriMonth(res.data.data.date.hijri.month.en);
      })
      .catch((error) => {
        if (!error.status) {
          Alert.alert("Error", "Network Error");
        }
      });
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.mainSec}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/back.png")}
              style={{ height: 15, width: 30 }}
            />
          </TouchableOpacity>
          <View style={styles.text1}>
            <Text style={{ fontSize: 20 }}>
              {month},{year}
            </Text>
            <Text style={{ fontSize: 11, color: "green" }}>{hijrimonth}</Text>
          </View>
          <View />
        </View>
        {/* Second */}
        <View style={styles.SecondSec}>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Mon</Text>
            <Text style={{ color: "white" }}>1</Text>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Tue</Text>
            <Text style={{ color: "white" }}>2</Text>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Wed</Text>
            <Text style={{ color: "white" }}>3</Text>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Thu</Text>
            <Text style={{ color: "white" }}>4</Text>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Fri</Text>
            <Text style={{ color: "white" }}>5</Text>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Sat</Text>
            <Text style={{ color: "white" }}>6</Text>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Sun</Text>
            <Text style={{ color: "white" }}>7</Text>
          </View>
        </View>

        <View>
          {/* {timming.map((res) => {
            return ( */}
          <View />
          {/* );
          })} */}
          {/* {timming.map((testInfo) => {
            return ( */}
          {/* <View>
            <View style={styles.row2}>
              <Text>Fajar</Text>
              <Text>5:17 AM</Text>
            </View>
            <Separator />
          </View> */}
          {/* );
          })} */}
          <View style={styles.row2}>
            <Text>Fajr </Text>
            <Text>{timming.Fajr} AM</Text>
          </View>
          <Separator />
          <View style={styles.row2}>
            <Text>Dhuhr</Text>
            <Text>{timming.Dhuhr} PM</Text>
          </View>
          <Separator />
          <View style={styles.row2}>
            <Text>Asar</Text>
            <Text>{timming.Asr} PM</Text>
          </View>
          <Separator />
          <View style={styles.row2}>
            <Text>Magrib</Text>
            <Text>{timming.Maghrib} PM</Text>
          </View>
          <Separator />
          <View style={styles.row2}>
            <Text>Isha</Text>
            <Text>{timming.Isha} PM</Text>
          </View>
          <Separator />
          <View style={styles.row2}>
            <Text>Sunrise</Text>
            <Text>{timming.Sunrise} PM</Text>
          </View>
          <Separator />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainSec: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 100,
  },
  text1: {
    alignItems: "center",
    justifyContent: "center",
  },
  SecondSec: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "green",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text2: {
    margin: 10,
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  separator: {
    marginVertical: 7,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default PrayerTime;
