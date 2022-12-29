import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignupForm } from './SignupForm'
import { BrowserRouter as Router } from 'react-router-dom'

test('Register form must have a username field', () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  )
  const field = screen.getByPlaceholderText(/username/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a display name field', () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  )
  const field = screen.getByPlaceholderText(/display name/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a password field', () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  )
  const field = screen.getByPlaceholderText('Password')
  expect(field).toBeInTheDocument()
  expect(field).toHaveAttribute('type', 'password')
})
test('Register form must have a repeat password field', () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  )
  const field = screen.getByPlaceholderText(/password confirmation/i)
  expect(field).toBeInTheDocument()
  expect(field).toHaveAttribute('type', 'password')
})
test('Register form must have submit button labeled "Register"', () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  )
  const field = screen.getByText(/Register/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a link: "I already have an account', () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  )
  const link = screen.getByText(/I already have an account/i)
  expect(link).toBeInTheDocument()
})
