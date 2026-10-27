# DevOps
## Лабораторная Работа № 1
 
### Тема

Работа с системой контроля версии Git

### Цель

Научится создавать и управлять репозиториями, использовать тэги для версионирования, реализовать взаимодействие между фронтенд и бэкенд частями на разных версиях.


## Frontend часть

Веб-интерфейс для отправки текстовых сообщений на backend-сервер и чтения
содержимого файла `data.txt`. Написан на **React 18** + **Vite**.

### Структура проекта
```text
frontend/
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── config.js
    ├── api.js
    ├── style.css
    └── components/
        ├── SenderForm.jsx
        └── DataReader.jsx
```

#### Взаимодействие с API
Фронтенд использует два эндпоинта:

| Метод	| Путь	| Назначение |
| --- | --- | --- |
|`POST`	| `/api/data` |	Отправка сообщения: `{ "message": "..." }`|
|`GET`	| `/api/data` |	Получение содержимого `data.txt`          |

Обработка ответов:
- `200 OK` — успех;
- `404` на `GET` → «Записи в файле отсутствуют»;
- `422` (Pydantic) или другие `4xx/5xx` → текст из `detail` / `error` выводится пользователю в статусной строке.

Вся логика работы с API изолирована в `src/api.js`. Чтобы добавить новый эндпоинт, достаточно экспортировать оттуда новую функцию — компоненты не работают с `fetch` напрямую.

### Installation
#### Требования

- **Node.js** 18+ и **npm** 9+
- Запущенный **backend** (`server.py` на FastAPI) — по умолчанию `http://localhost:8000`

Проверить версии:

```bash
node --version
npm --version
```

Клонирововать репозиторий:


```bash
# 1. Клонировать репозиторий
git clone git@github.com:GlebBorisov1/DevOps_lab_1_frontend.git
# или
git clone https://github.com/GlebBorisov1/DevOps_lab_1_frontend.git

cd DevOps_lab_1_frontend/
```

Установка зависимостей и запуск:
```bash
# 2. Скопировать конфиг окружения
cp .env.example .env          # Linux / macOS
copy .env.example .env        # Windows (cmd)
Copy-Item .env.example .env   # Windows (PowerShell)

# 3. Установить зависимости
npm install
```

#### Настройка
Единственная настройка — базовый URL API. Хранится в .env:

```env
VITE_API_BASE=http://localhost:8000
```
Если переменная не задана, используется значение по умолчанию —`http://localhost:8000`.

> ⚠️ Vite подставляет переменные окружения **только с префиксом** `VITE_`.
Значения вшиваются в бандл на этапе сборки, поэтому после изменения `.env`
нужно перезапустить dev-сервер.

#### Запуск
```bash
npm run dev
```
Приложение будет доступно по адресу `http://localhost:5173`.