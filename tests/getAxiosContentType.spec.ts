import { AxiosResponse } from 'axios'
import { getAxiosContentType } from '../src/utils/getAxiosContentType'

describe('getAxiosContentType', () => {
  it('should return the content type from the Axios response headers', () => {
    const mockResponse = {
      headers: {
        'content-type': 'application/json',
      },
    } as unknown as AxiosResponse

    const contentType = getAxiosContentType(mockResponse)
    expect(contentType).toBe('application/json')
  })

  it('should return "application/octet-stream" if content type is not present', () => {
    const mockResponse = {
      headers: {}, // No content-type header
    } as unknown as AxiosResponse

    const contentType = getAxiosContentType(mockResponse)
    expect(contentType).toBe('application/octet-stream')
  })
})
