import React, { Component, StrictMode } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// FIXME: Import named exports here
import  HomePage from './pages/home'

// NOTE: Global stylesheet
// FIXME: indent
import './App.css'
import FilteredPage from './pages/filterPage'

export default class SETA extends Component {
  render () {
    return (
      <StrictMode>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/apply_filter' component={FilteredPage} />
        </Switch>
      </StrictMode>
    )
  }
}
