import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from '../App'

const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

describe('<App />', () => {
  test('login form is shown to user who is not logged in', async () => {
    const component = render(<App />)
    await waitForElement(() => component.getByText('login'))

    const loginPage = component.container.querySelector('.loginPage')
    expect(loginPage).toHaveTextContent('log in to application')
    expect(loginPage).toHaveTextContent('username')
    expect(loginPage).toHaveTextContent('password')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('renders all blogs it gets from backend after user has logged in', async () => {
    localStorage.setItem('user', JSON.stringify(user))
    const component = render(<App />)

    await waitForElement(() => component.getByText('blogs'))
    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(2)
    expect(component.container).toHaveTextContent('PHP bad')
    expect(component.container).toHaveTextContent('Java good')
  })
})