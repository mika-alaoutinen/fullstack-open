import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel="show...">
        <div className="testDiv" />
      </Toggleable>
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
  
    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)
  
    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })
})