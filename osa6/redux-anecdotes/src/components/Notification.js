import React from 'react'
import { connect } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'

const Notification = ({ notification, resetNotification }) => {
  const { content, timer } = notification
  const timeout = timer * 1000 // convert milliseconds => seconds
  
  const style = {
    display: content ? '' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const renderNotification = () => {
    if (content !== undefined && content.length > 0) {
      resetNotification(timeout)
      return content
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

export default connect(
  mapStateToProps, { resetNotification })
  (Notification)