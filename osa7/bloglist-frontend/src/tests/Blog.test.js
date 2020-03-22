import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

// Global helper variables:
let component

const user = {
  username: 'admin',
  name: 'Pekka',
}

localStorage.setItem('user', JSON.stringify(user))

const blog1 = {
  title: 'blog test 1',
  author: 'Pekka Kana',
  url: 'blogi.fi/pekka1',
  likes: 3,
  user: user,
}

const blog2 = {
  title: 'blog test 2',
  author: 'Pekka Kana',
  url: 'blogi.fi/pekka2',
  likes: 4,
  user: { user },
}

const blogs = [ blog1, blog2 ]
const setBlogs = jest.fn()

beforeEach(() => {
  component = render(
    <Blog blog={blog1} blogs={blogs} setBlogs={setBlogs} />
  )
})

describe('Expanding and folding blog info', () => {
  test('Blog header with blog title and author is shown on component render', () => {
    const blogHeader = component.container.querySelector('.blogHeader')
    expect(blogHeader).not.toHaveStyle('display: none')
    expect(component.container).toHaveTextContent('blog test 1')
    expect(component.container).toHaveTextContent('Pekka Kana')
  })

  test('Blog body is hidden on component render', () => {
    const blogBody = component.container.querySelector('.blogBody')
    expect(blogBody).toHaveStyle('display: none')
  })

  test('Blog body is shown after clicking on blog header', () => {
    const blogHeader = component.container.querySelector('.blogHeader')
    fireEvent.click(blogHeader)

    const blogBody = component.container.querySelector('.blogBody')
    expect(blogBody).not.toHaveStyle('display: none')
  })

  test('Blog body can be hidden by clicking on it', () => {
    const blogHeader = component.container.querySelector('.blogHeader')
    fireEvent.click(blogHeader)

    const blogBody = component.container.querySelector('.blogBody')
    fireEvent.click(blogBody)

    expect(blogBody).toHaveStyle('display: none')
  })
})