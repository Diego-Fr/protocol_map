import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: { userLocation: {lat: null, lng: null}, highlight: {lat: null, lng: null, type: ''}, view:{}, geometry: undefined},
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
    },
    setMapView: (state, {payload: {lat='', lng='', zoom=''}}) =>{      
      state.view.lat = lat
      state.view.lng = lng
      state.view.zoom = zoom
    }
  }
});

export const { setUserLocation, setHighlight , setHighlightGeometry,setMapView} = mapSlice.actions;
export default mapSlice.reducer;
