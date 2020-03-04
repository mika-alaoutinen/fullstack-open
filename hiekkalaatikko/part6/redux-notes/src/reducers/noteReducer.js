const initialNotes = [
  {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  },
  {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
]


const noteReducer = (state = initialNotes, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return addNote(state, action)
    case 'TOGGLE_IMPORTANCE':
      return toggleImportance(state, action)
    default:
      return state
  }
}

// Redux actions:
export const createNote = content => ({
  type: 'NEW_NOTE',
  data: {
    content,
    important: false,
    id: generateId()
  }
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