import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { logout, delete_account } from "../api/user";
const settingsModal = (props) => {
  const modalVisible = props.visible;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={{ position: "absolute", right: 20, top: 10 }}
                onPress={() => props.setModalVisible(!modalVisible)}
              >
                <Entypo name="cross" size={24} color="black" />
              </Pressable>
              <Text style={styles.headerText}>Account Settings</Text>

              <View
                style={{
                  width: "80%",
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "red", marginBottom: 20 },
                  ]}
                  onPress={() => {
                    logout();
                    props.setSignedIn(false);
                  }}
                >
                  <Text style={styles.textStyle}>Logout</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "red" },
                  ]}
                  title="submit"
                  onPress={() => {
                    Alert.alert(
                      "Delete Account",
                      "Confirm That you want to delete your account. Note that once deleted you can no longer access account data.",
                      [
                        {
                          text: "Delete Account",
                          onPress: () => {
                            delete_account();
                            // logout();
                            // props.setSignedIn(false);
                          },
                          style: "destructive",
                        },
                        {
                          text: "Dismiss",
                          onPress: () => {},
                          style: "cancel",
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>Delete Account</Text>
                </Pressable>
              </View>
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

export default settingsModal;
