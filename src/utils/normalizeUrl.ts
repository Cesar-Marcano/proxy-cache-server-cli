export function normalizeUrl(inputUrl: string): string {
  try {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      inputUrl = 'https://' + inputUrl
    }

    const url = new URL(inputUrl)

    if (!url.protocol) {
      url.protocol = 'https:'
    }

    if (!url.pathname.endsWith('/')) {
      url.pathname += '/'
    }

    return url.toString()
  } catch (error) {
    throw new Error(`❌ Invalid URL: ${inputUrl}`)
  }
}
