import React, { StrictMode, createRef } from 'react'
import AlertProvider from '../hoc/alert_provider'
import { NavProvider } from '../hoc/nav_provider'
import '../vendor/home.css'
import { Container } from '../hoc/container'
import FilteredCars from '../components/filteredCars'
import Helmet from 'react-helmet'
import { Search } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { ShowErrorMsg } from '../redux/actionCreators/errorHandler'
class HomePage extends React.Component {
  state = {
    filteredCars: []
  }
  carBrandName = createRef()

  // handling change and react to update the ui
  handleChange = e => {
    !this.carBrandName.current.value.length &&
      this.setState({
        ...this.state,
        filteredCars: []
      })
  }
  // search function
  handleSearch = async e => {
    e.preventDefault()
    let SearchResult = await fetch(
      `http://localhost:4000/hi/test/apply_filter?car_model=${this.carBrandName.current.value}`
    )
    SearchResult = await SearchResult.json()
    SearchResult.length < 1 &&
      this.props.dispatch(
        ShowErrorMsg(
          `No search result found for ${this.carBrandName.current.value}`
        )
      )
    // updating the ui with the array of filter
    this.setState({
      filteredCars: [...SearchResult]
    })
  }

  render () {
    return (
      <StrictMode>
        <Helmet>
          <title>Assessment</title>
          <link rel='apple-touch-icon' href='https://vicmie.com/favicon.ico' />
          <link rel='shortcut icon' href='https://vicmie.com/favicon.ico' />
        </Helmet>
        {/* This render depends on the api call  */}
        {this.props.showError && <AlertProvider renderAs='warning' />}

        <NavProvider>
          {' '}
          {/* this is a hoc to wrap the nav with others */}
          <div className='hero_page'>
            <Container gap='30px'>
              <h1>car finder</h1>
              <p>your No.1 in car lookup </p>
              <form onSubmit={this.handleSearch.bind(this)}>
                <input
                  type='text'
                  placeholder='search by brand name'
                  autoFocus={true}
                  ref={this.carBrandName}
                  onChange={this.handleChange.bind(this)}
                />
                <Search
                  className='fff'
                  onClick={this.handleSearch.bind(this)}
                />
              </form>
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => this.props.history.push('apply_filter')}
                >
                  apply more filters{' '}
                </Button>
              </div>
            </Container>
          </div>
          {/* this marks the filtered result page  */}
          {this.state.filteredCars.length > 0 && (
            <FilteredCars filter={this.state.filteredCars} />
          )}
        </NavProvider>
      </StrictMode>
    )
  }
}

const mapStateToProps = state => ({
  showError: state.ShowError.show
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
