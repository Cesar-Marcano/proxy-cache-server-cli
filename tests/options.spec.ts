import { Options } from '../src/types'
import { getOptions } from '../src/utils/getOptions'

describe('getOptions', () => {
  it('debería devolver las opciones correctas cuando los valores son válidos', () => {
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

  it('debería lanzar un error si el puerto es inválido', () => {
    const opts = mockOpts({ port: 70000 })

    expect(() => getOptions(opts)).toThrow('Invalid port number: 70000')
  })

  it('debería lanzar un error si la URL de Redis es inválida', () => {
    const opts = mockOpts({ redisUrl: 'invalid-redis-url' })

    expect(() => getOptions(opts)).toThrow(
      'Invalid Redis URL: invalid-redis-url',
    )
  })

  it('debería lanzar un error si la URL de origen es inválida', () => {
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
