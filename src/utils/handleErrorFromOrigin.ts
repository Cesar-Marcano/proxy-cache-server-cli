import { AxiosResponse } from 'axios'
import { Response } from 'express'

export function handleErrorFromOrigin(
  axiosResponse: AxiosResponse,
  res: Response,
) {
  res.status(axiosResponse.status).json({
    error: `Error from origin: ${axiosResponse.status} ${axiosResponse.statusText}`,
  })
}
