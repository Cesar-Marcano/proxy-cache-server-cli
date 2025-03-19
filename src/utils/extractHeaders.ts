export function extractHeaders(
  headers: Record<string, any>,
): Record<string, string> {
  const extractedHeaders: Record<string, string> = {}

  Object.keys(headers).forEach((key) => {
    const value = headers[key]
    if (typeof value === 'string') {
      extractedHeaders[key] = value
    }
  })

  return extractedHeaders
}
