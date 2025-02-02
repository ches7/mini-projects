import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://www.reddit.com/'
    }),
    endpoints: (builder) => ({
      getData: builder.query({
        query: (endpoint) => `/r/${endpoint}.json`,
        transformResponse: (response) => response.data.children
      }),
      getPostData: builder.query({
        query: (URI) => `/r/${URI}.json`,
        transformResponse: (response) => [
          ...response[0].data.children, 
          ...response[1].data.children
        ]
      }),
      getHome: builder.query({
        query: () => `/.json`,
        transformResponse: (response) => response.data.children
      }),
    })
  })
  
  export const { useGetDataQuery, useGetPostDataQuery, useGetHomeQuery } = apiSlice