// No Vite, variáveis de ambiente vêm de arquivos .env e são acessadas
// via import.meta.env (diferente do Angular, que usa arquivos TS trocados no build)
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
};