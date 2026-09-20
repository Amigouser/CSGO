# ZamesGG - Полная документация проекта

## 1. Обзор проекта

ZamesGG - это киберспортивная платформа для организации и проведения турниров по CS2 (Counter-Strike 2). Проект создан для регионального сообщества и предоставляет полный цикл турнирной деятельности: от регистрации игроков через Steam до отслеживания рейтинга и статистики.

**Основные возможности:**
- Авторизация через Steam (OpenID)
- Турнирная система с разными форматами (Single/Double Elimination, Swiss, Groups + Playoffs)
- Рейтинговая система на базе ELO
- Интеграция с FACEIT API
- Live-трансляция матчей
- Профили игроков со статистикой
- Админ-панель для управления турнирами
- Система достижений
- Двухязычный интерфейс (RU/EN)
- Тёмная/светлая темы

---

## 2. Технологический стек

| Технология | Версия | Назначение |
|------------|--------|------------|
| Next.js | 16.3.4 | React-фреймворк (App Router) |
| React | 19.2.8 | UI-библиотека |
| TypeScript | 5.x | Типизация |
| Prisma | 6.19.3 | ORM для работы с БД |
| SQLite | - | База данных (dev.db) |
| NextAuth | 5.0.0-beta.32 | Авторизация (частично) |
| Tailwind CSS | 4.x | Стилизация |
| Lucide React | 1.40.0 | Иконки |

---

## 3. Структура проекта

