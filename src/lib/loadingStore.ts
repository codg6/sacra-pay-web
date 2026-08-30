// src/lib/loadingStore.ts
//
// Isso é um "store" bem simples, fora do React, que guarda quantas
// requisições estão em andamento. Não usamos useState aqui porque o
// axios interceptor roda FORA de um componente React — precisamos de
// algo que qualquer parte do app (dentro ou fora de componentes) possa
// chamar para avisar "comecei uma requisição" / "terminei uma requisição".

type Listener = () => void

let pendingRequests = 0
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener())
}

export const loadingStore = {
  start() {
    pendingRequests++
    notify()
  },
  finish() {
    pendingRequests = Math.max(0, pendingRequests - 1)
    notify()
  },
  isLoading() {
    return pendingRequests > 0
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener) // função de "unsubscribe"
  },
}