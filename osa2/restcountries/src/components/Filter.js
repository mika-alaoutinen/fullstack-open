import React from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      find countries
        <input
        value={filter}
        onChange={(event) => setFilter(event.target.value.toLowerCase())}
      />
    </div>
  )
}

export default Filter