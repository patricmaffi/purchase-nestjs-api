// Não é o melhor jeito de armazenar a chave, precisamos achar outra maneira, mas estou centralizando aqui, já que
// foram criados vários controllers que usam ela.
export const BLING_API_KEY =
  '3b24c69a6e74f2b73d9625e0ee87bb72812737d1a9ad8a1a920f65c7a76e764fda46325f';
export const BLING_API_URL_BASE = 'https://bling.com.br/Api/v2';
export const API_CONFIG_JSON = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
export const DEFAULT_CACHE_DURATION = 30000;
