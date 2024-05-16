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
    })
});

export const {
    useGetRoleQuery
} = roleApiSlice;