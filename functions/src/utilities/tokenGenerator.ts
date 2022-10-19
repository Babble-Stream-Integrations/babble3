/**
 * Generates a randomized token (with a length of 64 by default)
 * @param length
 * @returns string
 */
export function generateToken(length: number = 64): string {
  let token = "";

  const pool = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < length; i++) {
    token += pool.charAt(Math.floor(Math.random() * pool.length));
  }

  return token;
}

