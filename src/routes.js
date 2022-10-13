import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "./screens/Loading";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import WelcomeScreen from "./screens/Welcome";
import QuranScreen from "./screens/Quran";
import QuranDetailScreen from "./screens/QuranDetail";
import PrayerScreen from "./screens/Prayer";
import MasjidScreen from "./screens/Masjid";
import QiblaScreen from "./screens/Qibla";
import BroadcastingScreen from "./screens/Broadcasting";
import BroadcastPlayerScreen from "./screens/BroadcastPlayer";
import EventScreen from "./screens/Event";
import EventDetailScreen from "./screens/EventDetail";
import Location from "./screens/location";
import TabNavigator from "./TabNavigation";
import More from "./screens/More";
import ShowItem from "./screens/Dua/ShowItem";
import QuranCopy from "./screens/qurancopy";
import Editor from "./screens/editor/Editor";
import ImageScreen from "./screens/image/Image";
import ShareImage from "./screens/image/ShareImage";
import Settings from "./screens/saeetings/Settings";
import PrayerTime from "./screens/PrayerTimmings/PrayerTimes";

const LoginStack = createSwitchNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: "none",
  }
);

const MainStack = createStackNavigator(
  {
    TabNavigator: TabNavigator,
    ImageScreen: ImageScreen,
    ShareImage: ShareImage,
    QuranCopy: QuranCopy,
    PrayerTime: PrayerTime,
    Editor: Editor,
    More: More,
    ShowItem: ShowItem,
    Welcome: WelcomeScreen,
    Location: Location,
    Quran: QuranScreen,
    QuranDetail: QuranDetailScreen,
    Prayer: PrayerScreen,
    Masjid: MasjidScreen,
    Qibla: QiblaScreen,
    Broadcasting: BroadcastingScreen,
    BroadcastPlayer: BroadcastPlayerScreen,
    Event: EventScreen,
    EventDetail: EventDetailScreen,
    Setting: Settings,
  },
  {
    headerMode: "none",
  }
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginStack,
      MainStack,
    },
    {
      initialRouteName: "LoadingScreen",
    }
  )
);

export default Routes;
