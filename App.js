import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home";
import RestaurantPage from "./screens/RestaurantPage";
import ReviewPage from "./screens/ReviewPage";

const Stack = createStackNavigator();

export default function App() {
  const options = {
    title: "Cheff's Kiss",
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={options} />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantPage}
          options={options}
        />
        <Stack.Screen name="Review" component={ReviewPage} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
