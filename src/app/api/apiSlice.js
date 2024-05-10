import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectCurrentToken, setCredentials } from '../../features/auth/authSlice'

const urls = {
    development: "https://localhost:7160",
    production: "",
};

/**
 * Header
 */
    const baseQuery = fetchBaseQuery({
        // baseUrl: urls[process.env.NODE_ENV],
        baseUrl: `${import.meta.env.VITE_API_URL}`,
        credentials: 'same-origin',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
        return headers
        }
    })

/**
 * 
 * @param {*} args 
 * @param {*} api 
 * @param {*} extraOptions 
 * @returns 
 */

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log(args) // request url, method, body
    console.log(api) // signal, dispatch, getState()
     console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)
    
    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth', 'Users'],
    endpoints: builder => ({})
})