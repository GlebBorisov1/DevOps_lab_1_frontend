// В dev — ходим прямо на localhost:8000,
// в prod-сборке — относительный путь, который проксирует nginx.
const fallback = import.meta.env.PROD ? '' : 'http://localhost:8000';

export const API_BASE = import.meta.env.VITE_API_BASE ?? fallback;
