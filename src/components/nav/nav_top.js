import React, { Component } from 'react'
import '../../vendor/top_nav.css'
import { connect } from 'react-redux'
// importing svg  here
import { Subject as MenuIcon } from '@material-ui/icons'
import { AccountCircle as UserIcon } from '@material-ui/icons'
import { ShowSideBar, HideSideBar } from '../../redux/actionCreators/sideBar'
import { Link } from 'react-router-dom'

export class TopNavigationBar extends Component {
  render () {
    return (
      <>
        <header className='nav_top'>
          <nav>
            <div className='toggle_menu'>
              <MenuIcon
                className='nav_svg_icon'
                onClick={() => this.props.showSideBar()}
              />
            </div>

            <div className='brand_name'>
              <Link to='/'>Fullstack Assessment client </Link>
            </div>
            <div className='nav_icon'>
              <UserIcon className='nav_svg_icon' />
            </div>
          </nav>
        </header>
        {/* side bar here */}
        {this.props.sideBar && <SideBar hideSideBar={this.props.hideSideBar} />}
      </>
    )
  }
}
const mapStateToProps = state => ({
  sideBar: state.SideBar.display
})

const mapDispatchToProps = dispatch => ({
  showSideBar: () => dispatch(ShowSideBar()),
  hideSideBar: () => dispatch(HideSideBar())
})
export default connect(mapStateToProps, mapDispatchToProps)(TopNavigationBar)

// NOTE: side bar component
class SideBar extends React.Component {
  componentDidMount () {
    // waiting for a 0.3ms before slidig the sidebar in
    setTimeout(() => {
      this.setState({
        left: '0'
      })
    }, 0.3)
  }

  state = {
    left: '-100%'
  }

  // animating the sidebar movement
  handleRemoveSideBar = e => {
    this.setState({
      left: '-100%'
    })
    setTimeout(() => {
      this.props.hideSideBar()
    }, 500)
  }
  render () {
    return (
      <div
        className='fixed side_bar'
        onClick={this.handleRemoveSideBar.bind(this)}
      >
        <div
          className='menu'
          onClick={e => e.stopPropagation()}
          style={{
            marginLeft: this.state.left
          }}
        >
          <p>some side bar content stays here</p>
        </div>
      </div>
    )
  }
}
