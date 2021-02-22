import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import RestaurantCard from "../Components/RestaurantCard";

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
    paddingBottom: 100,
  },
  textHeader: {
    fontSize: 25,
  },
});

export default Home;
