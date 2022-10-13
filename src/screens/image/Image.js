import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { StatusBar } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";

class ImageScreen extends Component {
  state = {
    image: require("../../assets/1.png"),
    image1: require("../../assets/1.png"),
    image2: require("../../assets/2.png"),
    image3: require("../../assets/3.png"),
    image4: require("../../assets/4.png"),
    image5: require("../../assets/5.png"),
    image6: require("../../assets/6.png"),
    uri: null,
  };

  shareImage = async () => {
    const uri = await this.refs.viewShot.capture().then((uri) => {
      console.log("do something with ", uri);
      this.setState({ uri: uri });
    });
    const shareResponse = await Share.open({ url: this.state.uri });
    console.log("shareResponse", shareResponse);
  };

  render() {
    const img1 = this.state.image1;
    const img2 = this.state.image2;
    const img3 = this.state.image3;
    const img4 = this.state.image4;
    const img5 = this.state.image5;
    const img6 = this.state.image6;
    return (
      <View
        style={{
          flex: 1,
          height: h("100%"),
          width: "100%",
          alignItems: "center",
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <LinearGradient
          colors={["#02967c", "#049e6a", "#06a558"]}
          style={{
            height: h("15%"),
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
            Share Image
          </Text>
        </LinearGradient>
        <ViewShot
          ref="viewShot"
          options={{ format: "jpg", quality: 0.9 }}
          style={
            {
              // height: h("33%"),
            }
          }
        >
          <ImageBackground
            source={this.state.image}
            style={{
              //   height: h("30%"),
              padding: "5%",
              width: w("90%"),
              marginTop: h("2%"),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, marginRight: h("2%") }}>
              {this.props.navigation.getParam("arabic")}
            </Text>

            <Text style={{ color: "#fff", fontSize: 17, marginLeft: h("1%") }}>
              {this.props.navigation.getParam("item")}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginLeft: h("1%"),
                marginTop: h("2%"),
              }}
            >
              {this.props.navigation.getParam("translation")}
            </Text>
          </ImageBackground>
        </ViewShot>
        <View
          style={{
            height: h("6%"),
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#000", fontSize: 18, marginLeft: h("3%") }}>
            Select backgroundColor image
          </Text>
        </View>
        <View
          style={{
            height: h("34%"),
            width: "90%",
            // backgroundColor:'#ada',
          }}
        >
          <View
            style={{
              height: h("17%"),
              width: "100%",
              // backgroundColor:'#faf',
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: img1 });
              }}
              style={{
                height: h("17%"),
                width: "31.7%",
                // backgroundColor:'#aaf'
              }}
            >
              <Image
                source={require("../../assets/1.png")}
                style={{
                  height: h("17%"),
                  width: "100%",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: img2 });
              }}
              style={{
                height: h("17%"),
                width: "31.7%",
                // backgroundColor:'#aaf',
                marginLeft: h("1%"),
              }}
            >
              <Image
                source={require("../../assets/2.png")}
                style={{
                  height: h("17%"),
                  width: "100%",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: img3 });
              }}
              style={{
                height: h("17%"),
                width: "31.7%",
                // backgroundColor:'#aaf',
                marginLeft: h("1%"),
              }}
            >
              <Image
                source={require("../../assets/3.png")}
                style={{
                  height: h("17%"),
                  width: "100%",
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: h("17%"),
              width: "100%",
              // backgroundColor:'#faf',
              flexDirection: "row",
              marginTop: h("1%"),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: img4 });
              }}
              style={{
                height: h("17%"),
                width: "31.7%",
                // backgroundColor:'#aaf'
              }}
            >
              <Image
                source={require("../../assets/4.png")}
                style={{
                  height: h("17%"),
                  width: "100%",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: img5 });
              }}
              style={{
                height: h("17%"),
                width: "31.7%",
                // backgroundColor:'#aaf',
                marginLeft: h("1%"),
              }}
            >
              <Image
                source={require("../../assets/5.png")}
                style={{
                  height: h("17%"),
                  width: "100%",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ image: img6 });
              }}
              style={{
                height: h("17%"),
                width: "31.7%",
                // backgroundColor:'#aaf',
                marginLeft: h("1%"),
              }}
            >
              <Image
                source={require("../../assets/6.png")}
                style={{
                  height: h("17%"),
                  width: "100%",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.shareImage();
          }}
          // onPress={()=> {this.props.navigation.navigate('ImageScreen',{item:this.state.user.translation})}}
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
      </View>
    );
  }
}

export default ImageScreen;
