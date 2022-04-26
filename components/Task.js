import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import apis from "../apis/todoApi";
import HomeScreen from "./HomeScreen";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import react, { useState } from "react";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const fetchFonts = () => {
  return Font.loadAsync({
    "Podkova-VariableFont_wght": require("../assets/fonts/Podkova-VariableFont_wght.ttf"),
  });
};

const Task = (props) => {
  // console.log(props);
  // console.log("Routes Params =============>", props.route.params);
  console.log("Todo Props Data =======================> ", props);
  // const navigation = useNavigation();

  const MyLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size={40} animating={true} color="#55BCF6" />
        <Text style={styles.addText}>Loading Today's Task...</Text>
      </View>
    );
  };

  const deleteTodos = (id) => {
    apis
      .delete("todo_delete/" + id)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        props.allTodos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateTodo = (id, status) => {
    apis
      .patch("todo_update/" + id, { Status: status })
      .then((response) => {
        console.log(response.data);
        props.allTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.warn}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }

  if (props.todos.length > 0) {
    return props.todos.map((items, index) => {
      const status = items.Status;
      // const onPress = deleteTodos(items.id);
      console.log("Status --------> ", status);
      return (
        <View style={styles.item} key={index}>
          <View style={styles.itemLeft}>
            <View style={styles.squre}></View>
            {status == "Completed" ? (
              <Text style={styles.itemText_1}>{items.Title}</Text>
            ) : (
              <Text style={styles.itemText_2}>{items.Title}</Text>
            )}
          </View>
          <View style={styles.circular}>
            {/* <TouchableOpacity onPress={() => editTodos}>
              <Icon name="pen" size={20} color="#55BCF6" />
            </TouchableOpacity> */}
            {status == "Completed" ? (
              <TouchableOpacity
                onPress={() => updateTodo(items.id, (items.Status = "Pending"))}
              >
                <Icon name="times-circle" size={20} color="#55BCF6" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  updateTodo(items.id, (items.Status = "Completed"))
                }
              >
                <Icon name="check-circle" size={20} color="#55BCF6" />
              </TouchableOpacity>
            )}
            {/* <HomeScreen /> */}
            <View style={styles.circular_1}>
              <TouchableOpacity onPress={() => deleteTodos(items.id)}>
                <Icon name="trash" size={20} color="#55BCF6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  } else {
    return (
      <MyLoader />
      // <Text style={styles.addText}>Loading Today's Task...</Text>
    );
  }
  // return (
  //   <View style={styles.item}>
  //     <View style={styles.itemLeft}>
  //       <View style={styles.squre}></View>
  //       <Text style={styles.itemText}>{todos}</Text>
  //     </View>
  //     <View style={styles.circular}>
  //       <TouchableOpacity>
  //         <Icon name="pen" size={20} color="#55BCF6" />
  //       </TouchableOpacity>
  //     </View>
  //     <View style={styles.circular_1}>
  //       <TouchableOpacity>
  //         <Icon name="trash" size={20} color="#55BCF6" />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 20,
    marginTop: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  squre: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText_1: {
    maxWidth: "80%",
    color: "#008000",
    fontFamily: "Podkova-VariableFont_wght",
    fontSize: 18,
  },
  itemText_2: {
    maxWidth: wp(60),
    color: "#FF0000",
    fontFamily: "Podkova-VariableFont_wght",
    fontSize: 18,
  },
  circular_1: {
    paddingLeft: 17,
    // paddingLeft: 10,
  },
  circular: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {
    maxWidth: "80%",
    fontFamily: "Podkova-VariableFont_wght",
    fontSize: 30,
  },
  loaderStyle: {
    flex: 1,
    marginBottom: hp("30%"),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Task;
