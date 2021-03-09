import React, { useState } from "react";
import { StyleSheet } from "react-native";

import "./api/database";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home";
import RestaurantPage from "./screens/RestaurantPage";
import ReviewPage from "./screens/ReviewPage";
import ProfilePage from "./screens/profile";
import LandingPage from "./screens/landingScreen";
import LoginPage from "./screens/login";

const Stack = createStackNavigator();

export default function App() {
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
  const [signedIn, setSignedIn] = useState(false);
  const x = () => {
    console.warn("OK");
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
