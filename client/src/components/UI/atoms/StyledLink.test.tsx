import React from 'react'
import { render, screen } from '@testing-library/react'
import { StyledLink } from './StyledLink'
import { colors } from '../../../styles'
import { rgb2hex } from '../../../helpers'
import { BrowserRouter as Router } from 'react-router-dom'

test('Render Link component', () => {
  render(
    <Router>
      <StyledLink to="#">Hola mundo</StyledLink>
    </Router>
  )
  const elemement = screen.getByText('Hola mundo')
  const style = getComputedStyle(elemement)
  expect(rgb2hex(style.color)).toBe(colors.main)
})
