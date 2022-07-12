import React from 'react'
import { v4 as uuid } from 'uuid'

import { useFindAllItemsQuery } from '@mono/api'
import { ListItemCollapsible } from 'components/items'

type ListProps = {
  openAll: boolean
}

export const List = ({ openAll }: ListProps): JSX.Element => {
  const { data, error, isLoading } = useFindAllItemsQuery()

  return (
    <div className="font-bold text-gray-100">
      {error ? (
        <>Error: {`${JSON.stringify(Object.values(error))}`}</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className="flex flex-col bg-white shadow-md shadow-gray-100 rounded-xl">
          {data.map((item) => (
            <ListItemCollapsible key={uuid()} itemData={item} open={openAll} />
          ))}
        </div>
      ) : (
        <>No results</>
      )}
    </div>
  )
}
