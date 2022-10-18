export function parseScope(scopes: Array<String>): string {
  return encodeURIComponent(scopes.join("+")).replace("%2B", "+");
}

