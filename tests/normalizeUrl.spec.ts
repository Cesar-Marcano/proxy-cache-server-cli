import { normalizeUrl } from '../src/utils/normalizeUrl'

describe('normalizeUrl', () => {
  it('Should add https:// if no protocol is provided', () => {
    const result = normalizeUrl('www.example.com')

    expect(result).toBe('https://www.example.com/')
  })

  it('Should keep the protocol if http:// is already provided', () => {
    const result = normalizeUrl('http://www.example.com')

    expect(result).toBe('http://www.example.com/')
  })

  it('Should keep the protocol if https:// is already provided', () => {
    const result = normalizeUrl('https://www.example.com')

    expect(result).toBe('https://www.example.com/')
  })

  it('Should append a trailing slash to the URL if missing', () => {
    const result = normalizeUrl('https://www.example.com/path')

    expect(result).toBe('https://www.example.com/path/')
  })

  it('Should not modify the URL if the protocol and trailing slash are correct', () => {
    const result = normalizeUrl('https://www.example.com/path/')

    expect(result).toBe('https://www.example.com/path/')
  })

  it('Should throw an error for invalid URLs', () => {
    expect(() => normalizeUrl('invalid url')).toThrow(
      '❌ Invalid URL: https://invalid url',
    )
  })
})
