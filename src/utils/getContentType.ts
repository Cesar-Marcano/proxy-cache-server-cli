import { ContentType } from '../types'

export function getContentType(contentType: string): ContentType {
  switch (true) {
    case contentType.includes(ContentType.JSON):
      return ContentType.JSON
    case contentType.includes(ContentType.FORM_URLENCODED):
      return ContentType.FORM_URLENCODED
    case contentType.includes(ContentType.TEXT):
      return ContentType.TEXT
    case contentType.includes(ContentType.HTML):
      return ContentType.HTML
    case contentType.includes(ContentType.XML):
      return ContentType.XML
    case contentType.includes(ContentType.FORM_DATA):
      return ContentType.FORM_DATA
    default:
      return ContentType.JSON
  }
}
