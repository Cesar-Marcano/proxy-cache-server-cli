import { buildQueryString } from '../src/utils/buildQueryString'

describe('buildQueryString', () => {
  it('debería construir una cadena de consulta correcta para parámetros simples', () => {
    const queryParams = { search: 'test', page: '1' }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=test&page=1')
  })

  it('debería construir una cadena de consulta correcta para parámetros con múltiples valores', () => {
    const queryParams = { search: 'test', tags: ['node', 'typescript'] }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=test&tags=node%2Ctypescript')
  })

  it('debería manejar correctamente parámetros con valores vacíos', () => {
    const queryParams = { search: '', page: '1' }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=&page=1')
  })

  it('debería construir una cadena de consulta vacía si no se pasan parámetros', () => {
    const queryParams = {}
    const result = buildQueryString(queryParams)

    expect(result).toBe('')
  })

  it('debería manejar correctamente parámetros con valores especiales', () => {
    const queryParams = { search: 'test & example', page: '1' }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=test%20%26%20example&page=1')
  })

  it('debería manejar correctamente parámetros con valores especiales dentro de un array', () => {
    const queryParams = {
      search: 'test & example',
      tags: ['node', 'typescript & react'],
    }
    const result = buildQueryString(queryParams)

    expect(result).toBe(
      'search=test%20%26%20example&tags=node%2Ctypescript%20%26%20react',
    )
  })
})
