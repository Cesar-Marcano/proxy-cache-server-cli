export function buildQueryString(
  queryParams: Record<string, string | string[]>,
): string {
  return Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          Array.isArray(queryParams[key])
            ? queryParams[key].join(',')
            : queryParams[key],
        )}`,
    )
    .join('&')
}
