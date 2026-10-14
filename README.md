# Сайт бьюти-мастера

Многостраничный сайт на React, Vite и TypeScript. В интерфейсе используются маршруты React Router и стили CSS Modules. Метаданные страниц задаются через `react-helmet-async`.

## Страницы

- `/` — главная
- `/services` — услуги
- `/portfolio` — портфолио
- `/about` — о мастере
- `/contacts` — контакты
- любой неизвестный путь — страница NotFound

## Данные

Основные данные сайта находятся в `src/data/masterData.ts`.

## Изображения

Портрет мастера и фотографии шести услуг находятся в `public/images/` и используются на страницах услуг, портфолио и главной. В `src/assets/` также хранятся `hero.png`, `react.svg` и `vite.svg`. Статические файлы `favicon.svg` и `icons.svg` находятся в `public/`.

## Команды

Установка зависимостей по `package-lock.json` и команды ниже используют npm:

- `npm ci` — установка зависимостей из lock-файла.
- `npm run dev` — запуск локального сервера разработки Vite.
- `npm run lint` — проверка кода с Oxlint.
- `npm run build` — проверка TypeScript и production-сборка Vite.
- `npm run preview` — локальный просмотр production-сборки после `npm run build`.
