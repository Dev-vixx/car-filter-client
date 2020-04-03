import { SHOW_SIDE_BAR, HIDE_SIDE_BAR } from '../../actionTypes'
// this shows or hides the side bar
export const SideBarReducer = (state = { display: false }, { type }) => {
  switch (type) {
    case SHOW_SIDE_BAR:
      return { display: true }
    case HIDE_SIDE_BAR:
      return { display: false }
    default:
      return state
  }
}
