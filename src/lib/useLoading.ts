// src/lib/useLoading.ts
//
// Este hook conecta o loadingStore (que vive fora do React) com o React,
// usando useSyncExternalStore — o hook oficial do React para "escutar"
// mudanças de um estado que não é gerenciado pelo React.

import { useSyncExternalStore } from 'react'
import { loadingStore } from './loadingStore'

export function useLoading() {
  return useSyncExternalStore(
    loadingStore.subscribe,      // como "assinar" mudanças
    () => loadingStore.isLoading() // como "ler" o valor atual
  )
}