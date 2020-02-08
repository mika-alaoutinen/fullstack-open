import React from 'react'

const Country = ({ name, capital, population, languages }) => {
  const languageList = () =>
    languages.map(language =>
      <li key={language.name}>{language.name}</li>
    )

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h3>languages</h3>
      <ul>
        {languageList()}
      </ul>
    </div>
  )
}

export default Country