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
                        limit,
                        search
                    } = args;
                    return `/user?search=${search}&page=${page}&limit=${limit}`;
                },
                providesTags: ["User"]
            }),
            register: builder.mutation({
                query: (body) => ({
                    url: "/register",
                    method: "POST",
                    body
                }),
                invalidatesTags: ["User"]
            }),
        })
    });

export const {
    useGetUserQuery,
    useRegisterMutation
} = userApiSlice;