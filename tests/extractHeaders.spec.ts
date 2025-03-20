import { extractHeaders } from '../src/utils/extractHeaders'

describe('extractHeaders', () => {
  it('Should extract only string values from the headers', () => {
    const inputHeaders = {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'SomeValue',
      'X-Numeric-Header': 12345,
      'X-Array-Header': ['value1', 'value2'],
    }

    const result = extractHeaders(inputHeaders)

    expect(result).toEqual({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'SomeValue',
    })
  })

  it('Should return empty object', () => {
    const inputHeaders = {
      'X-Numeric-Header': 12345,
      'X-Array-Header': ['value1', 'value2'],
    }

    const result = extractHeaders(inputHeaders)

    expect(result).toEqual({})
  })

  it('Should return all headers', () => {
    const inputHeaders = {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'SomeValue',
      Authorization: 'Bearer token',
    }

    const result = extractHeaders(inputHeaders)

    expect(result).toEqual({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'SomeValue',
      Authorization: 'Bearer token',
    })
  })
})
