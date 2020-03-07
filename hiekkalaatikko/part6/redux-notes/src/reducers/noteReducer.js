import noteService from '../services/noteService'

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
export const initializeNotes = () => async dispatch => {
  const notes = await noteService.getAll()
  dispatch({
    type: 'INIT_NOTES',
    data: notes,
  })
}

export const createNote = content => async dispatch => {
  const note = await noteService.createNew(content)
  dispatch({
    type: 'NEW_NOTE',
    data: note
  })
}

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

export default noteReducer