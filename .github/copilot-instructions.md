# Copilot инструкции для проекта

## Обзор проекта
В проекте используется архитектура **FEOD** (Fractal Entity Oriented Design) с использованием Vue 3, TypeScript и Vite.

## Ссылка на документацию по FEOD
https://feod.zede169778.workers.dev/

## Технологический стек
- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest + @vue/test-utils
- **Code Quality**: ESLint + Prettier
- **Node Version**: ^20.19.0 || >=22.12.0

## Архитектура проекта

### Структура директорий
```
src/
├── app/              # Точка входа приложения, роутинг, глобальные стили
├── common/           # Общие ресурсы для всего приложения
│   ├── ui/          # Переиспользуемые UI компоненты
│   ├── composables/ # Общие composables
│   ├── constants/   # Константы приложения
│   ├── types/       # Общие типы TypeScript
│   ├── utilities/   # Вспомогательные функции
│   └── tests/       # Тесты для UI компонентов
├── modules/          # Функциональные модули (features)
│
└── pages/            # Страницы приложения (собираются из модулей)
```

## Соглашения о коде

### TypeScript
- Используй строгую типизацию
- Избегай `any`, используй `unknown` где необходимо
- Определяй интерфейсы для props компонентов
- Используй `type` для union типов и простых алиасов, `interface` для объектных структур

### Vue компоненты
- **Используй Composition API** с `<script setup lang="ts">`
- **Naming**: PascalCase для компонентов (UiButton, UiInput)
- **UI компоненты**: префикс `Ui` для всех компонентов в `src/common/ui/`
- **Props**: определяй через `defineProps<InterfaceName>()`
- **Emits**: типизируй через `defineEmits<{eventName: [payload]}>()`
- **Slots**: типизируй через `defineSlots<{slotName: Slot}>()`

### Стилизация
- Используй scoped стили: `<style scoped>`
- Используй препроцессор SCSS
- Используй переменные из `variables.scss`

### Composables
- Префикс `use` для всех composables (useDebounce, useColorTheme)
- Размещай в `src/common/composables/` для общих или `src/modules/{ModuleName}/` для относящихся к модулю
- Типизируй параметры и возвращаемые значения
- Экспортируй как named export

### Константы и роуты
- Все константы в UPPER_SNAKE_CASE
- Роуты определяй в `src/common/constants/routes.ts`
- Используй константы роутов вместо строк

### Тестирование
- Используй Vitest для unit тестов
- Размещай тесты для common ui компонентовв `src/common/tests/`
- Размещай тесты для modules в `src/modules/{ModuleName}/tests/`
- Название файлов: `{component-name}.test.js`
- Покрывай тестами UI компоненты и утилиты

### Path aliases
Используй алиас `@/` для импортов из `src/`:

## Важные замечания
- Всегда используй TypeScript, не используй `.js` для новых файлов
- Не используй Options API, только Composition API
- Все UI компоненты должны быть переиспользуемыми и не зависеть от бизнес-логики
- Избегай inline стилей, используй SCSS переменные
- При работе с роутами используй константы из `routes.ts`
- Следуй принципам FEOD архитектуры при организации кода

## Инструкции для использования MCP серверов
- Always use context7 when I need code generation, setup or configuration steps, or
library/API documentation. This means you should automatically use the Context7 MCP
tools to resolve library id and get library docs without me having to explicitly ask.
- Для того чтобы получить документацию любой библиотеки, используй mcp context7
- Для сложных рассуждений используй Sequential Thinking
