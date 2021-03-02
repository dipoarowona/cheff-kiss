import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import RestaurantCard from "../Components/RestaurantCard";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
const Profile = ({ navigation, setSignedIn }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSignedIn(false)}>
        <MaterialIcons
          name="settings"
          color="#000"
          size={30}
          style={styles.settingsGear}
        />
      </TouchableOpacity>
      <View style={styles.headerRow}>
        <Image
          style={styles.profilePic}
          alt="profile-pic"
          source={require("../assets/bp.png")}
        />
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text>Reviews</Text>
          <Text>123</Text>
        </View>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text>Average Rating</Text>
          <Text>123</Text>
        </View>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text>Average Rating</Text>
          <Text>123</Text>
        </View>
      </View>
      <Text style={styles.username}> Dipo Arowona</Text>
      <View style={styles.bioEditView}>
        <Text>Bio</Text>
        <TouchableOpacity style={styles.editAccountBtn}>
          <Text>Edit Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewMediaHeader}>
        <Text>Reviews</Text>
        <Text>Media</Text>
      </View>
      <View style={styles.addReviewView}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome
            style={styles.addIcon}
            name="home"
            size={60}
            color="#C94545"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
    height: "100%",
  },
  settingsGear: {
    position: "absolute",
    right: 10,
    top: 3,
  },
  headerRow: {
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    paddingHorizontal: "2.5%",
    paddingVertical: 15,
    fontWeight: "600",
  },
  bioEditView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
  },
  editAccountBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 11,
    backgroundColor: "#fff",
  },
  reviewMediaHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 30,
    borderBottomWidth: 2,
  },
  addReviewView: {
    position: "absolute",
    bottom: "3%",
    right: "7%",
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
  addIcon: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.0,
    elevation: 10,
  },
});

export default Profile;
