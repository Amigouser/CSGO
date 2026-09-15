# ZamesGG — Киберспортивная платформа Zamesа

## Краткое описание
Клон сайта dotaint.kg — платформа для турниров по Dota 2 и CS2. Перенесено на Zames вместо Кыргызстана. Название: **ZamesGG**.

## Стек технологий
- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **Prisma v6** + SQLite (база данных)
- **NextAuth.js v5** (Steam OpenID)
- **TypeScript**
- **Lucide React** (иконки)

## Как запустить
```bash
cd D:\CSGO\intkg-clone
npm run dev
# Откроется на http://localhost:3000
```

## Структура проекта
```
D:\CSGO\intkg-clone\
├── prisma/
│   ├── schema.prisma      # Схема БД (User, Tournament, Match, etc.)
│   ├── seed.ts            # Тестовые данные
│   └── dev.db             # SQLite база
├── public/
│   └── manifest.json      # PWA манифест
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (метаданные, SEO, провайдеры)
│   │   ├── page.tsx             # Главная страница
│   │   ├── globals.css          # CSS переменные, анимации
│   │   ├── tournaments/
│   │   │   ├── page.tsx         # Список турниров
│   │   │   └── [id]/page.tsx    # Детали турнира
│   │   ├── leaderboard/page.tsx # Рейтинг игроков
│   │   ├── dashboard/page.tsx   # Дашборд статистики
│   │   ├── achievements/page.tsx# Система достижений
│   │   ├── predictions/page.tsx # Предсказания матчей
│   │   ├── live/page.tsx        # Live матчи
│   │   ├── roll/page.tsx        # Ролл героя
│   │   ├── hall-of-fame/page.tsx# Зал славы
│   │   ├── meta/page.tsx        # Мета-статистика
│   │   ├── balance/page.tsx     # Баланс патчей
│   │   ├── login/page.tsx       # Вход через Steam
│   │   ├── profile/[id]/page.tsx# Профиль игрока
│   │   └── api/                 # API routes
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── tournaments/     # CRUD турниров
│   │       ├── players/         # Рейтинг игроков
│   │       ├── matches/         # Матчи
│   │       └── stats/           # Статистика
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Навигация (с i18n, уведомлениями, темой, языком)
│   │   │   ├── Footer.tsx       # Подвал
│   │   │   └── BottomNav.tsx    # Мобильная навигация снизу
│   │   ├── ui/
│   │   │   ├── ThemeToggle.tsx      # Переключатель темы
│   │   │   ├── LanguageSwitcher.tsx # Переключатель языка (RU/KG/EN)
│   │   │   ├── NotificationCenter.tsx # Панель уведомлений
│   │   │   ├── AnimatedCounter.tsx    # Анимированные счётчики
│   │   │   ├── AchievementCard.tsx    # Карточка достижения
│   │   │   └── ParticleCanvas.tsx     # Canvas частицы для Hero
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Hero с частицами и анимациями
│   │   │   ├── StatsGrid.tsx         # Статистика с анимированными числами
│   │   │   ├── LiveActivityFeed.tsx  # Живая лента активности
│   │   │   ├── HallOfFameBanner.tsx  # Баннер зала славы
│   │   │   ├── TournamentsPreview.tsx# Превью турниров
│   │   │   ├── HowToStart.tsx        # 4 шага
│   │   │   ├── TournamentFormats.tsx # Форматы турниров
│   │   │   └── TipBox.tsx            # Совет
│   │   └── tournament/
│   │       ├── TournamentCard.tsx    # Карточка турнира
│   │       └── TournamentBracket.tsx # SVG турнирная сетка
│   ├── lib/
│   │   ├── prisma.ts         # Prisma клиент
│   │   ├── auth.ts           # NextAuth конфиг (Steam)
│   │   ├── steam.ts          # Steam API хелперы
│   │   ├── bracket.ts        # Генерация турнирных сеток
│   │   ├── ranking.ts        # ELO рейтинг
│   │   ├── achievements.ts   # Система достижений (15 достижений)
│   │   ├── constants.ts      # Константы
│   │   └── i18n/
│   │       ├── index.tsx     # I18n провайдер и хук useI18n
│   │       └── locales/
│   │           ├── ru.ts     # Русский (основной) + тип Translations
│   │           ├── kg.ts     # Кыргызский
│   │           └── en.ts     # Английский
│   ├── hooks/
│   │   └── useTheme.ts       # Хук темы
│   └── types/
│       └── index.ts          # TypeScript типы
└── .env                      # Переменные окружения
```

## Что УЖЕ реализовано (19 страниц)

### Страницы:
1. **Главная** (`/`) — Hero с canvas-чацами, анимированные счётчики, живая лента активности, превью турниров, форматы, совет
2. **Турниры** (`/tournaments`) — список с фильтрами (игра, статус)
3. **Детали турнира** (`/tournaments/[id]`) — информация, участники, вкладки
4. **Live матчи** (`/live`) —实时 матчи с анимацией
5. **Рейтинг** (`/leaderboard`) — таблица игроков с поиском
6. **Дашборд** (`/dashboard`) — статистика платформы
7. **Достижения** (`/achievements`) — 15 достижений с прогресс-барами
8. **Предсказания** (`/predictions`) — голосование за победителей
9. **Ролл** (`/roll`) — рандомный выбор героя с анимацией
10. **Зал Славы** (`/hall-of-fame`) — чемпионы и рекорды
11. **Мета** (`/meta`) — статистика героев с трендами
12. **Баланс** (`/balance`) — изменения в патчах
13. **Логин** (`/login`) — Steam авторизация
14. **Профиль** (`/profile/[id]`) — статистика игрока

### API Routes (7):
- `/api/auth/[...nextauth]` — Steam авторизация
- `/api/tournaments` — CRUD турниров
- `/api/tournaments/[id]` — конкретный турнир
- `/api/tournaments/[id]/register` — регистрация
- `/api/tournaments/[id]/bracket` — генерация сетки
- `/api/players` — рейтинг
- `/api/matches` — матчи
- `/api/stats` — общая статистика

### Фичи:
- ✅ Dark/Light тема (переключатель в навбаре)
- ✅ Мультиязычность RU/KG/EN (переключатель-глобус в навбаре)
- ✅ PWA манифест (можно установить как приложение)
- ✅ Canvas частицы на Hero
- ✅ Анимированные счётчики статистики
- ✅ SVG турнирная сетка (TournamentBracket)
- ✅ Система достижений (15 штук с прогрессом)
- ✅ Живая лента активности
- ✅ Панель уведомлений (колокольчик)
- ✅ Bottom nav для мобильных
- ✅ ELO рейтинг система
- ✅ Генерация турнирных сеток (Single/Double Elim, Swiss)
- ✅ SEO метаданные, Open Graph, schema.org
- ✅ Адаптивный дизайн (мобильные + десктоп)

## Что НУЖНО сделать дальше

### Приоритет 1 — Доработка существующих страниц:
1. **Перевести все страницы на i18n** — сейчас только Hero, Navbar и Footer используют `useI18n()`. Остальные страницы (tournaments, leaderboard, dashboard, achievements, predictions, live, roll, hall-of-fame, meta, balance, login, profile) всё ещё на русском хардкоде. Нужно обернуть текст в `t.xxx.yyy`.
2. **Сделать API страницы динамическими** — сейчас tournaments, leaderboard и др. используют моковые данные. Нужно подключить реальные API вызовы через `fetch('/api/...')`.
3. **Доработать Steam авторизацию** — в `.env` нужен реальный `STEAM_API_KEY`. Также нужно протестировать весь flow.

### Приоритет 2 — Новые фичи:
4. **Админ-панель** (`/admin`) — CRUD турниров через UI, управление пользователями, модерация матчей.
5. **Чат в турнире** — WebSocket чат между участниками.
6. **Discord интеграция** — вебхук уведомлений.
7. **AI рекомендации героев** — на основе мета-данных.

### Приоритет 3 — Техническое:
8. **Заменить SQLite на PostgreSQL** для продакшена.
9. **Добавить Redis кеш** для API.
10. **ISR** для страниц турниров.
11. **Тесты** (Jest + React Testing Library).

## Дизайн-система (CSS переменные)

```css
/* Dark тема */
--background: #0d1117;
--foreground: #e6edf3;
--gold: #c89b3c;
--gold-light: #f0c060;
--red: #e5534b;
--surface: #161b22;
--surface-2: #21262d;
--border: #30363d;
--hover-bg: rgba(200,155,60,0.05);
--text-sub: #8b949e;

/* Light тема */
--background: #ffffff;
--foreground: #1a1a2e;
--gold: #b8860b;
--gold-light: #daa520;
--red: #dc3545;
--surface: #f6f8fa;
--surface-2: #eaeef2;
--border: #d0d7de;
--hover-bg: rgba(184,134,11,0.05);
--text-sub: #656d76;
```

## Кастомные CSS классы:
- `.fade-in-up` — анимация появления снизу
- `.glow-gold` — золотое свечение
- `.dota-card` — карточка с hover эффектом
- `.skeleton` — загрузка-скелетон
- `.hint-box` — подсказка
- `.safe-top` / `.safe-bottom` — safe area для мобильных

## Как добавить перевод на новую страницу

```tsx
"use client";
import { useI18n } from "@/lib/i18n";

export default function MyPage() {
  const { t } = useI18n();
  
  return (
    <div>
      <h1>{t.achievements.title}</h1>
      <p>{t.achievements.unlocked}</p>
    </div>
  );
}
```

Если нужного ключа нет в `Translations` — добавь его в `src/lib/i18n/locales/ru.ts` (интерфейс + значение), затем в `kg.ts` и `en.ts`.

## Переменные окружения (.env)

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="intkg-clone-secret-change-in-production"
STEAM_API_KEY=""  # Получить на https://steamcommunity.com/dev/apikey
```

## Известные проблемы
- Все страницы кроме Hero/Navbar/Footer не используют i18n (хардкод на русском)
- Турниры, лидерборд и др. используют моковые данные, а не реальные API
- Steam авторизация не протестирована (нет API ключа)
- Нет favicon и иконок для PWA (лежат в public/ но не созданы)

## Контекст для AI
Это киберспортивная платформа для города Zames (Россия). Пользователи регистрируются через Steam, участвуют в турнирах по Dota 2 и CS2, получают рейтинг (ELO), достижения, могут предсказывать результаты матчей. Сайт адаптивный, с тёмной/светлой темой, тремя языками, PWA-поддержкой.
