import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = ({ filterChange }) => (
  <div>
    <label>all
      <input
        type="radio"
        name="filter"
        onChange={() => filterChange('ALL')}
      />
    </label>

    <label>important
      <input
        type="radio"
        name="filter"
        onChange={() => filterChange('IMPORTANT')}
      />
    </label>

    <label>nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => filterChange('NONIMPORTANT')}
      />
    </label>
  </div>
)

export default connect(
  null, { filterChange })
  (VisibilityFilter)