import React, { useState } from 'react';
import Button from './components/Button'
import Display from './components/Display'
import useCounter from "./hooks/useCounter";
import useField from "./hooks/useField";

// const App = () => {
//   const counter = useCounter()

//   return (
//     <div>
//       <Display counter={counter.value} />
//       <Button onClick={counter.increase} text='plus' />
//       <Button onClick={counter.decrease} text='minus' />
//       <Button onClick={counter.zero} text='zero' />
//     </div>
//   )
// }

const App = () => {
  const name = useField('text')
  const birthdate = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: <input { ...name } />
        <br/> 

        birthdate: <input { ...birthdate } />
        <br /> 

        height: <input { ...height } />
      </form>
      
      <div>
        {name.value} {birthdate.value} {height.value} 
      </div>
    </div>
  )
}

export default App;
