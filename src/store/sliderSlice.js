import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: { year: undefined, month: undefined},
  reducers: {
    setDate: (state, {payload: {year, month}}) =>{
        state.year = year
        state.month = month
    }
  }
});

export const { setDate } = sliderSlice.actions;
export default sliderSlice.reducer;