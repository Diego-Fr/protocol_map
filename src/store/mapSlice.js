import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "counter",
  initialState: { map: undefined },
  reducers: {
    setMap: (state, action) =>{
        state.map = action.payload
    }
  }
});

export const { setMap } = mapSlice.actions;
export default mapSlice.reducer;