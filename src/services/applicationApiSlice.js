import { apiSlice } from "../app/api/apiSlice";

export const applicationApiSlice = apiSlice.enhanceEndpoints({
    addTagTypes: ["Application"]
}).injectEndpoints({
    endpoints: (builder) => ({
        getApplication: builder.query({
            query: (args) => {
                const {
                    page,
                    limit
                } = args;
                return `/application?page=${page}&limit=${limit}`;
            },
            providesTags: ["Application"]
        }),
        updateApplication: builder.mutation({
            query: (data) => ({
                url: `/application`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Application"],
        }),
        createApplication: builder.mutation({
            query: (data) => ({
                url: `/application`,
                method: "POST",
                body: data
            })
        })
    })
});

export const {
    useGetApplicationQuery,
    useUpdateApplicationMutation,
    useCreateApplicationMutation
} = applicationApiSlice;