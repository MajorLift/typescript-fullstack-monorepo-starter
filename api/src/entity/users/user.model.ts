import { UUID } from '../items/item.model'
export type User = {
  _id: UUID
  username: string
  password: string
  created_time: EpochTimeStamp
  updated_time: EpochTimeStamp
}
