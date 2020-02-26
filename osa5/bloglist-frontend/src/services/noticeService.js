const timeout = 5000 // timeout for messages is 5 s

const showMessage = (message, setMessage) => {
  setMessage(message)
  setTimeout(() => setMessage(null), timeout);
}

const showError = (message, setMessage, setError) => {
  setError(true)
  showMessage(message, setMessage)
  setTimeout(() => setError(false), timeout)
}

export default { showError, showMessage }