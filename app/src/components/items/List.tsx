import React from 'react'

import { useFindAllItemsQuery } from '@mono/api'
import { ListItemCollapsible } from 'components/items'

export const List = (): JSX.Element | null => {
  const { data, error, isLoading } = useFindAllItemsQuery()
  const { items } = data || {}

  if (error)
    return (
      <div className="text-gray-200">
        Error: {`${JSON.stringify(Object.values(error))}`}
      </div>
    )
  else if (isLoading) return <div className="text-gray-200">Loading...</div>
  else if (!items || !items.length)
    return <div className="text-gray-200">Write your first note!</div>
  return (
    <div className="bg-white shadow-md rounded-xl shadow-white">
      {items.map((item) => (
        <ListItemCollapsible key={item._id} itemData={item} />
      ))}
    </div>
  )
}
