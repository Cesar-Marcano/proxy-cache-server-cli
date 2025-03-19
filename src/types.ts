export interface Options {
  redisUrl: string
  port: number
  origin: string
  clearCache: boolean
}

export enum ContentType {
  JSON = 'application/json',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  TEXT = 'text/plain',
  HTML = 'text/html',
  XML = 'application/xml',
  FORM_DATA = 'multipart/form-data',
}
