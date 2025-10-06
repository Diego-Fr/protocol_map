import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "counter",
  initialState: { userLocation: {lat: null, lng: null} },
  reducers: {
    setUserLocation: (state, {payload: { lat, lng }}) =>{
        state.userLocation.lat = lat
        state.userLocation.lng = lng
    }
  }
});

export const { setUserLocation } = mapSlice.actions;
export default mapSlice.reducer;