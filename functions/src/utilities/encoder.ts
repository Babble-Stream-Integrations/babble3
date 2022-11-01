export function parseScope(scopes: Array<string>): string {
  return encodeURIComponent(scopes.join("+")).replace("%2B", "+");
}

