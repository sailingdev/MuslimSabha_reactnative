import React, { Component, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { captureRef } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";

class Editor extends Component {
  constructor(props: any) {
    super(props);
    this._editor = React.createRef();
    this.viewRef = React.createRef();
    this.state = {
      disabled: false,
      title: "react-native-cn-quill",
      uri: null,
    };
  }

  shareImage = async () => {
    const uri = await this.refs.viewShot.capture().then((uri) => {
      console.log("do something with ", uri);
      this.setState({ uri: uri });
    });
    const shareResponse = await Share.open({ url: this.state.uri });
    console.log("shareResponse", shareResponse);
  };

  render() {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={["#02967c", "#049e6a", "#06a558"]}
          style={{
            height: h("12%"),
            width: "100%",
            // backgroundColor:'#00918A',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              marginTop: h("3%"),
            }}
          >
            Share Text
          </Text>
        </LinearGradient>
        <ViewShot
          ref="viewShot"
          options={{ format: "jpg", quality: 0.9 }}
          style={{
            height: h("76%"),
          }}
        >
          <QuillEditor
            style={styles.editor}
            ref={this._editor}
            initialHtml={`<h2>${this.props.navigation.getParam(
              "arabic"
            )}</h2><br><br><h2>${this.props.navigation.getParam(
              "item"
            )}</h2><br>
            
            <h3>${this.props.navigation.getParam("translation")}</h3>`}
          />
        </ViewShot>
        <QuillToolbar editor={this._editor} options="full" theme="light" />
        <View
          style={{
            height: h("7%"),
            width: "100%",
            alignItems: "center",
            marginTop: h("2%"),
            marginBottom: h("2%"),
          }}
        >
          <TouchableOpacity
            onPress={() => this.shareImage()}
            // onPress={()=> {this.props.navigation.navigate('ImageScreen',{item:this.state.user.translation})}}
            style={{
              height: h("7%"),
              width: "90%",
              backgroundColor: "#07A851",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: h("1%"),
            }}
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>Share Text</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    height: h("100%"),
    width: "100%",
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eaeaea",
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: "white",
  },
});

export default Editor;
