import React, { useContext, useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomePage from "../screens/HomePage";
import DashboardPage from "../screens/DashboardPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from "../screens/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";
import ContentPage from "../screens/ContentPage";
import RegisterPage from "../screens/RegisterPage";
import AppointPage from "../screens/AppointPage";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        // await AsyncStorage.removeItem("TOKEN");
        const storedToken = await AsyncStorage.getItem("TOKEN");
        setToken(storedToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    getToken();
  }, []);

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="Dashboard" component={DashboardPage} />
            <Stack.Screen name="Content" component={ContentPage} />
            <Stack.Screen name="Appoint" component={AppointPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
