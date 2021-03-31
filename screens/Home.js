import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Formik } from "formik";
import RestaurantCard from "../Components/RestaurantCard";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { render_restaurants } from "../api/restaurants";

const Home = ({ navigation }) => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const restaurant_redirect = (data) => {
    navigation.navigate("Restaurant", { data, fetch });
  };
  const fetch = async (query) => {
    setLoading(true);
    const data = await render_restaurants(query);
    setRestaurantData(data);
    setLoading(false);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Text style={styles.textHeader}>Restaurants</Text>
        </View>

        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values, { resetForm }) => {
            // console.warn("Seaching for " + values.search);
            fetch(values.search);
            resetForm();
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
        {loading ? (
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 50, color: "grey", textAlign: "center" }}>
              LOADING....
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.RestaurantFlatList}>
              <FlatList
                data={restaurantData}
                renderItem={({ item }) => {
                  return (
                    <RestaurantCard
                      info={item}
                      redirect={restaurant_redirect}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </>
        )}
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
    height: "100%",
  },
  RestaurantFlatList: {
    width: "100%",
    // paddingBottom: 30,
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
    bottom: "3%",
    right: "7%",
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
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
