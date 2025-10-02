const { createSlice } = require("@reduxjs/toolkit");

const sidebarSlice = createSlice({
    name: 'tooltip',
    initialState: {title:'',classification: ''},
    reducers: {
        setShow: (state, action) =>{
            state.show = action.payload
        },
        setContent: (state, {payload: {obj_name, obj_cod, classification}}) =>{
            state.obj_name = obj_name
            state.obj_cod = obj_cod
            state.classification = classification
        }
    }
})

export const {setContent, setShow} = sidebarSlice.actions

export default sidebarSlice.reducer