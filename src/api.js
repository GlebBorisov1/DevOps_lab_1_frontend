import { API_BASE } from './config.js';

export class ApiError extends Error {}

async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function sendMessage(message) {
  const response = await fetch(`${API_BASE}/api/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const result = await parseJsonSafely(response);

  if (!response.ok) {
    throw new ApiError(
      (result && (result.error || result.detail)) || 'Ошибка сервера'
    );
  }

  return result;
}

/**
 * Возвращает { content: string | null }.
 * content === null → сервер ответил 404 (файл пуст/отсутствует).
 */
export async function loadData() {
  const response = await fetch(`${API_BASE}/api/data`, { method: 'GET' });
  const result = await parseJsonSafely(response);

  if (response.status === 404) {
    return { content: null };
  }

  if (!response.ok) {
    throw new ApiError(
      (result && (result.error || result.detail)) || 'Ошибка сервера'
    );
  }

  return { content: (result && result.content) || '' };
}