const { createSlice } = require("@reduxjs/toolkit");

const sidebarSlice = createSlice({
    name: 'tooltip',
    initialState: {title:'',classification: ''},
    reducers: {
        setShow: (state, action) =>{
            state.show = action.payload
        },
        setContent: (state, {payload: {obj_name, obj_cod, general_status, indicator_statuses, indicators}}) =>{
            state.obj_name = obj_name
            state.obj_cod = obj_cod
            state.general_status = general_status
            state.indicators = indicators
            state.indicator_statuses = indicator_statuses
        }
    }
})

export const {setContent, setShow} = sidebarSlice.actions

export default sidebarSlice.reducer