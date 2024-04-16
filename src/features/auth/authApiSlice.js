import { apiSlice } from "../../app/api/apiSlice"
import { setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'https://api.escuelajs.co/api/v1/auth/login',
                method: 'POST',
                body: { ...credentials}
            }),
        }),
        profile: builder.mutation({
            query: () => ({
                url: '/auth/profile',
                method: 'GET',
            }),
        }),
        refresh: builder.mutation({
            query: (credentials) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                body: { ...credentials }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    // dispatch(setCredentials({ accessToken:null}));
                    // console.log(err)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useProfileMutation,
    useRefreshMutation
} = authApiSlice 