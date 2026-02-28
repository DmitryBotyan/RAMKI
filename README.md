# РАМКИ — Федеральное деловое издание

Минималистичный новостной сайт на React + Vite + TypeScript.

## Стек

- Bun
- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- React Router

## Быстрый старт

```bash
bun install
bun run dev
```

Приложение доступно по адресу: `http://localhost:3000`.

## Скрипты

```bash
bun run dev      # локальная разработка
bun run start    # алиас для dev
bun run build    # typecheck + production build
bun run preview  # предпросмотр production сборки
```

## Маршруты

- `/` — главная
- `/statji` — статьи
- `/article/:id` — страница статьи
- `/avtory` — авторы
- `/zhurnal` — журнал
- `/ekosistema` — экосистема
- `/mediakit` — медиакит

## Структура

```text
src/
  App.tsx
  main.tsx
  index.css
  data/
    content.ts
  types/
    index.ts
  variants/
    Variant1/
      App.tsx
      components/
      pages/
```

## Примечания

- В проекте используется только `Variant1`.
- При переходах между страницами скролл автоматически сбрасывается в начало.
