import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './mapSlice'
import sidebarReducer from './sidebarSlice'
import sliderReducer from './sliderSlice'
import userReducer from './userSlice'

export const makeStore = configureStore({
  reducer: {
    map: mapReducer,
    sidebar: sidebarReducer,
    slider: sliderReducer,
    user: userReducer
  },
})