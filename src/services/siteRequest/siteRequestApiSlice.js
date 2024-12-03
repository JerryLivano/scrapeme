import { apiSlice } from "../../app/api/apiSlice";

export const siteRequestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRequests: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    order_by,
                    column_name,
                    status
                } = args;
                return `/request?search=${search}&page=${page}&limit=${limit}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}&status=${status}`;
            },
            providesTags: ["Request"]
        }),
        getRequestsByAccount: builder.query({
            query: (args) => {
                const {
                    account_guid,
                    search,
                    page,
                    limit,
                    order_by,
                    column_name,
                    status
                } = args;
                return `/request/account/${account_guid}?search=${search}&page=${page}&limit=${limit}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}&status=${status}`;
            },
            providesTags: ["Request"]
        }),
        addRequest: builder.mutation({
            query: (body) => ({
                url: '/request',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Request']
        }),
        updateRequest: builder.mutation({
            query: (body) => ({
                url: '/request',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Request']
        }),
        doneRequest: builder.mutation({
            query: (guid) => ({
                url: `/request/done/${guid}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Request']
        }),
        acceptRequest: builder.mutation({
            query: (guid) => ({
                url: `/request/accept/${guid}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Request']
        }),
        declineRequest: builder.mutation({
            query: (body) => ({
                url: `/request/decline`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Request']
        }),
        deleteRequest: builder.mutation({
            query: (guid) => ({
                url: `/request/${guid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Request']
        }),
    })
});

export const {
    useGetRequestsQuery,
    useGetRequestsByAccountQuery,
    useAddRequestMutation,
    useUpdateRequestMutation,
    useDoneRequestMutation,
    useAcceptRequestMutation,
    useDeclineRequestMutation,
    useDeleteRequestMutation
} = siteRequestApiSlice