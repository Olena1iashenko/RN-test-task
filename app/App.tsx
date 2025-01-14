import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./components/AuthScreen";
import MainTabs from "./components/MainTabs";
import { useAppSelector, useAppDispatch } from "./redux/hooks";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const status = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(status === "true");
    };
    checkAuth();
  }, [dispatch]);

  if (isLoggedIn === null) {
    return null; // You can add a splash screen here
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
