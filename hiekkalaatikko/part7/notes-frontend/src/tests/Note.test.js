import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Note from '../components/Note'

const noteText = 'Component testing is done with react-testing-library'

test('renders content', () => {
  const note = {
    content: noteText,
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(noteText)
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: noteText,
    important: true
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})