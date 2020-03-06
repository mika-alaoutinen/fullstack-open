const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      return action.data
    case 'NEW_NOTE':
      return addNote(state, action)
    case 'TOGGLE_IMPORTANCE':
      return toggleImportance(state, action)
    default:
      return state
  }
}

// Redux actions:
export const initializeNotes = notes => ({
  type: 'INIT_NOTES',
  data: notes,
})

export const createNote = data => ({
  type: 'NEW_NOTE',
  data
})

export const toggleImportanceOf = id => ({
  type: 'TOGGLE_IMPORTANCE',
  data: { id }
})

// Utility functions:
const addNote = (state, action) => [...state, action.data]

const toggleImportance = (state, action) => {
  const id = action.data.id
  const noteToChange = state.find(note => note.id === id)
  const changedNote = {
    ...noteToChange,
    important: !noteToChange.important
  }

  return state.map(note => note.id === id ? changedNote : note)
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export default noteReducer