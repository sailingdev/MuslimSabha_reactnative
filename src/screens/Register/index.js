import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  StatusBar,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "./../../assets/colors";
import st from "./../../assets/styles";

import { observer, inject } from "mobx-react";
import {
  Spinner,
  Button,
  Card,
  CardItem,
  Input,
  Left,
  Right,
  Container,
  Content,
  Body,
  Title,
  Header,
} from "native-base";
import {
  AdMobBanner,
  PublisherBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from "react-native-admob";
import ArchRoundedButton from "./../../components/ArchRoundedButton";
import ArchInput from "./../../components/ArchInput";

class RegisterScreen extends Component {
  componentDidMount() {}

  render() {
    const { userStore } = this.props.store;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={colors.primaryColor}
          barStyle="light-content"
        />
        <LinearGradient
          colors={[
            colors.primaryColor,
            colors.secondaryColor,
            colors.primaryColor,
          ]}
          style={st.centerView}
        >
          <View style={{ marginTop: Platform.OS === "ios" ? 80 : 30 }} />
          <Image
            source={require(`./../../assets/images/logo.png`)}
            resizeMode="contain"
            style={st.logoImage}
          />
          <View style={st.contentFormScroll}>
            <View style={st.separator} />

            <ScrollView style={{ flex: 1 }}>
              <ArchInput name="username" />
              <ArchInput name="email" />
              <ArchInput name="location" />
              <ArchInput name="address" />
              <ArchInput name="mobile" />
              <ArchInput name="password" />
              <ArchInput name="repeatPassword" />

              <ArchRoundedButton
                text="REGISTER"
                navigation={this.props.navigation}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: Platform.OS === "ios" ? 30 : 5,
            }}
          >
            <Button transparent>
              <Text style={{ color: "white" }}>Have an account?</Text>
            </Button>
            <Button
              transparent
              style={{ marginLeft: 5 }}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Login Here
              </Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default inject("store")(observer(RegisterScreen));
