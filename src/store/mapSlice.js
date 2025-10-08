import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: { userLocation: {lat: null, lng: null}, highlight: {lat: null, lng: null, type: ''}, geometry: undefined},
  reducers: {
    setUserLocation: (state, {payload: { lat, lng }}) =>{
      state.userLocation.lat = lat
      state.userLocation.lng = lng
    },
    setHighlight: (state, {payload: highlight}) =>{      
      state.highlight = highlight
    },
    setHighlightGeometry: (state, {payload: {geometry}}) =>{
      state.geometry = geometry
    }
  }
});

export const { setUserLocation, setHighlight , setHighlightGeometry} = mapSlice.actions;
export default mapSlice.reducer;
