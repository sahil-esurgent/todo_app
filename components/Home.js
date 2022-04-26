import { Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();

const Homepage = () => {
  return (
    <View>
      <Text>Edit Page</Text>
    </View>
  );
};

// const editTodos = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Homepage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default Homepage;
