import React from 'react'
import { render, screen } from '@testing-library/react'
import { Link } from './Link'
import { colors } from '../../../styles'
import { rgb2hex } from '../../../helpers'

test('Render Link component', () => {
  render(<Link>Hola mundo</Link>)
  const elemement = screen.getByText('Hola mundo')
  const style = getComputedStyle(elemement)
  expect(rgb2hex(style.color)).toBe(colors.main)
})
