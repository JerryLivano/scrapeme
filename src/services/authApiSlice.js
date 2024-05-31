import { apiSlice } from "../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        newpassword: builder.mutation({
            query: (credentials) => ({
                url: 'user/reset-password',
                method: 'POST',
                body: { ...credentials }
        }),
    }),
});

export const {
    useLoginMutation,
    useNewPasswordMutation,
} = authApiSlice 