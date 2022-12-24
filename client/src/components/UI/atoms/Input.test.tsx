import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'
import { radius } from '../../../styles'

test('Check the normal input style', () => {
  render(<Input id="inputId" name="inputName" placeholder="Add something" />)
  const elemement = screen.getByPlaceholderText('Add something')
  const style = getComputedStyle(elemement)
  expect(style.borderRadius).toBe(radius)
  expect(style.padding).toBe('0.5rem 1rem')
})
