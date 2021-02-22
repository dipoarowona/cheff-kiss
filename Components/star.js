import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Octicons } from "@expo/vector-icons";

const star = (props) => {
  const overall_rating = props.rating;
  return (
    <>
      {overall_rating > 1 ? (
        <Octicons name="star" size={35} color="#C94545" />
      ) : overall_rating <= 1 && overall_rating > 0 ? (
        <Octicons name="star" size={35} color="#de9999" />
      ) : (
        <Octicons name="star" size={35} color="#E2E2E2" />
      )}
      {overall_rating >= 2 ? (
        <Octicons name="star" size={35} color="#C94545" />
      ) : overall_rating < 2 && overall_rating > 1 ? (
        <Octicons name="star" size={35} color="#de9999" />
      ) : (
        <Octicons name="star" size={35} color="#E2E2E2" />
      )}
      {overall_rating >= 3 ? (
        <Octicons name="star" size={35} color="#C94545" />
      ) : overall_rating < 3 && overall_rating > 2 ? (
        <Octicons name="star" size={35} color="#de9999" />
      ) : (
        <Octicons name="star" size={35} color="#E2E2E2" />
      )}
      {overall_rating >= 4 ? (
        <Octicons name="star" size={35} color="#C94545" />
      ) : overall_rating < 4 && overall_rating > 3 ? (
        <Octicons name="star" size={35} color="#de9999" />
      ) : (
        <Octicons name="star" size={35} color="#E2E2E2" />
      )}
      {overall_rating >= 5 ? (
        <Octicons name="star" size={35} color="#C94545" />
      ) : overall_rating < 5 && overall_rating > 4 ? (
        <Octicons name="star" size={35} color="#de9999" />
      ) : (
        <Octicons name="star" size={35} color="#E2E2E2" />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default star;
