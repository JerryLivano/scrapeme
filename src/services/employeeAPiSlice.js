import { apiSlice } from "../app/api/apiSlice";

export const employeeApiSlice = apiSlice.enhanceEndpoints({
    addTagTypes: ["Employee"]
}).injectEndpoints({
    endpoints: (builder) => ({
        getCvMeEmployee: builder.mutation({
            query: (body) => ({
                url: "/employee/info",
                method: "POST",
                body
            })
        })
    })
});

export const {
    useGetCvMeEmployeeMutation
} = employeeApiSlice;