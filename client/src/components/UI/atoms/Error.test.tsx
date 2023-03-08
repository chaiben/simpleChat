import React from 'react'
import { render, screen } from '@testing-library/react'
import { Error } from './Error'
import { colors } from '../../../styles'
import { rgb2hex } from '../../../helpers'

test('Render Error component', () => {
  render(<Error>Hola mundo</Error>)
  const elemement = screen.getByText('Hola mundo')
  const style = getComputedStyle(elemement)
  expect(rgb2hex(style.color)).toBe(colors.error)
  expect(style.fontWeight).toBe('300')
  expect(style.fontSize).toBe('0.7rem')
})
