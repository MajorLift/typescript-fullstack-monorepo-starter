export type UUID = string
export type DateString = string

export type Note = {
  id: UUID
  created_at: DateString
  modified_at?: DateString
  title: string | 'Untitled'
  body: string
}

export type NotesState = Note[]
