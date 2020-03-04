import React from 'react'
import { connect } from 'react-redux'
import { applyFilter } from '../reducers/filterReducer'

const Filter = ({ applyFilter }) => {

  const handleChange = event => applyFilter(event.target.value)

  return (
    <div style={{marginBottom: 10}}>
      filter
      <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { applyFilter })(Filter)