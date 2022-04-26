import { StatusBar } from "expo-status-bar";
import react, { useState, useEffect, Component } from "react";
import apis from "./apis/todoApi";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [todos, setTodos] = useState([]);

  const Stack = createNativeStackNavigator();

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  };

  const retriveTodos = () => {
    apis
      .get("todo_list")
      .then((response) => {
        console.log("data", response.data);
        setTodos(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    retriveTodos();
  }, []);

  const addTodos = async () => {
    await apis
      .post("todo_add", { Title: task, Status: "Pending" })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        retriveTodos();
        setTask(null);
      });
  };
  console.log("my todos", todos);
  if (todos.length > 0) {
    return (
      <View style={styles.container}>
        {/* Today's Task */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>

          <View style={styles.items}>
            {/* <NavigationContainer>
              <Stack.Navigator initialRouteName="Task">
                <Stack.Screen
                  name="Task"
                  options={{ headerShown: false }}
                  component={Task}
                  initialParams={{ param: todos }}
                > */}
            {/* {(props) => <Task {...props} todos={todos} />} */}
            {/* </Stack.Screen>
                <Stack.Screen name="Homepage" component={Home} />
              </Stack.Navigator>
            </NavigationContainer> */}
            <Task todos={todos} />
          </View>
        </View>

        {/* Write a Task */}
        <View style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder={"Write a Task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => addTodos()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  } else {
    return <Text>Its okay</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
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
  addText: {},
});
