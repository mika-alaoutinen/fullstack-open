import React from 'react';
import Button from './components/Button'
import Display from './components/Display'
import useCounter from "./hooks/useCounter";

const App = () => {
  const counter = useCounter()

  return (
    <div>
      <Display counter={counter.value} />
      <Button onClick={counter.increase} text='plus' />
      <Button onClick={counter.decrease} text='minus' />
      <Button onClick={counter.zero} text='zero' />
    </div>
  )
}

export default App;
