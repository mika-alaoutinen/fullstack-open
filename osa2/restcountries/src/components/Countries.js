import React from 'react'
import Country from "./Country";

const Countries = ({ countries, setFilter }) => {

  // Event handler for show country buttons:
  const showCountry = (country) => () =>
    setFilter(country.name.toLowerCase())

  // Map country info to show:
  const mapCountries = (countries) =>
    countries.map(country =>
      <p key={country.alpha3Code}>
        {country.name}
        <button onClick={showCountry(country)} >show</button>
      </p>
    )
  
  const mapCountry = (country) =>
    <Country
      key={country.numericCode}
      name={country.name}
      capital={country.capital}
      population={country.population}
      languages={country.languages}
      flag={country.flag}
    />
  
  // Logic for determining what info to show:
  const countryList = () => {
    if (countries.length > 10) return "too many matches, specify another filter"
    if (countries.length > 1) return mapCountries(countries)
    if (countries.length === 1) return mapCountry(countries[0])
  }

  return <div>{countryList()}</div>
}

export default Countries