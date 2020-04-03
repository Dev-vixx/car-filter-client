import { SHOW_ERROR_MSG, HIDE_ERROR_MSG } from '../../actionTypes'

// error reducer for displaying error
export const ShowError = (
  state = {
    show: false,
    payload: ''
  },
  { type, payload }
) => {
  switch (type) {
    case SHOW_ERROR_MSG:
      return {
        show: true,
        payload
      }

    case HIDE_ERROR_MSG:
      return {
        show: false,
        payload: ''
      }
    default:
      return state
  }
}
