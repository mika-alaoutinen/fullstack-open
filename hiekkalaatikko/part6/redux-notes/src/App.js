import React from 'react'
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

const App = ({ store }) => (
  <div>
    <NewNote store={store} />
    <Notes store={store} />
  </div>
)

export default App;