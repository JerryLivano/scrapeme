import { apiSlice } from "../../app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => "/role"
        })
    })
});

export const {
    useGetRolesQuery
} = roleApiSlice;