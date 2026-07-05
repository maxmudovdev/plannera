import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { LANGS } from '../i18n';
import { LogoMark, IcMoon, IcSun, IcGlobe, IcChevron, EASE, EASE_EXPO } from './ui';

const SECTIONS = ['projects', 'about', 'contact'];

export default function Header() {
  const { t, theme, toggleTheme, lang, setLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState('');
  const langRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const close = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('lock', menuOpen);
  }, [menuOpen]);

  const nav = (
    <>
      {SECTIONS.map((id) => (
        <a key={id} href={`#${id}`}
          className={`nav__link${active === id ? ' active' : ''}`}
          onClick={() => setMenuOpen(false)}>
          {t(`nav.${id}`)}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header__inner">
          <a href="#top" className="brand" aria-label="Plannera — home">
            <LogoMark className="brand__mark" />
            <span className="brand__text">
              <span className="brand__name">Plannera</span>
              <span className="brand__tag">architecture · visualization</span>
            </span>
          </a>

          <nav className="nav" aria-label="Primary">{nav}</nav>

          <div className="tools">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} className="icon-swap"
                  initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.28, ease: EASE }}>
                  {theme === 'dark' ? <IcSun width="19" height="19" /> : <IcMoon width="19" height="19" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className={`lang${langOpen ? ' open' : ''}`} ref={langRef}>
              <button className="lang__btn" onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox" aria-expanded={langOpen} aria-label="Language">
                <IcGlobe width="15" height="15" />
                <span className="lang__label">{lang.toUpperCase()}</span>
                <IcChevron width="13" height="13" className="lang__chev" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul className="lang__menu" role="listbox"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: EASE }}>
                    {LANGS.map((l) => (
                      <li key={l.code}>
                        <button className="lang__opt" role="option"
                          aria-selected={lang === l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}>
                          {l.label}<span className="tick">✓</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button className={`burger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu" aria-expanded={menuOpen}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-nav" aria-label="Mobile"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}>
            <motion.div className="mobile-nav__links"
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}>
              {SECTIONS.map((id) => (
                <motion.div key={id}
                  variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.5, ease: EASE }}>
                  <a href={`#${id}`} onClick={() => setMenuOpen(false)}>{t(`nav.${id}`)}</a>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
