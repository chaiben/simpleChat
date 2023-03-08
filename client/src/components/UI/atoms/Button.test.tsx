import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'
import { colors, radius } from '../../../styles'
import { rgb2hex } from '../../../helpers'

test('Check the button style', () => {
  render(<Button>Button 1</Button>)
  const elemement = screen.getByText('Button 1')
  const style = getComputedStyle(elemement)
  expect(rgb2hex(style.backgroundColor)).toBe(colors.main)
  expect(style.borderRadius).toBe(radius)
  expect(rgb2hex(style.color)).toBe(colors.white)
  expect(style.cursor).toBe('pointer')
  expect(style.padding).toBe('0.5rem 2rem')
})
