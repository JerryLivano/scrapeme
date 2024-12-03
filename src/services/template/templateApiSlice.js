import { apiSlice } from "../../app/api/apiSlice";

export const templateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTemplateSite: builder.query({
            query: (siteGuid) => `/template/${siteGuid}`,
            providesTags: ["Template"]
        }),
        addTemplate: builder.mutation({
            query: (body) => ({
                url: '/template',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ["Template"]
        }),
        editTemplate: builder.mutation({
            query: (body) => ({
                url: '/template',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ["Template"]
        })
    })
})

export const {
    useGetTemplateSiteQuery,
    useAddTemplateMutation,
    useEditTemplateMutation
} = templateApiSlice