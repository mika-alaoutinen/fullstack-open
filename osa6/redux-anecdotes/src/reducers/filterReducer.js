const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.filter
    default:
      return state
  }
}

export const applyFilter = filter => ({
  type: 'UPDATE_FILTER',
  filter: filter,
})

export default filterReducer