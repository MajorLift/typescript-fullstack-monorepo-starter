import type { UUID } from '@mono/feature'

export type UIState = {
  activeItemId: UUID | null | undefined
  showEditorModal: boolean
  openAll: boolean
}
