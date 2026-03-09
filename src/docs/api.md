# API

## HTTP клиент

**Расположение:** `src/common/api/http.ts`

HTTP клиент построен поверх [axios](https://axios-http.com/) и предоставляет типизированные методы для работы с REST API.

---

### Интерфейсы

#### `HttpConfig`

Конфигурация для создания экземпляра клиента.

| Поле             | Тип                      | Описание                                 |
| ---------------- | ------------------------ | ---------------------------------------- |
| `baseURL`        | `string`                 | Базовый URL всех запросов                |
| `defaultHeaders` | `Record<string, string>` | Заголовки, добавляемые к каждому запросу |

#### `HttpResponse<T>`

Обёртка над ответом сервера.

| Поле     | Тип         | Описание                                         |
| -------- | ----------- | ------------------------------------------------ |
| `data`   | `T \| null` | Тело ответа (или `null` при ошибке)              |
| `status` | `number`    | HTTP-статус ответ (или `500` при сетевой ошибке) |

---

### `httpClient(config: HttpConfig): HttpClient`

Фабричная функция, создающая и возвращающая экземпляр HTTP-клиента.

Все методы внутри работают через приватную функцию `request`, которая:

- выполняет запрос через `axios`
- в случае ошибки возвращает тело ошибки и её статус (или `500`, если статус недоступен)
- никогда не бросает исключение наружу

#### Методы экземпляра

##### `fetchData<T>(config: AxiosRequestConfig): Promise<T | null>`

Возвращает только тело ответа. При ошибке возвращает `null`.

```ts
const data = await http.fetchData<User>({ method: 'GET', url: '/users/1' })
```

---

##### `fetchFull<T>(config: AxiosRequestConfig): Promise<HttpResponse<T>>`

Возвращает объект `{ data, status }` — полный ответ сервера вместе со статусом.

```ts
const { data, status } = await http.fetchFull<User[]>({ method: 'GET', url: '/users' })
```

---

##### `isSuccess(config: AxiosRequestConfig): Promise<boolean>`

Выполняет запрос и возвращает `true`, если HTTP-статус находится в диапазоне `200–299`.

```ts
const ok = await http.isSuccess({ method: 'DELETE', url: '/users/1' })
```

---

### Готовый экземпляр `http`

В том же файле сразу создаётся и экспортируется готовый экземпляр клиента:

```ts
import { http } from '@/common/api/http'
```

Экземпляр создаётся со следующими параметрами по умолчанию:

| Параметр       | Значение                                      |
| -------------- | --------------------------------------------- |
| `baseURL`      | `import.meta.env.VITE_API_BASE_URL`           |
| `Accept`       | `application/json`                            |
| `Content-Type` | `application/json`                            |
| `x-api-key`    | значение из переменной окружения (см. `.env`) |

> Переменная `VITE_API_BASE_URL` должна быть задана в файле `.env` (или `.env.local`).
