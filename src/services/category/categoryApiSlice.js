import { apiSlice } from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (args) => {
                const {
                    search,
                    page,
                    limit,
                    order_by,
                    column_name
                } = args;
                return `/category?search=${search}&page=${page}&limit=${limit}&order_by=${order_by}${column_name ? `&column_name=${column_name}` : ''}`;
            },
            providesTags: ['Category']
        }),
        getCategory: builder.query({
            query: (guid) => `category/${guid}`,
            providesTags: ['Category']
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: '/category',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: (body) => {
                return {
                    url: `/category`,
                    method: 'PUT',
                    body: body,
                };
            },
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: (guid) => ({
                url: `/category/${guid}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApiSlice