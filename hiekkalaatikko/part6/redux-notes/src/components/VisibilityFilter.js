import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = ({ store }) => {

  const filterClicked = value => () => {
    store.dispatch(filterChange(value))
  }

  return (
    <div>
      <label>all
        <input
          type="radio"
          name="filter"
          onChange={filterClicked('ALL')}
        />
      </label>

      <label>important
        <input
          type="radio"
          name="filter"
          onChange={filterClicked('IMPORTANT')}
        />
      </label>

      <label>nonimportant
        <input
          type="radio"
          name="filter"
          onChange={filterClicked('NONIMPORTANT')}
        />
      </label>
    </div>
  )
}

export default VisibilityFilter