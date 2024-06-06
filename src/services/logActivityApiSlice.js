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
                    role
                } = args;
                return `/log-activity?search=${search}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&role=${role}`;
            },
            providesTags: ["LogActivity"]
        })
    })
});

export const {
    useGetLogActivityQuery
} = logActivityApiSlice;