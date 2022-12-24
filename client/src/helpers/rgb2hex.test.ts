import { rgb2hex } from './rgb2hex'

test('Convert rgb(41, 47, 54) to #292f36', () => {
  expect(rgb2hex('rgb(41, 47, 54)')).toBe('#292f36')
})

test('Convert rgb(255, 255, 255) to #ffffff', () => {
  expect(rgb2hex('rgb(255, 255, 255)')).toBe('#ffffff')
})

test('Convert rgb(255,255,255) to #ffffff', () => {
  expect(rgb2hex('rgb(255,255,255)')).toBe('#ffffff')
})

test('Convert rgb(0,0,0) to #000000', () => {
  expect(rgb2hex('rgb(0,0,0)')).toBe('#000000')
})

test('Convert rgba(0,0,0,0) to #00000000', () => {
  expect(rgb2hex('rgb(0,0,0,0)')).toBe('#00000000')
})
