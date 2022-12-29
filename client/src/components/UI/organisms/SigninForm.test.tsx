import React from 'react'
import { render, screen } from '@testing-library/react'
import { SigninForm } from './SigninForm'
import { BrowserRouter as Router } from 'react-router-dom'

test('Register form must have a username field', () => {
  render(
    <Router>
      <SigninForm />
    </Router>
  )
  const field = screen.getByPlaceholderText(/username/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a password field', () => {
  render(
    <Router>
      <SigninForm />
    </Router>
  )
  const field = screen.getByPlaceholderText('Password')
  expect(field).toBeInTheDocument()
  expect(field).toHaveAttribute('type', 'password')
})
test('Register form must have submit button labeled "Sign in"', () => {
  render(
    <Router>
      <SigninForm />
    </Router>
  )
  const field = screen.getByText(/Sign in/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a link: "I do not have an account', () => {
  render(
    <Router>
      <SigninForm />
    </Router>
  )
  const link = screen.getByText(/I do not have an account/i)
  expect(link).toBeInTheDocument()
})
