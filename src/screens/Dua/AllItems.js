import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import colors from "../../assets/colors";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";

class AllItems extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    verticalData: [],
    cart: [],
    selected: "First",
    refreshing: false,
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    await firestore()
      .collection("Duas")
      .onSnapshot((d) => {
        this.setState({ verticalData: d._docs });
        // setResponseArray(data);
        return;
      });
  };
  // renderItemDesign = (item, index) => (
  //   <TouchableOpacity
  //     delayPressIn={0}
  //     onPress={() => this.navToShow(item)}
  //     style={{
  //       backgroundColor: "#fff",
  //       height: h("7%"),
  //       marginBottom: h("1%"),
  //       borderBottomWidth: 0.2,
  //       borderBottomColor: colors.primaryColor,
  //       borderRadius: h("1"),
  //       flexDirection: "row",
  //     }}
  //   >
  //     {/* Center view */}
  //     <View
  //       style={{
  //         height: "100%",
  //         width: "90%",
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //         // backgroundColor: '#aaf',
  //         // justifyContent: "center",
  //         marginLeft: h("3"),
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: "#0009",
  //           fontSize: h("2.3%"),
  //         }}
  //       >
  //         {item["_data"].nameOfDua}
  //       </Text>
  //       <Image
  //         source={require("../../assets/right.png")}
  //         style={{ height: 15, width: 9 }}
  //       />
  //     </View>
  //   </TouchableOpacity>
  // );

  // navigate to show screen
  // navToShow = (item) => {
  //   this.props.navigation.navigate("ShowItem", {
  //     navProps: item,
  //   });
  // };

  refresh = () => {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.setState({ refreshing: false }, () => {
        console.warn("All done");
      });
    }, 3000);
  };
  render() {
    return (
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
                delayPressIn={0}
                onPress={() => this.props.navigation.navigate("ShowItems")}
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
    );
  }
}
export default AllItems;
