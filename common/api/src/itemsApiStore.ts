import type { Item, ItemsState, UUID } from '@mono/feature'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/',
    mode: 'cors',
  }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    findAllItems: builder.query<
      { success: boolean; message: string; items: ItemsState },
      void
    >({
      query: () => '/items',
      providesTags: ['Items'],
    }),
    findItemById: builder.query<
      { success: boolean; message: string; item: Item },
      UUID
    >({
      query: (itemId) => `/items/${itemId}`,
      providesTags: ['Items'],
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
    createItem: builder.mutation<
      { success: boolean; message: string; item: Item },
      Partial<Item>
    >({
      query: (body) => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Items'],
    }),
    updateItem: builder.mutation<
      { success: boolean; message: string; item: Item },
      { itemId: UUID; body: Partial<Item> }
    >({
      query: ({ itemId, body }) => ({
        url: `/items/${itemId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: builder.mutation<
      { success: boolean; message: string; _id: UUID },
      UUID
    >({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
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
