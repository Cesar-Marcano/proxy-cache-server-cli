export function getFinalPath(path: string, queryString: string): string {
  let finalPath = path
  if (queryString) {
    finalPath += `?${queryString}`
  }
  return finalPath
}
