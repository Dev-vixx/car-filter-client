import React from 'react'

export class Container extends React.Component {
  render () {
    return (
      <div style={{ padding: this.props.gap || '10px' }}>
        {this.props.children}
      </div>
    )
  }
}
