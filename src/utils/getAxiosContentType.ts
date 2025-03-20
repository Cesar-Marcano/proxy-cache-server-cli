import { AxiosResponse } from 'axios'

export function getAxiosContentType(response: AxiosResponse) {
  return response.headers['content-type'] || 'application/octet-stream'
}
