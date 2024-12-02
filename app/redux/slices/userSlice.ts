import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserProfileThunk } from "./operations";

interface UserState {
  name: string | null;
  avatarUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  name: null,
  avatarUrl: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching user profile
    builder
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfileThunk.fulfilled,
        (state, action: PayloadAction<{ name: string; avatarUrl: string }>) => {
          state.name = action.payload.name;
          state.avatarUrl = action.payload.avatarUrl;
          state.loading = false;
        }
      )
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
