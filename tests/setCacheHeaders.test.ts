import { setCacheHeaders } from '../src/utils/setCacheHeaders'
import { Response } from 'express'

describe('setCacheHeaders', () => {
  let res: Response

  beforeEach(() => {
    res = {
      setHeader: jest.fn(),
    } as unknown as Response
  })

  it('should set X-Cache header to HIT', () => {
    setCacheHeaders(res, 'HIT')
    expect(res.setHeader).toHaveBeenCalledWith('X-Cache', 'HIT')
  })

  it('should set X-Cache header to MISS', () => {
    setCacheHeaders(res, 'MISS')
    expect(res.setHeader).toHaveBeenCalledWith('X-Cache', 'MISS')
  })
})
