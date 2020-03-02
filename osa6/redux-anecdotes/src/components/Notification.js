import React from 'react'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notifications = store.getState().notifications

  return (
    <div style={style}>
      message
      {/* {notifications} */}
    </div>
  )
}

export default Notification