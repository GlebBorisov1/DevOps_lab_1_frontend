// Замена старого window.APP_CONFIG → переменные окружения Vite.
// Значение по умолчанию совпадает с прежним.
export const API_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost:8000';