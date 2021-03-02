import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import RestaurantCard from "../Components/RestaurantCard";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
const Profile = ({ navigation, setSignedIn }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSignedIn(false)}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
