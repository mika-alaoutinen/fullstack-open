import React from 'react'

const Notification = ({ store }) => {
  const notification = store.getState().notification
  
  const style = {
    display: notification.content ? '' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const renderNotification = () => {
    if (notification.reason === 'vote' && notification.content.length > 0) {
      return `you voted '${notification.content}'`
    }
    
    if (notification.reason === 'new' && notification.content.length > 0) {
      return `new notification '${notification.content}'`
    }
  }

  return (
    <div style={style}>
      {renderNotification()}
    </div>
  )
}

export default Notification