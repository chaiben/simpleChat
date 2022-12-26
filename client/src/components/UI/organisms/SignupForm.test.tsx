import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignupForm } from './SignupForm'

test('Register form must have a username field', () => {
  render(<SignupForm />)
  const field = screen.getByPlaceholderText(/username/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a display name field', () => {
  render(<SignupForm />)
  const field = screen.getByPlaceholderText(/display name/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a password field', () => {
  render(<SignupForm />)
  const field = screen.getByPlaceholderText('Password')
  expect(field).toBeInTheDocument()
  expect(field).toHaveAttribute('type', 'password')
})
test('Register form must have a repeat password field', () => {
  render(<SignupForm />)
  const field = screen.getByPlaceholderText(/password confirmation/i)
  expect(field).toBeInTheDocument()
  expect(field).toHaveAttribute('type', 'password')
})
test('Register form must have submit button labeled "Register"', () => {
  render(<SignupForm />)
  const field = screen.getByText(/Register/i)
  expect(field).toBeInTheDocument()
})
test('Register form must have a link: "I already have an account', () => {
  render(<SignupForm />)
  const link = screen.getByText(/I already have an account/i)
  expect(link).toBeInTheDocument()
})
