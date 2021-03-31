import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "../Components/formValidation";
import { login_user } from "../api/user";

const login = ({ setSignedIn }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (user) => {
            const loginValid = await login_user(user);
            if (loginValid) {
              setSignedIn(true);
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
              <View style={{ width: "80%" }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>Email</Text>
              </View>

              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                style={styles.input}
                returnKeyType="done"
              />
              {errors.email && (
                <Text style={{ fontSize: 14, color: "white" }}>
                  {errors.email}
                </Text>
              )}
              <View style={{ width: "80%" }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>Password</Text>
              </View>

              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
                returnKeyType="done"
              />
              {errors.password && (
                <Text
                  style={{ paddingBottom: 10, fontSize: 14, color: "white" }}
                >
                  {errors.password}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  title="submit"
                  onPress={handleSubmit}
                >
                  <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
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
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    height: 30,
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  form: {
    width: "100%",
    alignItems: "center",
    paddingTop: "15%",
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default login;
