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
import { MaterialIcons } from "@expo/vector-icons";
const Home = ({ navigation }) => {
  const restaurant_data = [
    {
      name: "McDonalds",
      image: require("../assets/mcdonalds.png"),
    },
    {
      name: "Wendy's",
      image: require("../assets/wendys.png"),
    },
    {
      name: "Buffalo Wild Wings",
      image: require("../assets/bww.png"),
    },
    {
      name: "Burger Priest",
      image: require("../assets/bp.png"),
    },
    {
      name: "The Keg",
      image: require("../assets/keg.png"),
    },
    {
      name: "Red Lobster",
      image: require("../assets/rl.png"),
    },
    {
      name: "Domino's Pizza",
      image: require("../assets/dominoes.png"),
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
});

export default Home;
