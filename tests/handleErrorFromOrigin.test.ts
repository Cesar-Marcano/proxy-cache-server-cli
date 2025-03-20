import { handleErrorFromOrigin } from '../src/utils/handleErrorFromOrigin'
import { AxiosResponse } from 'axios'
import { Response } from 'express'

describe('handleErrorFromOrigin', () => {
  let mockAxiosResponse: AxiosResponse
  let mockRes: Response

  beforeEach(() => {
    mockAxiosResponse = {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {},
      data: {},
    } as AxiosResponse

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
  })

  it('should set the response status and return a JSON error message', () => {
    handleErrorFromOrigin(mockAxiosResponse, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Error from origin: 500 Internal Server Error',
    })
  })

  it('should handle different status codes', () => {
    mockAxiosResponse.status = 404
    mockAxiosResponse.statusText = 'Not Found'

    handleErrorFromOrigin(mockAxiosResponse, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Error from origin: 404 Not Found',
    })
  })
})
