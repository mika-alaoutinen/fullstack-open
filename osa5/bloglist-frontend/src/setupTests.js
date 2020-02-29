/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
jest.mock('./services/blogService')

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },

  getItem: (key) => savedItems[key],

  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })