import { useState } from 'react';
import { loadData } from '../api.js';

export default function DataReader() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState({ kind: 'idle', text: '' });
  const [loading, setLoading] = useState(false);

  async function handleLoad() {
    if (loading) return;

    setLoading(true);
    setStatus({ kind: 'pending', text: 'Загрузка...' });
    setContent('');

    try {
      const { content } = await loadData();

      if (content === null || !content.trim()) {
        setStatus({ kind: 'error', text: 'Записи в файле отсутствуют' });
        return;
      }

      setContent(content);
      setStatus({ kind: 'success', text: 'Данные успешно загружены.' });
    } catch (error) {
      setStatus({
        kind: 'error',
        text: 'Не удалось получить данные: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  const statusClass =
    status.kind === 'success'
      ? 'success'
      : status.kind === 'error'
      ? 'error'
      : '';

  return (
    <section className="reader">
      <h2>Чтение данных</h2>
      <p className="description">
        Нажмите кнопку, чтобы получить текущее содержимое файла data.txt с
        сервера.
      </p>

      <button id="loadButton" type="button" onClick={handleLoad} disabled={loading}>
        Прочитать data.txt
      </button>

      <label htmlFor="fileContent">Содержимое data.txt</label>
      <textarea
        id="fileContent"
        readOnly
        value={content}
        placeholder="Здесь появится содержимое файла..."
      />

      <p id="loadStatus" role="status" aria-live="polite" className={statusClass}>
        {status.text}
      </p>
    </section>
  );
}