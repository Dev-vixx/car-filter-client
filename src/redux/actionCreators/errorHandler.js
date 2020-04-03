import { SHOW_ERROR_MSG, HIDE_ERROR_MSG } from '../actionTypes'

// displaying the side bar
export const ShowErrorMsg = payload => ({
  type: SHOW_ERROR_MSG,
  payload
})

// an action to hide the side bar
export const HideErrorMsg = () => ({
  type: HIDE_ERROR_MSG
})
