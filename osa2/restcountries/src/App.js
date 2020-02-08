import axios from "axios";
import React, { useEffect, useState } from 'react'

const App = () => {
  const [ countries, setCountries ] = useState([])
  
  // Get data from server:
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      find countries
      <input />
    </div>
  )
}

export default App;
