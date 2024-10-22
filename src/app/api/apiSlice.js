import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/authUtilities';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getAuthToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithUnauthorizeRedirect = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithUnauthorizeRedirect,
  endpoints: (builder) => ({}),
});