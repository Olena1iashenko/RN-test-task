import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./components/AuthScreen";
import MainTabs from "./components/MainTabs";
import { login } from "./redux/slices/authSlice";
import { RootState } from "./redux/store";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const checkAuth = async () => {
      const status = await AsyncStorage.getItem("isLoggedIn");
    };
    checkAuth();
  }, [dispatch]);

  if (isLoggedIn === null) {
    return null; // Optionally, you can add a loading spinner here
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default App;
