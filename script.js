const form = document.getElementById('dataForm');
const message = document.getElementById('message');
const button = document.getElementById('submitButton');
const statusMessage = document.getElementById('status');

const loadButton = document.getElementById('loadButton');
const fileContent = document.getElementById('fileContent');
const loadStatus = document.getElementById('loadStatus');

// Берём базовый URL из window.APP_CONFIG (задаётся в index.html).
// Если по какой-то причине не задан — падаем на localhost:8000.
const API_BASE = (window.APP_CONFIG && window.APP_CONFIG.apiBase)
    ? window.APP_CONFIG.apiBase
    : 'http://localhost:8000';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = message.value.trim();
    if (!text) return;

    button.disabled = true;
    statusMessage.className = '';
    statusMessage.textContent = 'Отправка...';

    try {
        const response = await fetch(`${API_BASE}/api/data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const result = await response.json();

        if (!response.ok)
            throw new Error(result.error || result.detail || 'Ошибка сервера');

        statusMessage.className = 'success';
        statusMessage.textContent = 'Данные успешно сохранены.';
        message.value = '';

    } catch (error) {
        statusMessage.className = 'error';
        statusMessage.textContent = 'Не удалось отправить данные: ' + error.message;

    } finally {
        button.disabled = false;
    }
});


loadButton.addEventListener('click', async () => {
    loadButton.disabled = true;
    loadStatus.className = '';
    loadStatus.textContent = 'Загрузка...';
    fileContent.value = '';

    try {
        const response = await fetch(`${API_BASE}/api/data`, { method: 'GET' });

        let result = null;
        try {
            result = await response.json();
        } catch (_) {
            // не JSON — оставляем result = null
        }

        if (response.status === 404) {
            const detail = (result && (result.detail || result.error))
                || 'Записи в файле отсутствуют';
            loadStatus.className = 'error';
            loadStatus.textContent = detail;
            return;
        }

        if (!response.ok) {
            const detail = (result && (result.detail || result.error))
                || 'Ошибка сервера';
            throw new Error(detail);
        }

        const content = (result && result.content) || '';

        if (!content.trim()) {
            loadStatus.className = 'error';
            loadStatus.textContent = 'Записи в файле отсутствуют';
            return;
        }

        fileContent.value = content;
        loadStatus.className = 'success';
        loadStatus.textContent = 'Данные успешно загружены.';

    } catch (error) {
        loadStatus.className = 'error';
        loadStatus.textContent = 'Не удалось получить данные: ' + error.message;

    } finally {
        loadButton.disabled = false;
    }
});