import { useState } from 'react';
import { sendMessage } from '../api.js';

const MAX_MESSAGE_LEN = 10_000;

export default function SenderForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState({ kind: 'idle', text: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    setStatus({ kind: 'pending', text: 'Отправка...' });

    try {
      await sendMessage(trimmed);
      setStatus({ kind: 'success', text: 'Данные успешно сохранены.' });
      setText('');
    } catch (error) {
      setStatus({
        kind: 'error',
        text: 'Не удалось отправить данные: ' + error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const statusClass =
    status.kind === 'success'
      ? 'success'
      : status.kind === 'error'
      ? 'error'
      : '';

  return (
    <form id="dataForm" onSubmit={handleSubmit}>
      <label htmlFor="message">Текст сообщения</label>
      <textarea
        id="message"
        name="message"
        placeholder="Введите текст..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={MAX_MESSAGE_LEN}
        required
      />
      <button id="submitButton" type="submit" disabled={submitting}>
        Отправить
      </button>
      <p id="status" role="status" aria-live="polite" className={statusClass}>
        {status.text}
      </p>
    </form>
  );
}