import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {location: {lat: undefined, lng: undefined}},
  reducers: {
    setLocation: (state, {payload}) =>{
      state.location = payload
    }
  }
});

export const { setLocation } = userSlice.actions;
export default userSlice.reducer;