import { Response } from 'express'

export function handleNoResponseFromOrigin(res: Response) {
  res.status(502).json({ error: 'Bad Gateway: No response from origin' })
}
