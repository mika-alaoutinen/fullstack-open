import axios from "axios";
import React, { useEffect, useState } from 'react'
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  // State management:
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState("")
  
  // Get data from server:
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = () => countries.filter(
    country => country.name.toLowerCase().includes(filter))

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries countries={filteredCountries()} setFilter={setFilter} />
    </div>
  )
}

export default App;
