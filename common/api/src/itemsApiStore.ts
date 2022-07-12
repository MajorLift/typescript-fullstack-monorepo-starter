import type { UUID, Item, ItemsState } from '@mono/feature'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/',
    mode: 'cors',
  }),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    findAllItems: builder.query<ItemsState, void>({
      query: () => '/items',
      providesTags: ['Item'],
    }),
    findItemById: builder.query<Item, UUID>({
      query: (itemId) => `/items/${itemId}`,
      providesTags: ['Item'],
    }),
    // findItemsByUser: builder.query<Item, UUID>({
    //   query: (userId) => `/users/${userId}/items`,
    //   providesTags: ['Item'],
    // }),
    // findItemByUser: builder.query<Item, { userId: UUID; itemId: UUID }>({
    //   query: ({ userId, itemId }) =>
    //     `/users/${userId}/items/${itemId}`,
    //   providesTags: ['Item'],
    // }),
    createItem: builder.mutation<void, Partial<Item>>({
      query: (body) => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Item'],
    }),
    updateItem: builder.mutation<void, { itemId: UUID; body: Partial<Item> }>({
      query: ({ itemId, body }) => ({
        url: `/items/${itemId}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteItem: builder.mutation<void, UUID>({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useFindAllItemsQuery,
  useFindItemByIdQuery,
  // useFindItemsByUserQuery,
  // useFindItemByUserQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi
