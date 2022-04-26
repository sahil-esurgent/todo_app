import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
      <Icon name="pen" size={20} color="#55BCF6" />
    </TouchableOpacity>
    // <TouchableOpacity>
    //   <Icon name="pen" size={20} color="#55BCF6" />
    // </TouchableOpacity>
  );
};

export default HomeScreen;
