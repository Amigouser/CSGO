export interface Translations {
  nav: {
    home: string;
    tournaments: string;
    live: string;
    leaderboard: string;
    dashboard: string;
    achievements: string;
    predictions: string;
    roll: string;
    hallOfFame: string;
    meta: string;
    balance: string;
    login: string;
    profile: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    titleGame: string;
    subtitle: string;
    viewTournaments: string;
    loginSteam: string;
  };
  stats: {
    tournaments: string;
    active: string;
    players: string;
    matches: string;
  };
  hallOfFame: {
    title: string;
    description: string;
    view: string;
  };
  tournaments: {
    title: string;
    viewAll: string;
    create: string;
    registration: string;
    active: string;
    upcoming: string;
    completed: string;
    participants: string;
    format: string;
    prizePool: string;
    date: string;
    register: string;
    info: string;
    bracket: string;
    noTournaments: string;
  };
  howToStart: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step1Link: string;
    step2Title: string;
    step2Desc: string;
    step2Link: string;
    step3Title: string;
    step3Desc: string;
    step3Link: string;
    step4Title: string;
    step4Desc: string;
    step4Link: string;
  };
  formats: {
    title: string;
    doubleElim: string;
    doubleElimDesc: string;
    singleElim: string;
    singleElimDesc: string;
    swiss: string;
    swissDesc: string;
    groups: string;
    groupsDesc: string;
  };
  tip: {
    title: string;
    text: string;
  };
  leaderboard: {
    title: string;
    search: string;
    place: string;
    player: string;
    rank: string;
    winrate: string;
  };
  dashboard: {
    title: string;
    totalTournaments: string;
    activePlayers: string;
    matchesPlayed: string;
    avgMmr: string;
    recentMatches: string;
    topHeroes: string;
    picks: string;
  };
  achievements: {
    title: string;
    unlocked: string;
    all: string;
    tournament: string;
    skill: string;
    social: string;
    special: string;
  };
  predictions: {
    title: string;
    subtitle: string;
    votes: string;
    yourChoice: string;
  };
  live: {
    title: string;
    liveNow: string;
    upcoming: string;
    noMatches: string;
  };
  roll: {
    title: string;
    roll: string;
    rolling: string;
    history: string;
  };
  login: {
    title: string;
    description: string;
    tournaments: string;
    tournamentsDesc: string;
    rating: string;
    ratingDesc: string;
    teams: string;
    teamsDesc: string;
    statistics: string;
    statisticsDesc: string;
  };
  profile: {
    mmr: string;
    wl: string;
    winrate: string;
    tournaments: string;
    matches: string;
    wins: string;
    onPlatform: string;
    days: string;
    recentMatches: string;
    victory: string;
    defeat: string;
  };
  notifications: {
    title: string;
    readAll: string;
    empty: string;
  };
  footer: {
    platform: string;
    navigation: string;
    information: string;
    copyright: string;
  };
  common: {
    back: string;
    loading: string;
    error: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    noData: string;
  };
}

