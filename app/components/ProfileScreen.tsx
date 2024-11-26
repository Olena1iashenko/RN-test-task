import { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users/2");
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    navigation.replace("Auth");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) return null;

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.userInfo}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text>Name: {user.first_name}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Change theme to: light" />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    position: "relative",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#95a5a6",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: "90%",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    gap: 5,
    color: "#ecf0f1",
    fontSize: 20,
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
    justifyContent: "space-between",
    gap: 10,
    position: "absolute",
    bottom: 30,
  },
});
export default ProfileScreen;
