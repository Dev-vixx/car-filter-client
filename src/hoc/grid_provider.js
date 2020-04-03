import React from 'react'

export class GridProvider extends React.Component {
  render () {
    return (
      <div
        style={{
          gridTemplateColumns: this.props.gtc || '1fr 1fr',
          ...this.props.style
        }}
        className='grid_provider'
      >
        {this.props.children || <h2>please pass a child to this component</h2>}
      </div>
    )
  }
}
