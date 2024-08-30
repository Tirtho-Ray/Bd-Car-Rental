import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState ={
    name:'',
    email:'',
    password:'',
    phone:'',
}
const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers:{
        setName:(state, action: PayloadAction<string>) =>{
            state.name = action.payload;
        },
        setEmail:(state, action: PayloadAction<string>) =>{
            state.email = action.payload;
        },
        setPassword:(state, action: PayloadAction<string>) =>{
            state.password = action.payload;
        },
        setPhone:(state, action: PayloadAction<string>) =>{
            state.phone = action.payload;
        },
    }
});

export const{setName,setEmail,setPassword,setPhone} = registerSlice.actions;
export default registerSlice.reducer;
