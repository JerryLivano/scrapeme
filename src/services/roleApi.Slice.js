import { apiSlice } from "../app/api/apiSlice";

export const roleApiSlice = apiSlice.enhanceEndpoints({
    addTagTypes: ["Role"]
}).injectEndpoints({
    endpoints: (builder) => ({
        getRole: builder.query({
            query: () => {
                return "/role";
            },
            providesTags: ["Role"]
        }),
        getRoleById: builder.query({
            query: (id) => `/role/${id}`,
            providesTags: ["Role"]
        })
    })
});

export const {
    useGetRoleQuery,
    useGetRoleByIdQuery
} = roleApiSlice;