import { apiSlice } from "../../app/api/apiSlice"
import { setCredentials } from "./authSlice"


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        profile: builder.mutation({
            query: () => ({
                url: "/auth/profile",
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
                const { data } = await queryFulfilled;
                const { accessToken } = data;
                dispatch(setCredentials({ accessToken }));
            }
        }),
    })
});

export const {
    useLoginMutation,
    useProfileMutation,
    useRefreshMutation
} = authApiSlice 