/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import colors from "../../assets/colors";
import { AdMobInterstitial } from "react-native-admob";

import LinearGradient from "react-native-linear-gradient";
import CategoryButton from "../../components/Category";
import AllItems from "./AllItems";
import HomeAndFamily from "./HomeandFamily";
import FoodAndDrink from "./FoodandDrink";
import MorningandEvening from "./MorningandEvening";
import firestore from "@react-native-firebase/firestore";

export class Dua extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "All",
      verticalData: [],

      foodData: [],
      selected: "First",
      homeData: [],
      morningData: [],
    };
  }
  componentDidMount() {
    AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    this.getAll();
    this.getFood();
    this.getMorning();
    this.getHome();
  }
  onPressAll = () => {
    this.setState({ selectedState: "All", screenCondition: "All" });
  };
  onPressHF = () => {
    this.setState({ selectedState: "HF", screenCondition: "HF" });
  };
  onPressFD = () => {
    this.setState({ selectedState: "FD", screenCondition: "FD" });
  };
  onPressME = () => {
    this.setState({ selectedState: "ME", screenCondition: "ME" });
  };
  getAll = async () => {
    await firestore()
      .collection("Duas")
      .onSnapshot((d) => {
        this.setState({ verticalData: d._docs });
        // setResponseArray(data);
      });
  };
  getFood = async () => {
    await firestore()
      .collection("Duas")
      .where("category", "==", "FD")
      .onSnapshot((d) => {
        this.setState({ foodData: d._docs });
      });
  };
  getMorning = async () => {
    await firestore()
      .collection("Duas")
      .where("category", "==", "ME")
      .onSnapshot((d) => {
        this.setState({ morningData: d._docs });
      });
  };
  getHome = async () => {
    await firestore()
      .collection("Duas")
      .where("category", "==", "HF")
      .onSnapshot((d) => {
        this.setState({ homeData: d._docs });
      });
  };

  render() {
    const Data = [
      {
        id: "1",
        title: "All",
        onPress: this.onPressAll,
      },
      {
        id: "2",
        title: "Home and Family",
        onPress: this.onPressHF,
      },
      {
        id: "3",
        title: "Morning and Evening",
        onPress: this.onPressME,
      },
      {
        id: "4",
        title: "Food and Drink",
        onPress: this.onPressFD,
      },
    ];

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView />
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
            Dua
          </Text>
        </LinearGradient>

        <View
          style={{
            margin: h("1%"),
            flex: 1,
          }}
        >
          <View style={{ marginBottom: h("2%") }}>
            <FlatList
              data={Data}
              renderItem={({ item }) => (
                <CategoryButton title={item.title} OnPress={item.onPress} />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {this.state.selectedState == "All" ? (
            <View
              style={{
                margin: h("1%"),
                flex: 1,
              }}
            >
              <FlatList
                data={this.state.verticalData}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      // delayPressIn={0}
                      onPress={() =>
                        this.props.navigation.navigate("ShowItem", {
                          navProps: item,
                        })
                      }
                      style={{
                        backgroundColor: "#fff",
                        height: h("7%"),
                        marginBottom: h("1%"),
                        borderBottomWidth: 0.2,
                        borderBottomColor: colors.primaryColor,
                        borderRadius: h("1"),
                        flexDirection: "row",
                      }}
                    >
                      {/* Center view */}
                      <View
                        style={{
                          height: "100%",
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: '#aaf',
                          // justifyContent: "center",
                          marginLeft: h("3"),
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#0009",
                            fontSize: h("2.3%"),
                          }}
                        >
                          {item["_data"].nameOfDua}
                        </Text>
                        <Image
                          source={require("../../assets/right.png")}
                          style={{ height: 15, width: 9 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          ) : this.state.selectedState == "HF" ? (
            <View
              style={{
                margin: h("1%"),
                flex: 1,
              }}
            >
              <FlatList
                data={this.state.homeData}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      // delayPressIn={0}
                      onPress={() =>
                        this.props.navigation.navigate("ShowItem", {
                          navProps: item,
                        })
                      }
                      style={{
                        backgroundColor: "#fff",
                        height: h("7%"),
                        marginBottom: h("1%"),
                        borderBottomWidth: 0.2,
                        borderBottomColor: colors.primaryColor,
                        borderRadius: h("1"),
                        flexDirection: "row",
                      }}
                    >
                      {/* Center view */}
                      <View
                        style={{
                          height: "100%",
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: '#aaf',
                          // justifyContent: "center",
                          marginLeft: h("3"),
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#0009",
                            fontSize: h("2.3%"),
                          }}
                        >
                          {item["_data"].nameOfDua}
                        </Text>
                        <Image
                          source={require("../../assets/right.png")}
                          style={{ height: 15, width: 9 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          ) : this.state.selectedState == "FD" ? (
            <View
              style={{
                margin: h("1%"),
                flex: 1,
              }}
            >
              <FlatList
                data={this.state.foodData}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      // delayPressIn={0}
                      onPress={() =>
                        this.props.navigation.navigate("ShowItem", {
                          navProps: item,
                        })
                      }
                      style={{
                        backgroundColor: "#fff",
                        height: h("7%"),
                        marginBottom: h("1%"),
                        borderBottomWidth: 0.2,
                        borderBottomColor: colors.primaryColor,
                        borderRadius: h("1"),
                        flexDirection: "row",
                      }}
                    >
                      {/* Center view */}
                      <View
                        style={{
                          height: "100%",
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: '#aaf',
                          // justifyContent: "center",
                          marginLeft: h("3"),
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#0009",
                            fontSize: h("2.3%"),
                          }}
                        >
                          {item["_data"].nameOfDua}
                        </Text>
                        <Image
                          source={require("../../assets/right.png")}
                          style={{ height: 15, width: 9 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                margin: h("1%"),
                flex: 1,
              }}
            >
              <FlatList
                data={this.state.morningData}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      // delayPressIn={0}
                      onPress={() =>
                        this.props.navigation.navigate("ShowItem", {
                          navProps: item,
                        })
                      }
                      style={{
                        backgroundColor: "#fff",
                        height: h("7%"),
                        marginBottom: h("1%"),
                        borderBottomWidth: 0.2,
                        borderBottomColor: colors.primaryColor,
                        borderRadius: h("1"),
                        flexDirection: "row",
                      }}
                    >
                      {/* Center view */}
                      <View
                        style={{
                          height: "100%",
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // backgroundColor: '#aaf',
                          // justifyContent: "center",
                          marginLeft: h("3"),
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#0009",
                            fontSize: h("2.3%"),
                          }}
                        >
                          {item["_data"].nameOfDua}
                        </Text>
                        <Image
                          source={require("../../assets/right.png")}
                          style={{ height: 15, width: 9 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
