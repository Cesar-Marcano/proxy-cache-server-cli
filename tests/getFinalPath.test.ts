import { getFinalPath } from '../src/utils/getFinalPath'

describe('getFinalPath', () => {
  it('should return the path when queryString is empty', () => {
    const path = '/api/data'
    const queryString = ''
    const result = getFinalPath(path, queryString)
    expect(result).toBe('/api/data')
  })

  it('should return the path with queryString when queryString is provided', () => {
    const path = '/api/data'
    const queryString = 'id=123'
    const result = getFinalPath(path, queryString)
    expect(result).toBe('/api/data?id=123')
  })

  it('should handle paths with trailing slashes correctly', () => {
    const path = '/api/data/'
    const queryString = 'id=123'
    const result = getFinalPath(path, queryString)
    expect(result).toBe('/api/data/?id=123')
  })

  it('should handle paths without leading slashes correctly', () => {
    const path = 'api/data'
    const queryString = 'id=123'
    const result = getFinalPath(path, queryString)
    expect(result).toBe('api/data?id=123')
  })
})
