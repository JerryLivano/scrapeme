import { apiSlice } from "../../app/api/apiSlice";

export const scrapeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHTML: builder.mutation({
            query: (body) => ({
                url: `/scrape/parse-html`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Get HTML"]
        }),
        createSiteURL: builder.mutation({
            query: (body) => ({
                url: `/scrape/create-url`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Create URL"]
        }),
        scrapeWebData: builder.mutation({
            query: (body) => ({
                url: '/scrape/scrape-data',
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Scrape"]
        }),
        getScrapeData: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    order_by,
                    column_name,
                    account_guid,
                    site_guid
                } = args;
                return `/scrape/account?search=${search}&page=${page}&limit=${limit}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}&account_guid=${account_guid}&site_guid=${site_guid}`;
            },
            providesTags: ["Scrape"]
        }),
        getFavScrapeData: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    order_by,
                    column_name,
                    account_guid,
                    site_guid
                } = args;
                return `/scrape/favorite?search=${search}&page=${page}&limit=${limit}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}&account_guid=${account_guid}&site_guid=${site_guid}`;
            },
            providesTags: ["Scrape"]
        }),
        updateScrapeName: builder.mutation({
            query: (body) => ({
                url: '/scrape/update-name',
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Scrape"]
        }),
        deleteScrape: builder.mutation({
            query: (guid) => ({
                url: `/scrape/${guid}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Scrape"]
        }),
        getWebData: builder.query({
            query: (args) => {
                const {
                    guid,
                    page,
                    limit,
                    search,
                    order_by,
                    column_name
                } = args;
                return `/scrape/web-data?guid=${guid}&page=${page}&limit=${limit}&search=${search}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}`;
            },
            providesTags: ["Scrape"]
        }),
        getFavWebData: builder.query({
            query: (args) => {
                const {
                    guid,
                    page,
                    limit,
                    search,
                    order_by,
                    column_name
                } = args;
                return `/scrape/favorite-web-data?guid=${guid}&page=${page}&limit=${limit}&search=${search}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}`;
            },
            providesTags: ["Scrape"]
        }),
        updateFavWebData: builder.mutation({
            query: (body) => ({
                url: "/scrape/update-favorite",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Scrape"]
        }),
        updateNoteWebData: builder.mutation({
            query: (body) => ({
                url: "/scrape/update-note",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Scrape"]
        }),
        getDataAnalysis: builder.query({
            query: (args) => {
                const {
                    account_guid,
                    site_guid,
                    location
                } = args;
                return `/scrape/data-analysis?account_guid=${account_guid}&site_guid=${site_guid}&location=${location}`;
            },
            providesTags: ["Scrape"]
        }),
        getRoomComparison: builder.query({
            query: (args) => {
                const {
                    account_guid,
                    site_guid,
                    location,
                    room
                } = args;
                return `/scrape/room-comparison?account_guid=${account_guid}&site_guid=${site_guid}&location=${location}&room=${room}`;
            },
            providesTags: ["Scrape"]
        }),
        getWebDataAnalysis: builder.query({
            query: (args) => {
                const {
                    account_guid,
                    site_guid,
                    location,
                    order_by
                } = args;
                return `/scrape/webdata-analysis?account_guid=${account_guid}&site_guid=${site_guid}&location=${location}&order_by=${order_by}`;
            },
            providesTags: ["Scrape"]
        }),
        getLocationComparison: builder.query({
            query: (args) => {
                const {
                    account_guid,
                    site_guid,
                    location_data
                } = args;
                return `/scrape/location-comparison?account_guid=${account_guid}&site_guid=${site_guid}${location_data.length > 0 ? `&${location_data.map(item => `location_data=${item}`).join('&')}` : ""}`;
            },
            providesTags: ["Scrape"]
        })
    }),
});

export const {
    useGetHTMLMutation,
    useCreateSiteURLMutation,
    useScrapeWebDataMutation,
    useGetScrapeDataQuery,
    useGetFavScrapeDataQuery,
    useUpdateScrapeNameMutation,
    useDeleteScrapeMutation,
    useGetWebDataQuery,
    useGetFavWebDataQuery,
    useUpdateFavWebDataMutation,
    useUpdateNoteWebDataMutation,
    useGetDataAnalysisQuery,
    useGetRoomComparisonQuery,
    useGetWebDataAnalysisQuery,
    useGetLocationComparisonQuery
} = scrapeApiSlice