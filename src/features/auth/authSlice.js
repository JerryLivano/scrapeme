import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, loggedIn: false },
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload
            state.token = token
            state.loggedIn = true
        },
        logOut: (state, action) => {
            state.token = null
            Cookies.remove("token");
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.loggedIn;