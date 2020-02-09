import React from 'react'

const PersonFilter = ({ filter, setFilter }) => {
    return (
      <div>
        filter shown with
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value.toLowerCase())}
        />
      </div>
    )
}

export default PersonFilter