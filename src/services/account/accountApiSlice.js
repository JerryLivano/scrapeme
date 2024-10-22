import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    is_active,
                    role_name,
                    order_by,
                    column_name
                } = args;
                return `/account?search=${search}&page=${page}&limit=${limit}&is_active=${is_active}${role_name ? `&role_name=${role_name}` : ''}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}`;
            },
            providesTags: ['Account']
        }),
        getAccount: builder.query({
            query: (guid) => `account/${guid}`,
            providesTags: ['Account']
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: `account/change-password`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Account']
        }),
        addAccount: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body: body
            }),
            invalidatesTags: ['Account']
        }),
        updateAccount: builder.mutation({
            query: (body) => ({
                url: `/account`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Account']
        }),
        deleteAccount: builder.mutation({
            query: (guid) => ({
                url: `account/${guid}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Account']
        })
    })
});

export const {
    useGetAccountsQuery,
    useGetAccountQuery,
    useChangePasswordMutation,
    useAddAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation
} = accountApiSlice