```
intkg-clone/
├── prisma/
│   ├── schema.prisma        # Схема БД (5 моделей)
│   ├── dev.db               # SQLite база данных
│   └── migrations/          # Миграции Prisma
├── src/
│   ├── app/                 # Next.js App Router (страницы + API)
│   │   ├── page.tsx         # Главная страница
│   │   ├── layout.tsx       # Корневой layout
│   │   ├── globals.css      # Глобальные стили + CSS-переменные тем
│   │   ├── api/             # REST API эндпоинты
│   │   │   ├── auth/        # NextAuth (заготовка)
│   │   │   ├── steam/       # Steam OpenID авторизация
│   │   │   ├── tournaments/ # CRUD турниров + регистрация + скобки
│   │   │   ├── matches/     # Управление матчами
│   │   │   ├── players/     # Данные игроков
│   │   │   ├── me/          # Текущий пользователь
│   │   │   ├── stats/       # Общая статистика
│   │   │   └── faceit/      # Обновление FACEIT данных
│   │   ├── tournaments/     # Страницы турниров
│   │   ├── leaderboard/     # Рейтинг игроков
│   │   ├── live/            # Live матчи
│   │   ├── dashboard/       # Дашборд со статистикой
│   │   ├── profile/[id]/    # Профиль игрока
│   │   ├── admin/           # Админ-панель
│   │   ├── login/           # Страница входа
│   │   ├── predictions/     # Предсказания (заготовка)
│   │   ├── achievements/    # Достижения (заготовка)
│   │   ├── hall-of-fame/    # Зал славы
│   │   ├── balance/         # Баланс (заготовка)
│   │   ├── roll/            # Ролл (заготовка)
│   │   └── meta/            # Мета (заготовка)
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, BottomNav, UserMenu
│   │   ├── home/            # Компоненты главной страницы
│   │   ├── tournament/      # TournamentBracket (SVG), TournamentCard
│   │   ├── steam/           # (пусто)
│   │   └── ui/              # UI-компоненты (ThemeToggle, FaceitBadge, и т.д.)
│   ├── lib/
│   │   ├── prisma.ts        # Singleton Prisma клиента
│   │   ├── auth.ts          # NextAuth конфигурация
│   │   ├── session.ts       # Получение текущего пользователя из cookie
│   │   ├── steam.ts         # Steam API (GetPlayerSummaries)
│   │   ├── faceit.ts        # FACEIT API (получение уровня и ELO)
│   │   ├── bracket.ts       # Генерация турнирных сеток
│   │   ├── ranking.ts       # ELO-система и ранги
│   │   ├── achievements.ts  # Система достижений (15 ачивок)
│   │   ├── constants.ts     # Типы, ранги, форматы, статусы
│   │   └── i18n/            # Интернационализация (RU/EN)
│   ├── hooks/
│   │   └── useTheme.ts      # Хук для работы с темой
│   └── types/
│       └── index.ts         # TypeScript типы
├── public/                  # Статические файлы
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

---

## 4. База данных (Prisma + SQLite)

### 4.1 Модели

**User** - Пользователь
- `id` (cuid) - первичный ключ
- `steamId` (unique) - Steam ID пользователя
- `nickname` - никнейм
- `avatar`, `profileUrl` - аватар и ссылка на профиль
- `mmr` (default 1000) - внутренний рейтинг
- `rank` (default "Silver I") - ранг
- `isAdmin` (default false) - флаг администратора
- `wins`, `losses` (default 0) - победы/поражения
- `faceitId`, `faceitLevel`, `faceitElo` - данные FACEIT
- `createdAt`, `updatedAt` - временные метки

**Tournament** - Турнир
- `id` (cuid) - первичный ключ
- `name` - название
- `game` - игра (cs2)
- `gameMode` (default "5v5") - режим (1v1/2v2/5v5)
- `format` - формат (single_elim/double_elim/swiss/groups_playoffs)
- `status` (default "upcoming") - статус (upcoming/registration/active/completed)
- `maxTeams` - максимальное количество участников
- `teamSize` (default 5) - размер команды
- `minFaceitLevel` (default 0) - минимальный FACEIT уровень
- `description`, `imageUrl` - описание и изображение
- `startDate`, `endDate` - даты начала и окончания
- `prizePool` - призовой фонд

**TournamentParticipant** - Участник турнира
- `id` (cuid) - первичный ключ
- `userId` -> User (FK)
- `tournamentId` -> Tournament (FK)
- `teamName` - название команды
- `seed` - посев
- `status` (default "pending") - статус (pending/approved/rejected)
- Уникальная связь: `[userId, tournamentId]`

**Match** - Матч
- `id` (cuid) - первичный ключ
- `tournamentId` -> Tournament (FK)
- `round` - номер раунда
- `matchNumber` - номер матча в раунде
- `homePlayerId`, `awayPlayerId` -> User (FK, опционально)
- `homeScore`, `awayScore` - счёт
- `winner` - ID победителя
- `status` (default "pending") - статус (pending/active/completed)
- `scheduledAt` - время начала

**Account, Session, VerificationToken** - Модели NextAuth (стандартные)

### 4.2 Связи
- User 1:N TournamentParticipant
- User 1:N Match (homePlayer, awayPlayer)
- Tournament 1:N TournamentParticipant
- Tournament 1:N Match

---

## 5. Авторизация (Steam OpenID)

### 5.1 Поток авторизации

1. Пользователь нажимает "Войти через Steam" на `/login`
2. Перенаправление на `/api/steam/login` -> редирект на Steam OpenID
3. Steam возвращает на `/api/steam/callback`
4. Callback:
   - Проверяет подлинность ответа Steam (POST на steamcommunity.com)
   - Извлекает Steam ID из `openid.claimed_id`
   - Получает профиль через Steam Web API (`GetPlayerSummaries`)
   - Получает FACEIT данные через API
   - Создаёт/обновляет пользователя в БД
   - Создаёт сессию (30 дней) и устанавливает cookie `authjs.session-token`
   - Перенаправляет на профиль `/profile/{steamId}`

### 5.2 Получение текущего пользователя

Файл `src/lib/session.ts`:
- Читает cookie `authjs.session-token`
- Ищет сессию в БД
- Проверяет срок действия
- Возвращает пользователя или null

### 5.3 Выход

`/api/steam/logout`:
- Удаляет сессию из БД
- Удаляет cookie
- Перенаправляет на главную

### 5.4 Администраторы

- Определяются через переменную окружения `ADMIN_STEAM_IDS` (через запятую)
- При каждом логине проверяется, входит ли Steam ID в список админов
- Админы имеют доступ к: созданию турниров, панели администратора, управлению участниками

---

## 6. API эндпоинты

### 6.1 Авторизация

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/steam/login` | Редирект на Steam OpenID |
| GET | `/api/steam/callback` | Callback от Steam |
| GET | `/api/steam/logout` | Выход |
| GET | `/api/me` | Данные текущего пользователя |

### 6.2 Турниры

| Метод | Путь | Описание | Авторизация |
|-------|------|----------|-------------|
| GET | `/api/tournaments` | Список турниров (?game, ?status) | Нет |
| POST | `/api/tournaments` | Создать турнир | Нет (нет проверки!) |
| GET | `/api/tournaments/[id]` | Детали турнира | Нет |
| PATCH | `/api/tournaments/[id]` | Обновить турнир | Admin |
| DELETE | `/api/tournaments/[id]` | Удалить турнир | Admin |
| POST | `/api/tournaments/[id]/register` | Регистрация на турнир | User |
| POST | `/api/tournaments/[id]/participants` | Одобрить/отклонить участника | Admin |
| DELETE | `/api/tournaments/[id]/participants` | Удалить участника | Admin |
| POST | `/api/tournaments/[id]/bracket` | Генерация сетки | Нет (нет проверки!) |

### 6.3 Матчи

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/matches` | Последние 20 завершённых матчей |
| PATCH | `/api/matches` | Обновить результат матча |

### 6.4 Игроки

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/players` | Список игроков (?limit, ?offset) |
| GET | `/api/players/[id]` | Профиль игрока с матчами |

### 6.5 Прочее

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/stats` | Общая статистика |
| POST | `/api/faceit/refresh` | Обновить FACEIT данные текущего пользователя |

---

## 7. Турнирная система

### 7.1 Жизненный цикл турнира

```
upcoming -> registration -> active -> completed
```

1. **upcoming** - Турнир создан, регистрация ещё не открыта
2. **registration** - Открыта регистрация (статус выставляется вручную)
3. **active** - Турнир запущен, идут матчи
4. **completed** - Турнир завершён

### 7.2 Форматы турнирных сеток

Файл `src/lib/bracket.ts`:

**Single Elimination** - одиночное выбывание
- Генерирует полную сетку на основе количества игроков
- Заполняет пустые слоты "BYE" (автопроход)
- Количество раундов = `ceil(log2(players))`

**Double Elimination** - двойное выбывание
- Верхняя сетка (как Single Elim)
- Нижняя сетка для проигравших
- Гранд-финал

**Swiss System** - швейцарская система
- Количество раундов = `ceil(log2(players))`
- Случайное распределение пар в каждом раунде
- (Упрощённая реализация - без учёта очков)

### 7.3 Регистрация на турнир

1. Пользователь авторизован
2. Турнир в статусе `registration`
3. Проверка минимального FACEIT уровня (если задан)
4. Проверка лимита участников
5. Заявка создаётся со статусом `pending`
6. Администратор одобряет или отклоняет заявку

---

## 8. Рейтинговая система

### 8.1 ELO

Файл `src/lib/ranking.ts`:

```typescript
ELO_new = ELO_old + K * (actualScore - expectedScore)
expectedScore = 1 / (1 + 10^((opponentRating - playerRating) / 400))
```

- K-фактор: 32 для новых игроков (< 30 матчей), 16 для опытных
- actualScore: 1 за победу, 0 за поражение

### 8.2 Ранги (MMR-based)

| Ранг | MMR |
|------|-----|
| Herald | 0+ |
| Guardian | 770+ |
| Crusader | 1540+ |
| Archon | 2310+ |
| Legend | 3080+ |
| Ancient | 3850+ |
| Divine | 4620+ |
| Immortal | 5420+ |

### 8.3 FACEIT интеграция

Файл `src/lib/faceit.ts`:
- Получает уровень (1-10) и ELO по Steam ID
- Данные кешируются на 1 час (`revalidate: 3600`)
- Пользователь может обновить данные вручную через кнопку

---

## 9. Страницы

### 9.1 Главная (`/`)

Компоненты:
- `HeroSection` - баннер с CTA
- `StatsGrid` - сетка статистики
- `HallOfFameBanner` - баннер зала славы
- `TournamentsPreview` - превью турниров
- `HowToStart` - инструкция "как начать"
- `TournamentFormats` - описание форматов
- `TipBox` - советы

### 9.2 Турниры (`/tournaments`)

- Список всех турниров в виде карточек
- Фильтрация по статусу, формату, режиму
- Для админов - кнопка "Создать турнир"

### 9.3 Турнир (`/tournaments/[id]`)

- Заголовок с статусом, форматом, режимом
- Информация: участники, дата, призовой фонд
- Кнопка регистрации (если регистрация открыта)
- Таблица одобренных участников с FACEIT данными

### 9.4 Создание турнира (`/tournaments/create`)

- Форма с полями: название, режим, формат, макс. команд, размер команды, мин. FACEIT уровень, дата, призовой фонд, описание
- Отправка на `/api/tournaments/create`

### 9.5 Лидерборд (`/leaderboard`)

- Топ-50 игроков по FACEIT ELO
- Таблица: место, игрок, FACEIT уровень, ELO, W/L, винрейт

### 9.6 Live (`/live`)

- Активные матчи с текущим счётом
- Предстоящие матчи с расписанием
- Анимация "LIVE" индикатора

### 9.7 Дашборд (`/dashboard`)

- Общая статистика: турниры, игроки, матчи, средний ELO
- Топ-5 игроков

### 9.8 Профиль (`/profile/[id]`)

- Аватар, никнейм, Steam ID
- FACEIT данные с кнопкой обновления
- Статистика: W/L, винрейт, турниры, матчи, дни на платформе
- Последние 5 матчей

### 9.9 Админ-панель (`/admin`)

- Список турниров с участниками
- Управление заявками (одобрить/отклонить)
- Удаление участников
- Запуск турнира (перевод в active)
- Удаление турниров

### 9.10 Зал славы (`/hall-of-fame`)

- Чемпионы завершённых турниров
- Топ-5 игроков по победам

### 9.11 Заготовки (пока пустые)

- `/predictions` - Предсказания на матчи
- `/achievements` - Система достижений
- `/balance` - Баланс
- `/roll` - Ролл
- `/meta` - Мета-информация

---

## 10. Компоненты

### 10.1 Layout

- **Navbar** - навигация (десктоп + мобильное меню), кнопки Discord, UserMenu, LanguageSwitcher, ThemeToggle
- **Footer** - подвал сайта
- **BottomNav** - нижняя навигация (мобильные)
- **UserMenu** - выпадающее меню пользователя (профиль, админ-панель, создать турнира, выход)

### 10.2 UI компоненты

- **ThemeToggle** - переключатель тем (светлая/тёмная)
- **LanguageSwitcher** - переключатель языка (RU/EN)
- **FaceitBadge** - бейдж FACEIT уровня с цветовой кодировкой
- **FaceitRefreshButton** - кнопка обновления FACEIT данных
- **AchievementCard** - карточка достижения
- **AnimatedCounter** - анимированный счётчик
- **NotificationCenter** - система уведомлений
- **ParticleCanvas** - canvas с частицами

### 10.3 Турнирные компоненты

- **TournamentBracket** - SVG-визуализация турнирной сетки
- **TournamentCard** - карточка турнира

---

## 11. Система тем

Реализована через CSS-переменные в `globals.css`:

```css
[data-theme="dark"] {
  --background: #0d1117;
  --foreground: #e6edf3;
  --surface: #161b22;
  --gold: #c89b3c;
  --red: #e5534b;
  /* ... */
}

[data-theme="light"] {
  --background: #ffffff;
  --foreground: #1f2328;
  --surface: #f6f8fa;
  /* ... */
}
```

- Тема сохраняется в `localStorage`
- Инициализация через inline-скрипт в `<head>` (до гидрации)
- Переключение через `ThemeToggle`

---

## 12. Интернационализация (i18n)

Файл `src/lib/i18n/index.tsx`:

- Два языка: RU (по умолчанию) и EN
- Переводы хранятся в `src/lib/i18n/locales/`
- Context-based: `I18nProvider` + `useI18n()` хук
- Язык сохраняется в `localStorage`
- Переключение через `LanguageSwitcher`

---

## 13. Внешние API

### 13.1 Steam Web API

- Endpoint: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`
- Требует: `STEAM_API_KEY`
- Возвращает: никнейм, аватар, ссылку на профиль

### 13.2 FACEIT API

- Endpoint: `https://open.faceit.com/data/v4/players?game=cs2&game_player_id={steamId}`
- Требует: `FACEIT_API_KEY`
- Возвращает: FACEIT ID, никнейм, уровень (1-10), ELO

### 13.3 Steam OpenID

- URL: `https://steamcommunity.com/openid/login`
- Используется для авторизации (не требует API ключа)

---

## 14. Переменные окружения

