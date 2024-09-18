import { createApi, fetchBaseQuery, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).login.token;
        if (token) {
            headers.set('authorization', `${token}`);
        }
        return headers;
    }
});

const baserQueryWithRefreshToken: BaseQueryFn<FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    // Optionally handle refresh tokens or other logic here
    return result;
};

export const baseApi = createApi({
    reducerPath: "Api",
    baseQuery: baserQueryWithRefreshToken,
    endpoints: () => ({}),
});
