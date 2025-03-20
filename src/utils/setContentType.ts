import { Response } from 'express'

export function setContentType(res: Response, contentType: string) {
  res.setHeader('Content-Type', contentType)
}
