import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser ={
    email:string;
    role:string;
    id:string
    iat:number;
    exp:number
}

type TLoginState ={
    user:null | TUser;
    token:null | string;
}
const initialState : TLoginState={
    user:null,
    token:null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log('Action received:', action);
            const { user, token } = action.payload;
            state.user = user;  
            state.token = token;
            // console.log('State updated:', state);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});


export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;

export const useCurrentToken = (state: RootState) => state.login.token;
export const useCurrentUser = (state: RootState) => state.login.user;