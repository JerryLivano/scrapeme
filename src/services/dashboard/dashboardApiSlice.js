import { apiSlice } from "../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCount: builder.query({
            query: () => "/dashboard/count",
            providesTags: ['Dashboard']
        }),
    })
});

export const {
    useGetCountQuery
} = dashboardApiSlice