import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Item, UUID } from '@mono/feature'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  }),
  tagTypes: ['Items'],

  endpoints: (builder) => ({
    findAllItems: builder.query<Item[], void>({
      query: () => '/items',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Items' as const, _id })),
              { type: 'Items', _id: 'ALL_LIST' },
            ]
          : [{ type: 'Items', _id: 'ALL_LIST' }],
    }),

    findItemById: builder.query<Item, UUID>({
      query: (itemId) => `/items/${itemId}`,
      providesTags: (_result, _error, _id) => [{ type: 'Items', _id }],
    }),

    findItemsByUser: builder.query<Item[], UUID>({
      query: (userId) => `/users/${userId}/items`,
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Items' as const,
                userId,
                _id,
              })),
              { type: 'Items', userId, _id: 'USER_LIST' },
            ]
          : [{ type: 'Items', userId, _id: 'USER_LIST' }],
    }),

    findItemByUser: builder.query<Item, { userId: UUID; itemId: UUID }>({
      query: ({ userId, itemId }) => `/users/${userId}/items/${itemId}`,
      providesTags: (_result, _error, { userId, itemId }) => [
        { type: 'Items', userId, _id: itemId },
      ],
    }),

    createItem: builder.mutation<Item, Partial<Item>>({
      query: (body) => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Items' }],
    }),

    updateItem: builder.mutation<Item, { itemId: UUID; body: Partial<Item> }>({
      query: ({ itemId, body }) => ({
        url: `/items/${itemId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { itemId }) => [
        { type: 'Items', _id: itemId },
      ],
    }),

    deleteItem: builder.mutation<string, UUID>({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, itemId) => [
        { type: 'Items', _id: itemId },
      ],
    }),
  }),
})

export const {
  useFindAllItemsQuery,
  useFindItemByIdQuery,
  useFindItemsByUserQuery,
  useFindItemByUserQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi
