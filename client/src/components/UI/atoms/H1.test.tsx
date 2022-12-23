import React from 'react'
import { render, screen } from '@testing-library/react'
import { H1 } from './H1'
import { colors } from '../../../styles'

test('Render H1 component', () => {
  render(<H1>Hola mundo</H1>)
  const elemement = screen.getByText('Hola mundo')
  const style = getComputedStyle(elemement)
  expect(style.color).toBe(colors.dark)
  expect(style.fontWeight).toBe('700')
  expect(style.fontSize).toBe('2.25rem')
})

test('Render H1 component in red', () => {
  render(<H1 color={colors.error}>Hola mundo</H1>)
  const elemement = screen.getByText('Hola mundo')
  const style = getComputedStyle(elemement)
  expect(style.color).toBe(colors.error)
})
