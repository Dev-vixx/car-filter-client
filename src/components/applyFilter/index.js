import React, { StrictMode } from 'react'
import '../../vendor/ApplyFilter.css'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@material-ui/core'
import { GridProvider } from '../../hoc/grid_provider'
import { connect } from 'react-redux'
import {
  ShowErrorMsg,
  HideErrorMsg
} from '../../redux/actionCreators/errorHandler'
import AlertProvider from '../../hoc/alert_provider'
import FilteredCars from '../filteredCars'
class ApplyFilter extends React.Component {
  // update ui on mount
  componentDidMount () {
    let set = new Set()
    let countries = new Set()
    let carColors = new Set()
    fetch('https://lit-cove-17392.herokuapp.com/hi')
      .then(res => res.json())
      .then(res => res.listOfCarOwners)
      .then(data => {
        data.map((value, index) => {
          var last = data.length - 1
          // trying to add to a set so as to get a unique value
          set.add(+value.car_model_year)
          countries.add(value.country)
          carColors.add(value.car_color)
          //   only setstate when the appending is done
          if (index === +last) {
            this.setState({
              ...this.state,
              car_model_year: [...this.state.car_model_year, ...set].sort(),
              car_model_Eyear: [...this.state.car_model_year, ...set].sort(),
              countries: [...this.state.countries, ...countries].sort(),
              carColors: [...this.state.carColors, ...carColors].sort()
            })
          }
        })
      })
  }

  state = {
    selectedValue: '',
    selectedValue2: '',
    car_model_year: [],
    car_model_Eyear: [],
    countries: [],
    gender: '',
    country: '',
    color: '',
    carColors: [],
    url: 'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter?',
    filteredCars: []
  }
  // handling selection on start year
  handleSelectFrom = e => {
    this.setState({
      ...this.state,
      selectedValue: e.target.value,
      // update ui to return the year that is greater than selected year
      car_model_Eyear: this.state.car_model_year.filter(
        year => year > +e.target.value
      )
    })
  }
  // handling selection on end year
  handleSelectStart = e => {
    this.setState({
      ...this.state,
      selectedValue2: e.target.value
    })
  }

  // handle gender selection
  handleGenderSelection = e => {
    this.setState({
      ...this.state,
      gender: e.target.value,
      url:
        this.state.url ===
        'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter?'
          ? `${this.state.url}gender=${e.target.value}&&`
          : this.state.url.split('?gender=')[0] ===
            'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter'
          ? `${this.state.url.split('?gender=')[0]}?gender=${e.target.value}`
          : this.state.url.split('?&&gender=')[0] ===
            'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter'
          ? `${this.state.url.split('&&gender=')[0]}?gender=${e.target.value}`
          : `${this.state.url}&&gender=${e.target.value}`
    })
  }

  // handle car color selection
  handleColorSelection = e => {
    this.setState({
      ...this.state,
      color: e.target.value,
      url:
        this.state.url ===
        'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter?'
          ? `${this.state.url}car_color=${e.target.value}`
          : this.state.url.split('?car_color=')[0] ===
            'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter'
          ? `${this.state.url.split('?car_color=')[0]}?car_color=${
              e.target.value
            }&&`
          : this.state.url.split('?&&car_color=')[0] ===
            'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter'
          ? `${this.state.url.split('&&car_color=')[0]}?car_color=${
              e.target.value
            }`
          : `${this.state.url}&&car_color=${e.target.value}`
    })
  }

  // handle country
  handleCountry = e => {
    this.setState({
      ...this.state,
      country: e.target.value,
      url:
        // if
        this.state.url ===
        'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter?'
          ? `${this.state.url}country=${e.target.value}`
          : // else
          this.state.url.split('?country=')[0] ===
            'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter'
          ? `${this.state.url.split('?country=')[0]}?country=${
              e.target.value
            }&&`
          : this.state.url.split('?&&country=')[0] ===
            'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter'
          ? `${this.state.url.split('&&country=')[0]}?country=${e.target.value}`
          : `${this.state.url}&&country=${e.target.value}`
    })
  }
  // handling search filter application

  handleFilter = async e => {
    e.preventDefault()
    this.props.ShowLoading()
    this.setState({
      ...this.state,
      FilteredCars: []
    })
    fetch(this.state.url)
      .then(res => res.json())
      .then(res => {
        this.props.HideLoading()
        if (res.length < 1) return this.props.showError()
        if (this.state.selectedValue || this.state.selectedValue2)
          return (() => {
            let u = res.filter(v => v.car_model_year > this.state.selectedValue)
            u = res.filter(v => v.car_model_year < this.state.selectedValue2)
            window.u = u
            this.setState({
              ...this.state,
              filteredCars: [...u]
            })
          })()
        else {
          alert('for a better search experience, please filter by year')
          this.setState({
            ...this.state,
            filteredCars: [...res]
          })
        }
      })
      .catch(err => {
        this.props.showError()
      })
  }

  render () {
    return (
      <StrictMode>
        {this.props.showErrorState && <AlertProvider />}
        <form className='ApplyFilter' onSubmit={this.handleFilter.bind(this)}>
          <GridProvider
            gtc='1fr 1fr 1fr'
            style={{ width: '60%', margin: '0 auto' }}
          >
            <div>
              <FormControl>
                <InputLabel>start year</InputLabel>
                <Select
                  style={{ width: '200px' }}
                  value={this.state.selectedValue}
                  onChange={this.handleSelectFrom.bind(this)}
                >
                  {this.state.car_model_year.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>end year</InputLabel>
                <Select
                  style={{ width: '200px' }}
                  value={this.state.selectedValue2}
                  onChange={this.handleSelectStart.bind(this)}
                >
                  {this.state.car_model_Eyear.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>country</InputLabel>
                <Select
                  style={{ width: '200px' }}
                  value={this.state.country}
                  onChange={this.handleCountry.bind(this)}
                >
                  {this.state.countries.map((country, i) => (
                    <MenuItem key={i} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* gender selection */}
            <div>
              <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select
                  style={{ width: '200px' }}
                  value={this.state.gender}
                  onChange={this.handleGenderSelection.bind(this)}
                >
                  <MenuItem value='male'>male</MenuItem>
                  <MenuItem value='female'>female</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* color selection */}
            <div>
              <FormControl>
                <InputLabel>car color</InputLabel>
                <Select
                  style={{ width: '200px' }}
                  value={this.state.color}
                  onChange={this.handleColorSelection.bind(this)}
                >
                  {this.state.carColors.map((color, i) => (
                    <MenuItem key={color} value={color} style={{ color }}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={
                this.state.url ===
                'https://lit-cove-17392.herokuapp.com/hi/test/apply_filter?'
                  ? true
                  : false
              }
            >
              Search Car
            </Button>
          </GridProvider>
        </form>
        {this.state.filteredCars.length > 0 && (
          <FilteredCars filter={this.state.filteredCars} />
        )}
      </StrictMode>
    )
  }
}
const mapStateToProp = state => ({
  showErrorState: state.ShowError.show
})
const mapDispatchToProp = dispatch => ({
  showError: () => dispatch(ShowErrorMsg('Car not found')),
  ShowLoading: () => dispatch(ShowErrorMsg('Loading...')),
  HideLoading: () => dispatch(HideErrorMsg())
})
export default connect(mapStateToProp, mapDispatchToProp)(ApplyFilter)
