// src/lib/axios.ts
//
// Instância centralizada do axios. Em vez de importar "axios" direto em
// cada service (como fizemos rapidamente no organization.service.ts),
// criamos UMA instância customizada aqui, com interceptors — e todos os
// services vão importar ESSA instância, não o axios genérico.

import axios from 'axios'
import { env } from './env'
import { loadingStore } from './loadingStore'

export const api = axios.create({
  baseURL: env.apiUrl,
})

// Interceptor de REQUEST: roda ANTES de qualquer chamada sair.
// Aqui avisamos o loadingStore que uma requisição começou.
api.interceptors.request.use(
  (config) => {
    loadingStore.start()
    return config
  },
  (error) => {
    loadingStore.finish()
    return Promise.reject(error)
  }
)

// Interceptor de RESPONSE: roda depois que a resposta chega (sucesso OU erro).
// Aqui avisamos que a requisição terminou, independente do resultado.
api.interceptors.response.use(
  (response) => {
    loadingStore.finish()
    return response
  },
  (error) => {
    loadingStore.finish()
    return Promise.reject(error) // repassa o erro para quem chamou a função
  }
)

// src/lib/axios.ts — adicione este interceptor de request (além do que já existe)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sacrapay_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})