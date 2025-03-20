import { Response } from 'express'

export function setCacheHeaders(res: Response, cacheStatus: 'HIT' | 'MISS') {
  res.setHeader('X-Cache', cacheStatus)
}
