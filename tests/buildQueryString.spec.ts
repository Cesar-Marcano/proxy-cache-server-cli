import { buildQueryString } from '../src/utils/buildQueryString'

describe('buildQueryString', () => {
  it('Should build a correct query string', () => {
    const queryParams = { search: 'test', page: '1' }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=test&page=1')
  })

  it('Should build a correct query string with multiple params', () => {
    const queryParams = { search: 'test', tags: ['node', 'typescript'] }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=test&tags=node%2Ctypescript')
  })

  it('Should handle params with empty values', () => {
    const queryParams = { search: '', page: '1' }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=&page=1')
  })

  it('Should build a query string if no params were passed', () => {
    const queryParams = {}
    const result = buildQueryString(queryParams)

    expect(result).toBe('')
  })

  it('Should handle params with special values', () => {
    const queryParams = { search: 'test & example', page: '1' }
    const result = buildQueryString(queryParams)

    expect(result).toBe('search=test%20%26%20example&page=1')
  })

  it('Should handle params with special chars inside of an array', () => {
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
