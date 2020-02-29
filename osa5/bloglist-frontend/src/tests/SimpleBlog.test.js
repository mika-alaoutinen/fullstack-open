import React from 'react'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

// Global helper variables:
let component
const likeHandler = jest.fn()
const blog = {
  title: 'SimpleBlog test',
  author: 'Pekka Kana',
  likes: 3,
}

beforeEach(() => {
  component = render(
    <SimpleBlog blog={blog} onClick={likeHandler} />
  )
})

describe('SimpleBlog renders correctly', () => {
  test('renders blog title', () => {
    expect(component.container).toHaveTextContent('SimpleBlog test')
  })

  test('renders blog author', () => {
    expect(component.container).toHaveTextContent('Pekka Kana')
  })

  test('blog has 3 likes', () => {
    expect(component.container).toHaveTextContent('blog has 3 likes')
  })
})

describe('Like button works correctly', () => {
  test('Clicking like button twice calls event handler twice', () => {
    const { getByText } = component
    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeHandler.mock.calls.length).toBe(2)
  })
})