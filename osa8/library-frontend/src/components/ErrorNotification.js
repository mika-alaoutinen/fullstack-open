import React from 'react'

const ErrorNotification = ({ message, setMessage }) => {

  const style = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const renderMessage = () => {
    setTimeout(() => setMessage(null), 3000)
    return <div style={style}>{message}</div>
  }

  return message ? renderMessage() : null
}

export default ErrorNotification