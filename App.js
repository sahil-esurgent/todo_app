import react, { useState, useEffect, Component } from "react";
import apis from "./apis/todoApi";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import Task from "./components/Task";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class App extends Component {
  state = {
    task: null,
    todos: [],
  };
  constructor() {
    super();
  }

  async componentDidMount() {
    this.retriveTodos();
    await Font.loadAsync({
      "BerkshireSwash-Regular": require("./assets/fonts/BerkshireSwash-Regular.ttf"),
      "Rye-Regular": require("./assets/fonts/Rye-Regular.ttf"),
    });
  }

  retriveTodos = async () => {
    await apis
      .get("todo_list")
      .then((response) => {
        console.log("All Todos Data =========> ", response.data);
        this.setState({ todos: response.data });
        // this.state.todos = response.data;
        this.forceUpdate();
        console.log("This set state ==============> ", this.state.todos);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  addTodos = async () => {
    if (this.state.task != null) {
      await apis
        .post("todo_add", { Title: this.state.task, Status: "Pending" })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.retriveTodos();
          this.setState({ task: null });
        });
    } else {
      Alert.alert("Error", "Please Enter Task Details!");
    }
  };

  render() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer style={styles.container}>
        {/* Today's Task */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
        </View>
        <Stack.Navigator initialRouteName="Task">
          <Stack.Screen
            name="Task"
            options={{ headerShown: false }}
            style={styles.items}
          >
            {(props) => (
              <Task
                todos={this.state.todos}
                {...props}
                allTodos={this.retriveTodos}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Homepage" component={Home} />
        </Stack.Navigator>

        {/* Write a Task */}
        <View style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder={"Write a Task"}
            value={this.state.task}
            onChangeText={(text) => this.setState({ task: text })}
          />
          <TouchableOpacity onPress={() => this.addTodos()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 70,
    // paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: wp(7),
    // fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "Rye-Regular",
  },
  items: {
    marginTop: 30,
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
    width: wp(70),
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
  addText: {},
});

export default App;
