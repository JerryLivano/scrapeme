import { apiSlice } from "../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCount: builder.query({
            query: () => "/dashboard/count",
            providesTags: ['Dashboard']
        }),
        getTopScraper: builder.query({
            query: () => "/dashboard/top-scraper",
            providesTags: ['Dashboard']
        }),
        getChart: builder.query({
            query: () => "/dashboard/statistic",
            providesTags: ['Dashboard']
        })
    })
});

export const {
    useGetCountQuery,
    useGetTopScraperQuery,
    useGetChartQuery
} = dashboardApiSlice