// src/lib/jwt.ts
// Decodifica o payload de um JWT no navegador, sem precisar de nenhuma
// biblioteca extra — é só base64. Usamos isso só para EXIBIÇÃO (nome,
// email, role) — a validação de verdade sempre acontece no backend.
export function decodeJwt<T = Record<string, unknown>>(token: string): T | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as T
  } catch {
    return null
  }
}