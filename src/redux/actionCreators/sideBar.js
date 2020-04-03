import { SHOW_SIDE_BAR, HIDE_SIDE_BAR } from '../actionTypes'

// displaying the side bar
export const ShowSideBar = () => ({
  type: SHOW_SIDE_BAR
})

// an action to hide the side bar
export const HideSideBar = () => ({
  type: HIDE_SIDE_BAR
})
