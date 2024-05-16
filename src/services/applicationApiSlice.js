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
    })
});

export const {
    useGetApplicationQuery
} = applicationApiSlice;