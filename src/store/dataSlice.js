import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "slider",
  initialState: { },
  reducers: {
    setSubugrhis: (state, action) =>{
        state.subugrhis = action.payload
    }
  }
});

export const { setSubugrhis } = dataSlice.actions;
export default dataSlice.reducer;