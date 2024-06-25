import { apiSlice } from "../app/api/apiSlice";

export const logActivityApiSlice = apiSlice.enhanceEndpoints({
    addTagTypes: ["LogActivity"]
}).injectEndpoints({
    endpoints: (builder) => ({
        getLogActivity: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    startDate,
                    endDate,
                    role,
                    apps
                } = args;
                const appsParams = apps && apps.length > 0 ? apps.map((app) => `appFilter=${app}`).join('&') : '';
                return `/log-activity?search=${search}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&role=${role}${appsParams ? `&${appsParams}` : ''}`;
            },
            providesTags: ["LogActivity"]
        }),
        loginApplication: builder.mutation({
            query: (body) => ({
                url: "/log-activity/application-access",
                method: "POST",
                body
            }),
            invalidatesTags: ["LogActivity"]
        }),
        getPermissionBasedLog: builder.query({
            query: (args) => {
                const {
                    apps,
                    startDate,
                    endDate,
                    page,
                    limit
                } = args;
                const appsParams = apps && apps.length > 0 ? apps.map((app) => `appFilter=${app}`).join('&') + '&' : '';
                return `/log-activity/permission-based?${appsParams}startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
            },
            providesTags: ["LogActivity"]
        })
    })
});

export const {
    useGetLogActivityQuery,
    useLoginApplicationMutation,
    useGetPermissionBasedLogQuery
} = logActivityApiSlice;