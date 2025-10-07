const { createSlice } = require("@reduxjs/toolkit");

const sidebarSlice = createSlice({
    name: 'tooltip',
    initialState: {title:'',classification: '', location: undefined},
    reducers: {
        setShow: (state, action) =>{
            state.show = action.payload
        },
        setContent: (state, {payload: {obj_name, obj_cod, general_status, indicator_statuses, indicators, actions}}) =>{
            state.obj_name = obj_name
            state.obj_cod = obj_cod
            state.general_status = general_status
            state.indicators = indicators
            state.indicator_statuses = indicator_statuses
            state.actions = actions
        },
        setLocation: (state, action) =>{
            state.location = action.payload
        }
    }
})

export const {setContent, setShow, setLocation} = sidebarSlice.actions

export default sidebarSlice.reducer