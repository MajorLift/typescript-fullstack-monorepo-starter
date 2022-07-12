import type { UUID } from '@mono/feature'

export type UIState = {
  activeItemId?: UUID | null
  showEditorModal: boolean
}
