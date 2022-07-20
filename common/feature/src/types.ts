export type UUID = string

export type DateString = string

export interface Item {
  _id: UUID
  created_time: DateString
  modified_time?: DateString
  title: string | 'Untitled'
  content: string
}
