const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return addNote(state, action)
    case 'TOGGLE_IMPORTANCE':
      return toggleImportance(state, action)
    default:
      return state
  }
}

const addNote = (state, action) => [ ...state, action.data ]

const toggleImportance = (state, action) => {
  const id = action.data.id
  const noteToChange = state.find(note => note.id === id)
  const changedNote = {
    ...noteToChange,
    important: !noteToChange.important
  }

  return state.map(note => note.id === id ? changedNote : note)
}

export default noteReducer