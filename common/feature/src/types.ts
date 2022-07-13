export type UUID = string
export type DateString = string

export type Item = {
  _id: UUID
  created_time: DateString
  modified_time?: DateString
  title: string | 'Untitled'
  content: string
}

export type ItemsState = Item[]
