import React from 'react'
import { applyFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {

  const handleChange = event => {
    const input = event.target.value
    store.dispatch(applyFilter(input))
  }

  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter