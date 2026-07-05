# Plannera — React edition

Сайт-портфолио на **React 18 + Vite 5 + Framer Motion**.
Тёмная/светлая тема · EN / RU / UZ · автогалерея · анимации · адаптив.

---

## 📸 Как добавить новую работу (самое главное)

Просто положи файл в папку нужной категории:

```
src/assets/projects/
├── interior/     ← интерьеры
├── exterior/     ← экстерьеры
└── animations/   ← видео .mp4 / .webm и картинки
```

**И всё.** Дальше автоматически:

- **Локально** (`npm run dev`) — фото появляется на сайте мгновенно, даже без перезагрузки страницы.
- **На GitHub Pages** — делаешь commit + push (или загружаешь файл через кнопку *Add file → Upload files* прямо на сайте GitHub) → GitHub Action сам пересоберёт и опубликует сайт за ~1–2 минуты.

Правила имён:
- Имя файла = подпись: `pool-villa.jpg` → «Pool Villa».
- Новая папка внутри `projects/` = новая категория, фильтр появится сам.
- *(необязательно)* Файл `имя-thumb.jpg` — лёгкое превью для одноимённого `имя.jpg`: превью показывается в галерее, оригинал открывается в лайтбоксе. Если превью нет — используется оригинал.
- Форматы: jpg, jpeg, png, webp, avif, mp4, webm.

---

## 🚀 Запуск локально

Нужен [Node.js](https://nodejs.org) 18+.

```bash
npm install     # один раз
npm run dev     # сайт на http://localhost:5173
npm run build   # продакшен-сборка в dist/
```

---

## ⚙️ Настройки — один файл: `src/config.js`

- `formspreeId` — **включи форму обратной связи**: зарегистрируйся на [formspree.io](https://formspree.io) (бесплатно, 50 сообщений/мес на почту), создай форму, вставь её ID сюда. Пока пусто — кнопка открывает почтовый клиент посетителя.
- почта, телефон, Telegram, Instagram, Behance, счётчик проектов.

Тексты и переводы — `src/i18n.js`.

---

## 🌍 Публикация на GitHub Pages + домен plannera.uz

1. Создай репозиторий на GitHub и залей туда весь проект (вместе с папкой `.github` и файлом `package-lock.json`).
2. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Это важно — сборку делает workflow из `.github/workflows/deploy.yml`.
3. Всё. Каждый push в ветку `main` автоматически собирает и публикует сайт.

**Домен plannera.uz:**
1. Settings → Pages → Custom domain → введи `plannera.uz` (файл `public/CNAME` уже лежит в проекте).
2. У регистратора домена добавь DNS-записи:
   - 4 записи **A** для `plannera.uz` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - запись **CNAME** для `www` → `твой-логин.github.io`
3. Когда DNS обновится (до 24 ч), включи галочку **Enforce HTTPS**.

> Если сайт будет жить на `логин.github.io/имя-репозитория` **без** домена — поменяй `base` в `vite.config.js` на `'/имя-репозитория/'`.

---

## 🗂 Структура

```
├── .github/workflows/deploy.yml   # автосборка и деплой на Pages
├── public/                        # CNAME, favicon
├── src/
│   ├── assets/projects/           # ⇦ ФОТО СЮДА
│   ├── components/                # Header, Hero, Projects, About, Contact, Footer, ui
│   ├── context/AppContext.jsx     # тема + язык
│   ├── data/projects.js           # автогалерея (import.meta.glob)
│   ├── config.js                  # ⇦ ЛИЧНЫЕ НАСТРОЙКИ
│   ├── i18n.js                    # переводы EN/RU/UZ
│   └── index.css                  # стили и темы
└── vite.config.js
```

© Plannera · Akobir Azizov
"# plannera" 
