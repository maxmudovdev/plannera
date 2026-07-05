// ============================================================
//  АВТОМАТИЧЕСКАЯ ГАЛЕРЕЯ
//  Vite сам находит все файлы в src/assets/projects/**.
//  Добавь фото в папку категории — и оно появится на сайте:
//    • при разработке (npm run dev) — мгновенно;
//    • на GitHub Pages — после push (Action пересоберёт сайт).
//  Категория = имя папки. Имя файла = подпись (pool-villa.jpg → "Pool Villa").
//  Файл с суффиксом  -thumb  используется как превью для одноимённого фото.
//  Видео .mp4 / .webm тоже поддерживаются (папка animations).
// ============================================================

const modules = import.meta.glob(
  '../assets/projects/**/*.{jpg,jpeg,png,webp,avif,mp4,webm}',
  { eager: true, import: 'default' }
);

const isVideo = (f) => /\.(mp4|webm)$/i.test(f);
const isThumb = (f) => /-thumb\.[^.]+$/i.test(f);
const titleFrom = (f) =>
  f.replace(/\.[^.]+$/, '')
   .replace(/-thumb$/i, '')
   .replace(/[-_]+/g, ' ')
   .replace(/\b\w/g, (c) => c.toUpperCase());

const entries = Object.entries(modules).map(([path, url]) => {
  const parts = path.split('/');
  return { path, url, file: parts[parts.length - 1], category: parts[parts.length - 2] };
});

// map:  оригинальный путь -> url превью
const thumbs = new Map(
  entries
    .filter((e) => isThumb(e.file))
    .map((e) => [e.path.replace(/-thumb(\.[^.]+)$/i, '$1'), e.url])
);

export const projects = entries
  .filter((e) => !isThumb(e.file))
  .map((e) => ({
    id: e.path,
    src: e.url,
    thumb: thumbs.get(e.path) || e.url,
    category: e.category,
    title: titleFrom(e.file),
    type: isVideo(e.file) ? 'video' : 'image',
  }))
  .sort(
    (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
  );

// категории в фиксированном порядке, но только те, где есть файлы
const ORDER = ['interior', 'exterior', 'animations'];
export const categories = [
  ...ORDER.filter((c) => projects.some((p) => p.category === c)),
  ...[...new Set(projects.map((p) => p.category))].filter((c) => !ORDER.includes(c)),
];

// картинки для ленты в hero: сначала интерьер, потом остальное
export const heroStrip = [...projects]
  .filter((p) => p.type === 'image')
  .sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category))
  .slice(0, 5);
