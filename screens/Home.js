import React, { useEffect, useState, useRef, useCallback } from "react";
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
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Formik } from "formik";
import RestaurantCard from "../Components/RestaurantCard";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { render_restaurants } from "../api/restaurants";
import { save_not_token } from "../api/user";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const Home = ({ navigation }) => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          >
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    save_not_token(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export default Home;
