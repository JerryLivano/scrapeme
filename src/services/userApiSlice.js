import { apiSlice } from "../app/api/apiSlice";

export const userApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: ["User"]
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getUser: builder.query({
                query: (args) => {
                    const {
                        apps,
                        page,
                        limit,
                        search,
                        role,
                        isActive
                    } = args;
                    const appsParams = apps && apps.length > 0 ? apps.map((app) => `app=${app}`).join('&') : '';
                    return `/user?${appsParams ? `${appsParams}&` : ''}search=${search}&page=${page}&limit=${limit}&role=${role}&isActive=${isActive}`;
                },
                providesTags: ["User"]
            }),
            register: builder.mutation({
                query: (body) => ({
                    url: "/register",
                    method: "POST",
                    body
                }),
                invalidatesTags: ["User"]
            }),
            updateUser: builder.mutation({
                query: (body) => ({
                    url: "/user",
                    method: "PUT",
                    body
                }),
                invalidatesTags: ["User"]
            }),
            getPermissionBasedUser: builder.query({
                query: (id) => `user/${id}`,
                providesTags: ["User"]
            }),
            changePassword: builder.mutation({
                query: (body) => ({
                    url: "/user/change-password",
                    method: "POST",
                    body
                }),
                invalidatesTags: ["User"]
            }),
            registerBulk: builder.mutation({
                query: (body) => ({
                    url: "/register-bulk",
                    method: "POST",
                    body
                }),
                invalidatesTags: ["User"]
            })
        })
    });

export const {
    useGetUserQuery,
    useRegisterMutation,
    useUpdateUserMutation,
    useGetPermissionBasedUserQuery,
    useChangePasswordMutation,
    useRegisterBulkMutation
} = userApiSlice;