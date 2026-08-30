// src/components/GlobalLoadingBar.tsx
//
// Uma barrinha fina no topo da tela, estilo YouTube/GitHub, que aparece
// automaticamente sempre que qualquer requisição axios estiver em andamento.
// Não precisamos "ligar" isso manualmente em cada tela — funciona sozinho
// porque o axios.ts já avisa o loadingStore em toda chamada.

import { useLoading } from '@/lib/useLoading'

export function GlobalLoadingBar() {
  const isLoading = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 overflow-hidden bg-violet-100">
      <div className="h-full w-1/3 bg-violet-600 animate-[loading-slide_1s_ease-in-out_infinite]" />
    </div>
  )
}