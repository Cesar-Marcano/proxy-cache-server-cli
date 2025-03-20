import { Options } from '../src/types'
import { getOptions } from '../src/utils/getOptions'

describe('getOptions', () => {
  it('Should return the correct values', () => {
    const opts = mockOpts({
      redisUrl: 'redis://my-redis-url:6379',
      port: 8080,
      origin: 'http://example.com',
    })

    const result = getOptions(opts)

    expect(result.redisUrl).toBe('redis://my-redis-url:6379')
    expect(result.port).toBe(8080)
    expect(result.origin).toBe('http://example.com/')
    expect(result.clearCache).toBe(false)
  })

  it('Should throw if the port is not valid', () => {
    const opts = mockOpts({ port: 70000 })

    expect(() => getOptions(opts)).toThrow('Invalid port number: 70000')
  })

  it('Should throw if redis url is not valid', () => {
    const opts = mockOpts({ redisUrl: 'invalid-redis-url' })

    expect(() => getOptions(opts)).toThrow(
      'Invalid Redis URL: invalid-redis-url',
    )
  })

  it('Should throw if origin url is not valid', () => {
    const opts = mockOpts({ origin: 'invalid-url' })

    expect(() => getOptions(opts)).toThrow('Invalid origin URL: https://invalid-url')
  })
})

const mockOpts = (overrides: Partial<Options>) => ({
  redisUrl: 'redis://localhost:6379',
  port: 3000,
  origin: 'http://localhost',
  clearCache: false,
  ...overrides,
})
