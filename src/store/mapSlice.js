import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: { userLocation: {lat: null, lng: null}, highlight: {lat: null, lng: null, type: ''}, view:{dummy: 1}, geometry: undefined},
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
    setMapView: (state, {payload: {lat='', lng='', zoom=7}}) =>{      
      state.view.lat = lat
      state.view.lng = lng
      state.view.zoom = zoom
    },
    viewToCenter: (state, {}) =>{
      state.view.lat = '-22.55'
      state.view.lng = '-48.63'
      state.view.zoom = 7
      state.view.dummy++
      // console.log(state.);
      
    }
  }
});

export const { setUserLocation, setHighlight , setHighlightGeometry,setMapView,viewToCenter} = mapSlice.actions;
export default mapSlice.reducer;
