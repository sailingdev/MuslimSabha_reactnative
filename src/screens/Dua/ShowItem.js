import React, { Component } from "react";
import { View, Text, SafeAreaView, FlatList, Image } from "react-native";

import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native";
import { AdMobInterstitial } from "react-native-admob";

export default class ShowItem extends Component {
  state = {
    user: {},
    show: false,
    data: {},
  };

  componentDidMount = () => {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    const incomingData = this.props.navigation.getParam("navProps");
    this.setState({ user: incomingData._data });
  };

  render() {
    const incomingData = this.props.navigation.getParam("navProps");

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <SafeAreaView />
        <LinearGradient
          colors={["#02967c", "#049e6a", "#06a558"]}
          style={{
            height: h("12%"),
            width: "100%",
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
            Duas
          </Text>
        </LinearGradient>
        <View
          style={{
            height: h("8%"),
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: h("8%"),
              justifyContent: "center",
              marginLeft: h("3%"),
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold" }}>
              {this.state.user.nameOfDua}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({ show: true });
            }}
            style={{
              height: h("8%"),
              justifyContent: "center",
              marginLeft: -h("3%"),
              width: "20%",
            }}
          >
            <Image
              source={require("../../assets/share.png")}
              style={{
                height: h("5%"),
                width: "80%",
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "94%",
            marginTop: h("2%"),
          }}
        >
          <Text style={{ fontSize: 20, color: "#000" }}>
            {this.state.user.arabicDua}
          </Text>
        </View>
        <View
          style={{
            width: "94%",
            marginLeft: h("2%"),
            marginTop: h("2%"),
          }}
        >
          <Text style={{ fontSize: 20, color: "#000" }}>
            {this.state.user.translation}
          </Text>
        </View>
        {this.state.show === true ? (
          <View
            style={{
              height: h("7%"),
              width: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ImageScreen", {
                  item: this.state.user.translation,
                  arabic: this.state.user.arabicDua,
                });
              }}
              style={{
                height: h("7%"),
                width: "90%",
                backgroundColor: "#07A851",
                alignItems: "center",
                justifyContent: "center",
                marginTop: h("5%"),
                borderRadius: h("1%"),
              }}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Share Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Editor", {
                  item: this.state.user.translation,
                  arabic: this.state.user.arabicDua,
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
              <Text style={{ fontSize: 20, color: "#fff" }}>Share Text</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
