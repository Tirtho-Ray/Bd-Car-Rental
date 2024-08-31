import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<void, { name: string; email: string; password: string; phone?: string }>({
            query: (user) => ({
                url: '/auth/register',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation<{ success: boolean; message: string; data: object; token: string }, { email: string; password: string }>({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: user
            })
        })

    })
});

export const { useSignUpMutation,useLoginMutation } = authApi;
