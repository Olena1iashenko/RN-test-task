import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../redux/hooks"; // Import useAppDispatch
import { loginUserThunk } from "../redux/slices/operations"; // Import the loginUserThunk
import { useNavigation } from "@react-navigation/native"; // Navigation hook for navigation

// Validation schema for the form
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const AuthScreen = () => {
  const dispatch = useAppDispatch(); // Use typed dispatch
  const navigation = useNavigation(); // Use navigation hook

  // Handle login function
  const handleLogin = async (values: { email: string; password: string }) => {
    const result = await dispatch(loginUserThunk(values));

    // Check if the login was successful
    if (loginUserThunk.fulfilled.match(result)) {
      navigation.replace("Main"); // Navigate to the main screen on success
    } else {
      Alert.alert("Error", result.payload || "Login failed"); // Show error if login failed
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin} // Call handleLogin on form submission
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          {/* Email field */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          {/* Password field */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Submit button */}
          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
});

export default AuthScreen;
