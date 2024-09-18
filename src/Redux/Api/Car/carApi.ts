import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCar: builder.query({
      query: (params) => ({
        url: '/cars',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetAllCarQuery } = authApi;
