import axios, { AxiosResponse } from 'axios'

export class ForwardClient {
  private origin: string

  constructor(origin: string) {
    this.origin = origin
  }

  public async fetch(
    path: string,
    headers: Record<string, string> = {},
    method: string,
    data: any = null,
  ) {
    try {
      const url = new URL(path, this.origin).toString()
      const response = await axios({
        method,
        url,
        data,
        validateStatus: () => true, // Do not throw for non-2xx responses
      })

      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error fetching ${path}: ${error.message}`)
      } else {
        throw error
      }
    }
  }
}
