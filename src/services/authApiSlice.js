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
        resetPass: builder.mutation({
            query: (credentials) => ({
                url: "user/reset-password",
                method: "POST",
                body: {...credentials}
            })
        }),
        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: "user/forgot-password/send-email",
                method: "POST",
                body: {...credentials}
            })
        }) 
    })
});

export const {
    useLoginMutation,
    useResetPassMutation,
    useForgotPasswordMutation
} = authApiSlice 