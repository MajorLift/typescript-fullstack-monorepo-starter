import { Moment } from 'moment'
import { UUID } from '../../types'

export type Item = {
  _id: UUID
  user_id: UUID
  title: string
  created_time: Moment
  updated_time: Moment
  content: string
}
