import { combineReducers } from 'redux'
import { SideBarReducer as SideBar } from './reducers/sideBar'
import { ShowError } from './reducers/error'

const rootReducer = combineReducers({
  SideBar,
  ShowError
})

export default rootReducer
