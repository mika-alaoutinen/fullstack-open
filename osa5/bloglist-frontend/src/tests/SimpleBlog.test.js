import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

describe('SimpleBlog renders correctly', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'SimpleBlog test',
      author: 'Pekka Kana',
      likes: 3,
    }

    const likeHandler = () => console.log('+1 like')

    component = render(
      <SimpleBlog blog={blog} onClick={likeHandler} />
    )
  })

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