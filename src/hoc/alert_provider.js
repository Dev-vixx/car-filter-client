import React, { StrictMode } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as Close } from '../assets/svg/close.svg'
import { HideErrorMsg } from '../redux/actionCreators/errorHandler'

const AlertProvider = ({
  renderAs = 'warning',
  children,
  value,
  hideError
}) => (
  <StrictMode>
    <div className={`alert-${renderAs}`}>
      <strong>{value}</strong>
      <div className='exit-alert'>
        <span>
          <Close className='nav_svg_icon' onClick={hideError.bind(this)} />
        </span>
      </div>
    </div>
  </StrictMode>
)

const mapStateToProps = state => ({
  value: state.ShowError.payload
})

// dispatch an action to hide the error msg
const mapDispatchToProps = dispatch => ({
  hideError: () => dispatch(HideErrorMsg())
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertProvider)
