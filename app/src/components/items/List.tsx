import React from 'react'
import { v4 as uuid } from 'uuid'

import { useFindAllItemsQuery } from '@mono/api'
import { ListItemCollapsible } from 'components/items'

import type { Item } from '@mono/feature'

export const List = (): JSX.Element => {
  const { isLoading, isError, error, data } = useFindAllItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  })

  return isError ? (
    <div className="text-gray-200">Error: {`${JSON.stringify(error)}`}</div>
  ) : isLoading ? (
    <div className="text-gray-200">Loading...</div>
  ) : !data ? (
    <div className="text-gray-200">Write your first note!</div>
  ) : (
    <div className="bg-white shadow-lg shadow-black rounded-xl">
      {data.map((item) => (
        <ListItemCollapsible key={uuid()} itemId={item._id} />
      ))}
    </div>
  )
}
