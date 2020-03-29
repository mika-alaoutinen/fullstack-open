import React from 'react'

const Notify = ({ errorMessage }) => (
  errorMessage
    ? <div style={{ color: 'red' }}>{errorMessage}</div>
    : null
)
  
export default Notify