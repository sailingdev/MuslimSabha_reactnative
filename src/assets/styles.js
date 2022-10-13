import { StyleSheet, Platform } from "react-native";
import colors from "./colors";
const styles = {
  headerBar: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    marginTop: 0,
  },
  centerTitle: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottom: 0,
  },
  cardHero: {
    flex: 1,
    marginTop: -1,
    marginLeft: 0,
    marginRight: 0,
  },
  cardItemHero: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
  },
  imageHero: {
    flex: 1,
    height: 250,
    width: null,
    alignItems: "center",
    justifyContent: "center",
  },
  menuCol: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  menuRow: { marginTop: 20 },
  timeTitle: {
    color: "#ffffff",
    fontSize: 50,
  },
  dateTitle: {
    color: "#ffffff",
    fontSize: 30,
    marginTop: 15,
  },
  dateSubTitle: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 15,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red",
  },
  cardStyle: {
    flex: 1,
    flexDirection: "row",
  },
  buttonStyle: {
    padding: 30,
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  overlayWhite: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  heroText: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTextEvent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  tabs: {
    backgroundColor: colors.primaryColor,
  },
  tab: {
    backgroundColor: colors.backgroundColor,
  },
  tabActive: {
    backgroundColor: colors.backgroundColor,
    color: colors.primaryColor,
  },
  avaNumber: {
    fontWeight: "bold",
    fontSize: 20,
  },
  txtBold: { fontSize: 15, fontWeight: "bold" },
  txtBoldPrimary: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "black",
  },
  txtArabicBoldPrimary: {
    fontFamily: "MeQuran",
    fontSize: 14,
    // fontWeight: "bold",
    color: colors.primaryColor,
  },
  txtBoldLarge: { fontSize: 20, fontWeight: "bold", color: colors.grey },
  txtLarge: { fontSize: 20, color: colors.grey },
  leftNumber: {
    flex: 1,
    width: 50,
  },
  txtArabicBold: {
    fontSize: 30,
    color: "black",
    fontFamily: "MeQuran",
  },
  listAyah: {
    flex: 1,
    height: null,
    marginTop: 10,
  },
  bismillah: {
    borderBottom: 0,
    marginBottom: 10,
  },
  viewInput: {
    backgroundColor: colors.primaryColor,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  itemInput: {
    borderRadius: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  centerView: {
    flex: 1,
    alignItems: "center",
  },
  contentForm: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 80 : 35,
    marginBottom: 35,
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
  },
  contentFormScroll: {
    flex: 1,
    marginTop: 10,
    marginBottom: 35,
    width: "100%",
    height: undefined,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  separator: {
    marginTop: 35,
    marginBottom: 10,
  },
  loginInput: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "white",
  },
  btnRounded: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
  },
};

export default styles;
