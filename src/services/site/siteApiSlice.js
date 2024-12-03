import { apiSlice } from "../../app/api/apiSlice";

export const siteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSites: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    order_by,
                    column_name,
                    status
                } = args;
                return `/site?search=${search}&page=${page}&limit=${limit}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}${status !== "" ? `&status=${status}` : ''}`;
            },
            providesTags: ["Site"]
        }),
        getActiveSites: builder.query({
            query: (search) => `/site/active?search=${search}`,
            providesTags: ["Site"]
        }),
        addSite: builder.mutation({
            query: (body) => ({
                url: '/site',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Site']
        }),
        updateSite: builder.mutation({
            query: (body) => ({
                url: '/site',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Site']
        }),
        updateActiveSite: builder.mutation({
            query: (body) => ({
                url: '/site/active-status',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Site']
        }),
        deleteSite: builder.mutation({
            query: (guid) => ({
                url: `/site/${guid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Site']
        }),
        createURLSite: builder.query({
            query: (guid) => ({
                url: `/site/create-url/${guid}`,
                method: 'GET'
            })
        }),
        getSiteFilter: builder.query({
            query: () => '/site/filter',
            providesTags: ['SiteFilter']
        })
    })
});

export const {
    useGetSitesQuery,
    useGetActiveSitesQuery,
    useAddSiteMutation,
    useUpdateSiteMutation,
    useUpdateActiveSiteMutation,
    useDeleteSiteMutation,
    useCreateURLSiteQuery,
    useGetSiteFilterQuery
} = siteApiSlice