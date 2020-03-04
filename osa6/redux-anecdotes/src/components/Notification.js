import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  
  const style = {
    display: notification.content ? '' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const renderNotification = () => {
    if (notification.content !== undefined && notification.content.length > 0) {
      if (notification.reason === 'vote') {
        return `you voted '${notification.content}'`
      }
      if (notification.reason === 'new') {
        return `new notification '${notification.content}'`
      }  
    }
  }

  return (
    <div style={style}>
      {renderNotification()}
    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(mapStateToProps)(Notification)