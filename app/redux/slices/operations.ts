import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../helpers/api";

// Define types
interface LoginCredentials {
  email: string;
  password: string;
}

interface UserProfile {
  name: string;
  avatarUrl: string;
}

// Login user
export const loginUserThunk = createAsyncThunk<string, LoginCredentials>(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await authAPI.post<{ email: string }>("/login", {
        email,
        password,
      });
      return data.email; // Assume the API returns the email
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

// Logout user
export const logoutUserThunk = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await authAPI.post("/logout");
      return; // No payload needed, just indicate success
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch user profile
export const fetchUserProfileThunk = createAsyncThunk<UserProfile, void>(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await authAPI.get<UserProfile>("/profile");
      return data; // Assume API returns { name, avatarUrl }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
