import { apiSlice } from "../app/api/apiSlice";

export const userApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: ["User"]
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getUser: builder.query({
                query: (args) => {
                    const {
                        page,
                        limit
                    } = args;
                    return `/user?page=${page}&limit=${limit}`;
                },
                providesTags: ["User"]
            }),
        })
    });

export const {
    useGetUserQuery
} = userApiSlice;