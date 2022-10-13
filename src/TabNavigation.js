import React from "react";
import { Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import PrayerScreen from "./screens/Prayer";
import QiblaScreen from "./screens/Qibla";
import QuranScreen from "./screens/Quran";
import WelcomeScreen from "./screens/Welcome";

import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons1 from "react-native-vector-icons/Fontisto";
import Ionicons2 from "react-native-vector-icons/Feather";
import Ionicons3 from "react-native-vector-icons/FontAwesome5";
import Ionicons4 from "react-native-vector-icons/Entypo";
import { Dua } from "./screens/Dua";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: PrayerScreen,
    Qibla: QiblaScreen,
    AlQuran: QuranScreen,
    Dua: Dua,
    More: WelcomeScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let IconComponent1 = Ionicons1;
        let IconComponent2 = Ionicons2;
        let IconComponent3 = Ionicons3;
        let IconComponent4 = Ionicons4;
        let iconName;
        if (routeName === "Home") {
          return (
            <IconComponent name={"ios-home"} size={25} color={tintColor} />
          );
          // iconName = focused
          //   ? 'ios-home'
          //   : 'ios-home';
          // // Sometimes we want to add badges to some icons.
          // // You can check the implementation below.
          // // IconComponent = HomeIconWithBadge;
        } else if (routeName === "Qibla") {
          // iconName = focused ? 'compass-outline' : 'compass-outline';
          return (
            <IconComponent1 name={"compass"} size={25} color={tintColor} />
          );
        } else if (routeName === "AlQuran") {
          // iconName = focused ? 'compass-outline' : 'compass-outline';
          return (
            <IconComponent2 name={"book-open"} size={25} color={tintColor} />
          );
        } else if (routeName === "Dua") {
          // iconName = focused ? 'compass-outline' : 'compass-outline';
          return (
            <IconComponent3 name={"hand-holding"} size={25} color={tintColor} />
          );
        } else if (routeName === "More") {
          // iconName = focused ? 'compass-outline' : 'compass-outline';
          return (
            <IconComponent4
              name={"dots-three-horizontal"}
              size={25}
              color={tintColor}
            />
          );
        }

        // You can return any component that you like here!
      },
    }),
    tabBarOptions: {
      activeTintColor: "#07A851",
      inactiveTintColor: "gray",
    },
  }
);

export default createAppContainer(TabNavigator);
