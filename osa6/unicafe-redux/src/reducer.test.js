import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = { good: 0, ok: 0, bad: 0 }

  test('should return a proper initial state when called with undefined state', () => {
    const action = { type: 'DO_NOTHING' }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const newState = stateTestHelper('GOOD')
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 })
  })

  test('ok is incremented', () => {
    const newState = stateTestHelper('OK')
    expect(newState).toEqual({ good: 0, ok: 1, bad: 0 })
  })

  test('bad is incremented', () => {
    const newState = stateTestHelper('BAD')
    expect(newState).toEqual({ good: 0, ok: 0, bad: 1 })
  })

  test('state is reset', () => {
    const newState = stateTestHelper('ZERO')
    expect(newState).toEqual(initialState)
  })

  const stateTestHelper = (type) => {
    const action = { type: type }
    const state = initialState

    deepFreeze(state)
    return counterReducer(state, action)
  }
})