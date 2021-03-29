import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";

import { post } from "../api/posts";

const AddReviewModal = (props) => {
  const modalVisible = props.visible;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headerText}>New Review For {props.name}</Text>
              <Formik
                initialValues={{
                  location: "",
                  rating: "",
                  review: "",
                }}
                onSubmit={({ location, rating, review }) => {
                  post({
                    name: props.name,
                    location,
                    rating: parseFloat(rating),
                    review,
                  });
                  props.setModalVisible(!modalVisible);
                  props.fetch();
                }}
              >
                {({ handleChange, handleSubmit, values }) => (
                  <View style={styles.form}>
                    <TextInput
                      placeholder="City"
                      style={styles.input}
                      onChangeText={handleChange("location")}
                      value={values.location}
                      returnKeyType="done"
                    />
                    <TextInput
                      placeholder="Rating"
                      style={styles.input}
                      onChangeText={handleChange("rating")}
                      value={values.rating}
                      keyboardType="numeric"
                      returnKeyType="done"
                    />
                    <TextInput
                      multiline
                      placeholder="Description"
                      style={[styles.input, { height: 130 }]}
                      onChangeText={handleChange("review")}
                      value={values.review}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        width: "80%",
                        justifyContent: "space-around",
                      }}
                    >
                      <Pressable
                        style={[
                          styles.button,
                          styles.buttonClose,
                          { backgroundColor: "red" },
                        ]}
                        onPress={() => props.setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        title="submit"
                        onPress={handleSubmit}
                      >
                        <Text style={styles.textStyle}>Submit</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 12,
    paddingVertical: 50,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  headerText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#C4C4C4",
    height: 30,
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
});

export default AddReviewModal;
