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
const Home = ({ navigation }) => {
  const restaurant_data = [
    {
      name: "McDonalds",
      image: require("../assets/mcdonalds.png"),
      rating: 3.4,
    },
    {
      name: "Wendy's",
      image: require("../assets/wendys.png"),
      rating: 2.0,
    },
    {
      name: "Buffalo Wild Wings",
      image: require("../assets/bww.png"),
      rating: 5,
    },
    {
      name: "Burger Priest",
      image: require("../assets/bp.png"),
      rating: 1.7,
    },
    {
      name: "The Keg",
      image: require("../assets/keg.png"),
      rating: 4.6,
    },
    {
      name: "Red Lobster",
      image: require("../assets/rl.png"),
      rating: 3.4,
    },
    {
      name: "Domino's Pizza",
      image: require("../assets/dominoes.png"),
      rating: 3.4,
    },
    {
      name: "Domo's Pizza",
      rating: 3.4,
      image: require("../assets/dominoes.png"),
    },
    {
      name: "Domiano's Pizza",
      image: require("../assets/dominoes.png"),
      rating: 3.4,
    },
  ];

  const restaurant_redirect = (data) => {
    navigation.navigate("Restaurant", { data });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={styles.textHeader}>Restaurants</Text>
      </View>
      <View style={styles.addReviewView}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome
            style={styles.addIcon}
            name="user-circle-o"
            size={60}
            color="#C94545"
          />
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, actions) => {
          console.warn("Seaching for " + values.search);
          actions.resetForm();
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <View style={styles.form}>
            <TextInput
              onSubmitEditing={handleSubmit}
              style={styles.searchbar}
              onChangeText={handleChange("search")}
              placeholder="Search For Restaurant"
              returnKeyType="done"
            />
          </View>
        )}
      </Formik>

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons name="restaurant" size={16} color="black" />
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons name="near-me" size={16} color="black" />
          <Text>Near Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons name="fastfood" size={16} color="black" />
          <Text>Fast Food</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.RestaurantFlatList}>
        <FlatList
          data={restaurant_data}
          renderItem={({ item }) => {
            return (
              <RestaurantCard info={item} redirect={restaurant_redirect} />
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
  },
  RestaurantFlatList: {
    width: "100%",
    paddingBottom: 390,
  },
  textHeader: {
    fontSize: 25,
    paddingVertical: 20,
  },
  form: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: 20,
  },
  searchbar: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    width: "100%",
    borderRadius: 6,
  },
  btn: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  addReviewView: {
    position: "absolute",
    right: 40,
    bottom: "23%",
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 20,
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

export default Home;
