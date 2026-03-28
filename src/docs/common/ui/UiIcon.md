# UiIcon

**Расположение:** `src/common/ui/UiIcon.vue`

Компонент для отображения SVG-иконок из спрайта, собранного плагином [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons). Иконки берутся из папки `src/app/assets/icons`; имя файла (без расширения) передаётся в проп `name`.

---

### Пропсы (Props)

| Поле     | Тип                | По умолчанию | Описание                                                      |
| -------- | ------------------ | ------------ | ------------------------------------------------------------- |
| `name`   | `string`           | —            | Имя иконки (имя SVG-файла без расширения)                     |
| `color`  | `string`           | —            | Цвет заливки (если не задан — `currentColor`)                 |
| `size`   | `number \| string` | `20`         | Размер в `rem` (используется для ширины и высоты)             |
| `width`  | `number \| string` | —            | Ширина в `rem` (если задан — переопределяет `size`)           |
| `height` | `number \| string` | —            | Высота в `rem` (если задана — переопределяет `size`)          |
| `fit`    | `boolean`          | `false`      | Подгоняет размер иконки под размер родительского контейнера   |
---

### Примеры использования

Иконка по имени файла (например, `main-logo.svg` → `name="main-logo"`):

```vue
<UiIcon name="main-logo" />
```

С размером и цветом:

```vue
<UiIcon name="close" size="24" color="#333" />
```

Разные ширина и высота:

```vue
<UiIcon name="arrow" width="16" height="12" />
```

Наследование цвета от текста (`currentColor`):

```vue
<p class="text-primary">
  <UiIcon name="check" size="1.2" /> Готово
</p>
```
