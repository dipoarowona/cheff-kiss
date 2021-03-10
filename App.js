import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import * as firebase from "firebase";
import { firebaseConfig } from "./api/database";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home";
import RestaurantPage from "./screens/RestaurantPage";
import ReviewPage from "./screens/ReviewPage";
import ProfilePage from "./screens/profile";
import LandingPage from "./screens/landingScreen";
import LoginPage from "./screens/login";
import SignUpPage from "./screens/signup";

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  });

  const options = {
    title: "Cheff's Kiss",
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: "#C94545",
      height: 110,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 40,
    },
  };
  const LoginOptions = { ...options };
  LoginOptions.headerStyle.shadowOffset = { height: 0, width: 0 };
  return (
    <NavigationContainer>
      {signedIn ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={options} />
          <Stack.Screen
            name="Restaurant"
            component={RestaurantPage}
            options={options}
          />
          <Stack.Screen
            name="Profile"
            options={{
              ...options,
              headerLeft: null,
            }}
          >
            {(props) => <ProfilePage {...props} setSignedIn={setSignedIn} />}
          </Stack.Screen>
          <Stack.Screen
            name="Review"
            component={ReviewPage}
            options={options}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{
              title: "",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#C94545",
                height: 50,
                shadowOffset: { height: 0, width: 0 },
              },
            }}
          />

          <Stack.Screen name="LoginPage" options={{ ...LoginOptions }}>
            {(props) => <LoginPage {...props} setSignedIn={setSignedIn} />}
          </Stack.Screen>
          <Stack.Screen name="SignUpPage" options={{ ...LoginOptions }}>
            {(props) => <SignUpPage {...props} setSignedIn={setSignedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
