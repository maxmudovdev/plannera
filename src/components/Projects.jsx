import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { projects, categories } from '../data/projects';
import { Reveal, IcZoom, IcPlay, IcClose, IcPrev, IcNext, EASE } from './ui';

export default function Projects() {
  const { t } = useApp();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null); // index | null
  const [dir, setDir] = useState(0);

  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const filters = ['all', ...categories];

  const open = (i) => { setDir(0); setLightbox(i); };
  const close = () => setLightbox(null);
  const step = useCallback((d) => {
    setDir(d);
    setLightbox((i) => (i === null ? null : (i + d + list.length) % list.length));
  }, [list.length]);

  useEffect(() => {
    document.body.classList.toggle('lock', lightbox !== null);
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, step]);

  const current = lightbox !== null ? list[lightbox] : null;

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section__head">
          <Reveal>
            <span className="eyebrow">{t('projects.eyebrow')}</span>
            <h2 className="section__title">{t('projects.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section__lead">{t('projects.lead')}</p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal className="filters" delay={0.15} y={16}>
          {filters.map((c) => {
            const n = c === 'all' ? projects.length : projects.filter((p) => p.category === c).length;
            const isActive = filter === c;
            return (
              <button key={c} className={`filter${isActive ? ' active' : ''}`}
                onClick={() => setFilter(c)}>
                {isActive && (
                  <motion.span className="filter__pill" layoutId="filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="filter__label">
                  {t(c === 'all' ? 'filter.all' : `filter.${c}`)}
                  <span className="count">{n}</span>
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* gallery */}
        <motion.div className="gallery" key={filter}
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
          {list.map((p, i) => (
            <motion.figure key={p.id} className="card"
              variants={{
                hidden: { opacity: 0, y: 28, scale: 0.985 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={() => open(i)}>
              {p.type === 'video'
                ? <video src={p.src} muted loop playsInline preload="metadata"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => e.currentTarget.pause()} />
                : <img src={p.thumb} alt={p.title} loading="lazy" decoding="async" />}
              {p.type === 'video' && (
                <span className="card__badge"><IcPlay width="12" height="12" />{t(`filter.${p.category}`)}</span>
              )}
              <span className="card__zoom"><IcZoom width="17" height="17" /></span>
              <figcaption className="card__overlay">
                <span className="card__cat">{t(`filter.${p.category}`)}</span>
                <span className="card__title">{p.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div className="lightbox" role="dialog" aria-modal="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}>

            <button className="lb-btn lb-close" onClick={close} aria-label="Close">
              <IcClose width="21" height="21" />
            </button>
            <button className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Previous">
              <IcPrev width="21" height="21" />
            </button>
            <button className="lb-btn lb-next" onClick={() => step(1)} aria-label="Next">
              <IcNext width="21" height="21" />
            </button>

            <div className="lightbox__stage">
              <AnimatePresence mode="popLayout" custom={dir}>
                <motion.div className="lightbox__media" key={current.id}
                  custom={dir}
                  variants={{
                    enter: (d) => ({ x: d > 0 ? 90 : d < 0 ? -90 : 0, opacity: 0, scale: 0.97 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d) => ({ x: d > 0 ? -90 : d < 0 ? 90 : 0, opacity: 0, scale: 0.97 }),
                  }}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.42, ease: EASE }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -70) step(1);
                    else if (info.offset.x > 70) step(-1);
                  }}>
                  {current.type === 'video'
                    ? <video src={current.src} controls autoPlay loop playsInline />
                    : <img src={current.src} alt={current.title} draggable="false" />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lightbox__cap">
              <b>{current.title}</b> · {t(`filter.${current.category}`)}
              <span className="lightbox__count">{lightbox + 1} / {list.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
