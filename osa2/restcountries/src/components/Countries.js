import React from 'react'
import Country from "./Country";

const Countries = ({ countries }) => {
  const countryList = () => {
    if (countries.length > 10) {
      return "too many matches, specify another filter"
    }

    if (countries.length > 1) {
      return countries.map(country =>
        <p key={country.alpha3Code}>
          {country.name}
        </p>
      )
    }

    if (countries.length === 1) {
      return countries.map(country =>
        <Country
          key={country.numericCode}
          name={country.name}
          capital={country.capital}
          population={country.population}
          languages={country.languages}
          flag={country.flag}
        />
    )}
  }

  return <div>{countryList()}</div>
}

export default Countries