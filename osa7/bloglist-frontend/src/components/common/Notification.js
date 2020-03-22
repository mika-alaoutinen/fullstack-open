import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetError } from '../../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const { message, error, timeout } = notification

  const style = {
    color: error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const renderMessage = () => {
    setTimeout(() => dispatch(resetError()), timeout)
    return <div style={style}>{message}</div>
  }

  return message === undefined || message === null
    ? null
    : renderMessage()
}

export default Notification