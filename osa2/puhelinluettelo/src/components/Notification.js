import React from 'react'

const Notification = ({ message }) => {
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 18,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  
  return message === null
    ? null
    : <div style={style}>{message}</div>
}

export default Notification