import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const landingscreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cheff's Kiss</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C94545",
    height: "100%",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    paddingTop: "50%",
    paddingBottom: 40,
    fontSize: 40,
    color: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});

export default landingscreen;