export const ru: Translations = {
  nav: {
    home: "Главная",
    tournaments: "Турниры",
    live: "Live",
    leaderboard: "Рейтинг",
    dashboard: "Дашборд",
    achievements: "Достижения",
    predictions: "Предсказания",
    roll: "Ролл",
    hallOfFame: "Зал Славы",
    meta: "Мета",
    balance: "Баланс",
    login: "Войти",
    profile: "Профиль",
  },
  hero: {
    badge: "TomskGG — турниры по CS2",
    title1: "Организуй",
    titleHighlight: "эпические",
    title2: "турниры по",
    titleGame: "CS2",
    subtitle: "Киберспортивные турниры по CS2 в Томске: регистрация через Steam, турнирная сетка, глобальный рейтинг и полная статистика",
    viewTournaments: "Смотреть турниры",
    loginSteam: "Войти через Steam",
  },
  stats: {
    tournaments: "Турниров",
    active: "Активных",
    players: "Игроков",
    matches: "Матчей",
  },
  hallOfFame: {
    title: "Зал Славы",
    description: "Чемпионы всех турниров, рекорды сообщества и лучшие игроки платформы",
    view: "Смотреть →",
  },
  tournaments: {
    title: "Все турниры",
    viewAll: "Смотреть все →",
    create: "Создать турнир",
    registration: "Регистрация",
    active: "Активный",
    upcoming: "Скоро",
    completed: "Завершён",
    participants: "Участники",
    format: "Формат",
    prizePool: "Призовой фонд",
    date: "Дата",
    register: "Зарегистрироваться",
    info: "Информация",
    bracket: "Сетка",
    noTournaments: "Турниры не найдены",
  },
  howToStart: {
    title: "Как начать за 4 шага",
    step1Title: "Войди через Steam",
    step1Desc: "Авторизуйся — MMR подтянется автоматически",
    step1Link: "Войти",
    step2Title: "Найди турнир",
    step2Desc: "Выбери формат: Single, Double Elim, Swiss или Groups",
    step2Link: "Смотреть",
    step3Title: "Зарегистрируйся",
    step3Desc: "Запишись на турнир и жди начала драфта",
    step3Link: "Записаться",
    step4Title: "Играй и побеждай",
    step4Desc: "Результаты, статистика и рейтинг — всё здесь",
    step4Link: "Рейтинг",
  },
  formats: {
    title: "Форматы турниров",
    doubleElim: "Double Elimination",
    doubleElimDesc: "Классический формат. Проигравший попадает в нижнюю сетку — второй шанс есть у каждого.",
    singleElim: "Single Elimination",
    singleElimDesc: "Быстро и решительно. Одно поражение — и ты вне игры. Идеально для однодневных турниров.",
    swiss: "Swiss System",
    swissDesc: "Каждый играет с соперником своего уровня. Матчи идут раунд за раундом, пока не выявится лидер.",
    groups: "Groups + Playoffs",
    groupsDesc: "Групповой этап + плейофф. Как на настоящих турнирах: сначала отбор, потом борьба на выбывание.",
  },
  tip: {
    title: "Совет",
    text: "Подключи Steam-аккаунт — тогда статистика матчей CS2 (убийства, смерти, ADR) появится автоматически",
  },
  leaderboard: {
    title: "Рейтинг игроков",
    search: "Поиск игрока...",
    place: "Место",
    player: "Игрок",
    rank: "Ранг",
    winrate: "Винрейт",
  },
  dashboard: {
    title: "Дашборд",
    totalTournaments: "Всего турниров",
    activePlayers: "Активных игроков",
    matchesPlayed: "Матчей сыграно",
    avgMmr: "Средний MMR",
    recentMatches: "Последние матчи",
    topHeroes: "Топ оружие",
    picks: "убийств",
  },
  achievements: {
    title: "Достижения",
    unlocked: "Разблокировано",
    all: "Все",
    tournament: "Турниры",
    skill: "Мастерство",
    social: "Социальные",
    special: "Особые",
  },
  predictions: {
    title: "Предсказания",
    subtitle: "Угадай победителя и заработай очки предсказателя",
    votes: "голосов",
    yourChoice: "Ваш выбор ✓",
  },
  live: {
    title: "Live матчи",
    liveNow: "Идут сейчас",
    upcoming: "Скоро начнутся",
    noMatches: "Нет активных матчей",
  },
  roll: {
    title: "Ролл оружия",
    roll: "Ролл!",
    rolling: "Ролл...",
    history: "История",
  },
  login: {
    title: "Войти через Steam",
    description: "Авторизуйся для участия в турнирах и отслеживания статистики",
    tournaments: "Турниры",
    tournamentsDesc: "Участвуй в турнирах по CS2",
    rating: "Рейтинг",
    ratingDesc: "Соревнуйся и поднимайся в рейтинге",
    teams: "Команды",
    teamsDesc: "Находи тиммейтов и создавай команды",
    statistics: "Статистика",
    statisticsDesc: "Отслеживай свою статистику",
  },
  profile: {
    mmr: "MMR",
    wl: "W/L",
    winrate: "Винрейт",
    tournaments: "Турниров",
    matches: "Матчей",
    wins: "Побед",
    onPlatform: "На платформе",
    days: "дн.",
    recentMatches: "Последние матчи",
    victory: "Победа",
    defeat: "Поражение",
  },
  notifications: {
    title: "Уведомления",
    readAll: "Прочитать все",
    empty: "Нет уведомлений",
  },
  footer: {
    platform: "Киберспортивная платформа Томска",
    navigation: "Навигация",
    information: "Информация",
    copyright: "© {year} TomskGG — Киберспорт Томск",
  },
  common: {
    back: "Назад",
    loading: "Загрузка...",
    error: "Ошибка",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    create: "Создать",
    search: "Поиск...",
    noData: "Нет данных",
  },
};
