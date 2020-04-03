import React from 'react'
import TopNavigationBar  from '../components/nav/nav_top'

// This HOC providers to the children element access to bring the topnav to 
// the ui
export const NavProvider = ({ children }) => (
  <>
    <TopNavigationBar />
    <div>{children}</div>
  </>
)
