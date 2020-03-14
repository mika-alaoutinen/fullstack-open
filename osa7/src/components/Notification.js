import React from 'react'

const Notification = ({ notification, setNotification, timeout }) => {

  const renderNotification = () => {
    if (notification !== undefined && notification.length > 0) {
      setTimeout(() => setNotification(''), timeout * 1000)
      return `a new anecdote ${notification} created!`
    }
  }
  
  return (
    <div>
      { renderNotification() }
    </div>
  )
}

export default Notification