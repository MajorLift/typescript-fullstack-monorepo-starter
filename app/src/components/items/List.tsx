import React from 'react'

import { useFindAllItemsQuery } from '@mono/api'
import { ListItemCollapsible } from 'components/items'

export const List = (): JSX.Element => {
  const { isLoading, isError, error, data } = useFindAllItemsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  })

  return isError ? (
    <div className="text-gray-200">Error: {`${JSON.stringify(error)}`}</div>
  ) : isLoading ? (
    <div className="text-gray-200">Loading...</div>
  ) : !data?.length ? (
    <div className="text-gray-200">
      Write your first note by clicking on the "New" button!
    </div>
  ) : (
    <div className="bg-white shadow-lg shadow-black rounded-xl">
      {data.map((item) => (
        <ListItemCollapsible key={item._id} itemId={item._id} />
      ))}
    </div>
  )
}
