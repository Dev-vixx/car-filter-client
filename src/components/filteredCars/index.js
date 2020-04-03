import React, { useEffect, useState, useRef } from 'react'
import '../../vendor/card.css'
import { GridProvider } from '../../hoc/grid_provider'
import { Button } from '@material-ui/core'

const FilteredCars = ({ filter = [] }) => {
  const [defaultRow, setDefaultRow] = useState(4)

  const Navnext = e => setDefaultRow(defaultRow + 4)
  const Navprev = e =>
    setDefaultRow(defaultRow > 4 ? defaultRow - 4 : defaultRow)

  useEffect(() => {}, [defaultRow])
  return (
    <>
      <h1 className='center'>filtered results</h1>
      {/* map through the props  */}
      <GridProvider gtc='repeat(2, 1fr)' style={{ margin: '0 2em 0 1em ' }}>
        {filter.map((Car, indexOfCar) => {
          if (indexOfCar < defaultRow)
            return (
              <div key={indexOfCar} className='card'>
                <div className='car_image'>
                  <img
                    width='100%'
                    src='https://www.vippng.com/png/detail/133-1337891_sedan-svg-png-icon-free-download-sedan-car.png'
                    alt={`${Car.last_name}'s car`}
                  />
                </div>
                <div className='details'>
                  <strong style={{ padding: '14px 0', display: 'block' }}>
                    {Car.last_name} {Car.first_name}
                  </strong>
                  {/* brand */}
                  <GridProvider gtc='1fr 1fr 1fr'>
                    <strong>
                      <small className='gray'>Brand</small>
                    </strong>
                    <strong>
                      <small className='gray'>Year</small>
                    </strong>
                    <strong>
                      <small className='gray'>Color</small>
                    </strong>
                    {/* dynamic content */}
                    <strong>
                      <small>{Car.car_model}</small>
                    </strong>
                    <strong>
                      <small>{Car.car_model_year}</small>
                    </strong>
                    <strong>
                      <small>
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '100%',
                            backgroundColor: Car.car_color,
                            display: 'inline-block',
                            padding: '.2em'
                          }}
                        ></span>
                      </small>
                    </strong>
                    {/* next row */}
                    <strong>
                      <small className='gray'>Country</small>
                    </strong>
                    <strong>
                      <small className='gray'>Gender</small>
                    </strong>
                    <strong>
                      <small className='gray'>Job</small>
                    </strong>
                    {/* dynamic content */}
                    <strong>
                      <small>{Car.country}</small>
                    </strong>
                    <strong>
                      <small>{Car.gender}</small>
                    </strong>
                    <strong>
                      <small>{Car.job_title}</small>
                    </strong>
                  </GridProvider>
                  {/* email and bio stays here */}
                  <div className='flex'>
                    <label className='gray'>Email: </label>
                    <strong> &#160; {Car.email}</strong>
                  </div>
                  <div className='flex'>
                    <label className='gray'>Bio: </label>
                    <strong className='bio'> &#160; {Car.bio}</strong>
                  </div>
                </div>
              </div>
            )
        })}
        <div className='btn_nav'>
          {/* navigation btn */}
          {defaultRow > 4 && (
            <Button
              variant='contained'
              color='primary'
              onClick={Navprev.bind(this)}
            >
              less
            </Button>
          )}
          {filter.length > 4 && (
            <Button
              variant='contained'
              color='primary'
              onClick={Navnext.bind(this)}
            >
              more
            </Button>
          )}
        </div>
      </GridProvider>
    </>
  )
}
/*
THIS IS A RAW DATA SNAPSHOT TO KNOW THE OBJECT KEYS
    "id": 822,
    "first_name": "Zenia",
    "last_name": "Ansley",
    "email": "zansleymt@google.de",
    "country": "Tunisia",
    "car_model": "Fairthorpe",
    "car_model_year": "1960",
    "car_color": "Goldenrod",
    "gender": "Female",
    "job_title": "Geological Engineer",
    "bio": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui."
  }
 */
export default FilteredCars