```env
DATABASE_URL="file:./dev.db"          # Путь к SQLite
STEAM_API_KEY="..."                   # Steam Web API ключ
FACEIT_API_KEY="..."                  # FACEIT API ключ
ADMIN_STEAM_IDS="id1,id2"             # Steam ID администраторов
NEXTAUTH_URL="http://localhost:3000"  # Базовый URL
NEXTAUTH_SECRET="..."                 # Секрет NextAuth
```

---

## 15. Система достижений

Файл `src/lib/achievements.ts` - 15 достижений в 4 категориях:

**Турнирные:**
- Первый шаг (1 турнир)
- Чемпион (1 победа)
- Тройная корона (3 победы)
- Ветеран (10 турниров)

**Мастерство:**
- Неудержимый (5 побед подряд)
- Доминатор (10 побед подряд)
- Древний (Ancient ранг)
- Божественный (Divine ранг)
- Бессмертный (Immortal ранг)

**Социальные:**
- Дебют (1 матч)
- Сталкер (100 матчей)
- Первая кровь (1 победа)

**Особые:**
- Ранняя пташка (в первых 5 регистраций)
- Сова (матч после полуночи)
- Перфекционист (победа без поражений)

*Примечание: визуализация на странице `/achievements` пока заглушка.*

---

## 16. Известные проблемы и TODO

1. **POST `/api/tournaments`** и **POST `/api/tournaments/[id]/bracket`** - нет проверки авторизации
2. **POST `/api/tournaments/create`** - используется отдельный эндпоинт, не `/api/tournaments` (POST)
3. **Swiss System** - упрощённая реализация (случайное распределение, без учёта очков)
4. **Double Elimination** - генерация нижней сетки без связи с верхней (нет перебрасывания проигравших)
5. **ELO система** - реализована в `ranking.ts`, но не вызывается при обновлении результатов матчей
6. **Достижения** - данные определены, но нет бэкенда для вычисления прогресса
7. **Предсказания** - страница-заглушка
8. **Баланс, Ролл, Мета** - страницы-заглушки
9. **NextAuth** - настроен минимально, основная авторизация через кастомный Steam OpenID
10. **Командный режим** - модель поддерживает `teamName`, но нет системы создания/управления командами

---

## 17. Запуск проекта

```bash
# Установка зависимостей
npm install

# Генерация Prisma клиента
npx prisma generate

# Применение миграций
npx prisma migrate dev

# Запуск dev-сервера
npm run dev
```

Проект будет доступен по адресу `http://localhost:3000`.

---

## 18. Дизайн-система

- **Цветовая схема**: тёмная тема по умолчанию, акцентный цвет - золотой (`#c89b3c`)
- **Шрифты**: Geist Sans + Geist Mono
- **Стилизация**: Tailwind CSS + CSS-переменные для тем
- **Иконки**: Lucide React
- **Анимации**: CSS transitions + keyframes (fadeIn, slideDown)
- **Фон**: градиенты от тёмно-зелёного к чёрному для карточек турниров
- **Стеклянный эффект**: backdrop-blur на навбаре
