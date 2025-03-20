import { handleNoResponseFromOrigin } from '../src/utils/handleNoResponseFromOrigin'
import { Response } from 'express'

describe('handleNoResponseFromOrigin', () => {
  it('should set status to 502 and return error message', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    handleNoResponseFromOrigin(res)

    expect(res.status).toHaveBeenCalledWith(502)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Bad Gateway: No response from origin',
    })
  })
})
