import React from 'react'
import { NavProvider } from '../hoc/nav_provider'
import { SortSharp } from '@material-ui/icons'
import { Helmet } from 'react-helmet'
import { Container } from '../hoc/container'
import ApplyFilter from '../components/applyFilter'
class FilteredPage extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <title>Apply Filter | Search</title>
        </Helmet>
        <NavProvider>
          <div style={{ backgroundColor: '#fff', height: "100vh" }}>
            <Container gap='2em'>
              <h3>
                <SortSharp />
                Filter
              </h3>
            {/* displaying the card here */}
                <ApplyFilter/>
            </Container>
          </div>
        </NavProvider>
      </>
    )
  }
}

export default FilteredPage


