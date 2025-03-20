import { setContentType } from '../src/utils/setContentType'
import { Response } from 'express'

describe('setContentType', () => {
  let res: Response

  beforeEach(() => {
    res = {
      setHeader: jest.fn(),
    } as unknown as Response
  })

  it('should set the Content-Type header', () => {
    const contentType = 'application/json'

    setContentType(res, contentType)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', contentType)
  })

  it('should set the Content-Type header to text/html', () => {
    const contentType = 'text/html'

    setContentType(res, contentType)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', contentType)
  })
})
