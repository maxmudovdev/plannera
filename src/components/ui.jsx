import { useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence, useScroll, useSpring,
  useMotionValue, useTransform, useInView, animate,
} from 'framer-motion';
import { useApp } from '../context/AppContext';

export const EASE = [0.22, 0.61, 0.36, 1];
export const EASE_EXPO = [0.76, 0, 0.24, 1];

/* ---------------- Logo ---------------- */
export function LogoMark({ className, animated = false }) {
  const Rect = animated ? motion.rect : 'rect';
  const Path = animated ? motion.path : 'path';
  const draw = animated
    ? {
        initial: { pathLength: 0, opacity: 0.4 },
        animate: { pathLength: 1, opacity: 1 },
      }
    : {};
  return (
    <svg viewBox="0 0 90 90" fill="none" className={className} aria-hidden="true">
      <Rect x="6" y="6" width="78" height="78" rx="7"
        stroke="currentColor" strokeWidth="6" {...draw}
        {...(animated && { transition: { duration: 1, ease: 'easeInOut' } })} />
      <Path d="M16 78 L52 34 H62 Q70 34 70 45 Q70 56 62 56 H52 M52 34 V78"
        stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" {...draw}
        {...(animated && { transition: { duration: 1.1, delay: 0.25, ease: 'easeInOut' } })} />
    </svg>
  );
}

/* ---------------- Icons ---------------- */
const I = (d, extra = null) => (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d={d} />{extra}
  </svg>
);
export const IcMoon = I('M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z');
export const IcSun = I('M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8', <circle cx="12" cy="12" r="4.2" />);
export const IcGlobe = I('M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z', <circle cx="12" cy="12" r="9" />);
export const IcChevron = I('m6 9 6 6 6-6');
export const IcArrow = I('M5 12h14M13 6l6 6-6 6');
export const IcArrowUpRight = I('M7 17 17 7M8 7h9v9');
export const IcClose = I('M6 6l12 12M18 6 6 18');
export const IcPrev = I('M15 6l-6 6 6 6');
export const IcNext = I('m9 6 6 6-6 6');
export const IcUp = I('M12 19V5M6 11l6-6 6 6');
export const IcZoom = I('m20 20-3.5-3.5M11 8v6M8 11h6', <circle cx="11" cy="11" r="7" />);
export const IcMail = I('m4 7 8 6 8-6', <rect x="3" y="5" width="18" height="14" rx="2.5" />);
export const IcInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
export const IcWhatsapp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2s-.7 1-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.8L7 20.5A10 10 0 1 0 12 2z" />
  </svg>
);
export const IcTelegram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.9 4.3 18.7 19.5c-.2 1-.9 1.3-1.7.8l-4.7-3.4-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.7 13 2 11.5c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.3 1.6z" />
  </svg>
);
export const IcBehance = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.5 8.3c.7 0 1.3.1 1.8.3.5.2.9.4 1.2.8.3.3.5.7.7 1.1.1.4.2.9.2 1.4 0 .6-.1 1.1-.4 1.5-.3.4-.7.8-1.2 1 .8.2 1.3.6 1.7 1.1.4.5.6 1.2.6 1.9 0 .6-.1 1.2-.4 1.6-.2.5-.6.8-1 1.1-.4.3-.9.5-1.5.6-.5.1-1.1.2-1.6.2H3V8.3h6.5zm-.4 4.4c.5 0 .9-.1 1.2-.3.3-.2.4-.6.4-1s-.1-.7-.2-.9c-.2-.2-.4-.3-.6-.4-.3-.1-.5-.1-.8-.1H5.7v2.7h3.4zm.2 4.7c.3 0 .6 0 .8-.1.3-.1.5-.2.6-.3.2-.1.3-.3.4-.5.1-.2.1-.5.1-.8 0-.6-.2-1-.5-1.3-.3-.2-.8-.4-1.4-.4H5.7v3.4h3.6zM17.6 9.4h4.9v1.2h-4.9V9.4zm5.4 5.9c0-.6-.1-1.2-.3-1.7-.2-.5-.5-1-.9-1.4-.4-.4-.8-.7-1.4-.9-.5-.2-1.1-.3-1.7-.3s-1.2.1-1.7.3c-.5.2-1 .5-1.4 1-.4.4-.7.9-.9 1.5-.2.6-.3 1.2-.3 1.9 0 .7.1 1.3.3 1.9.2.6.5 1 .9 1.4.4.4.9.7 1.4.9.6.2 1.2.3 1.9.3.9 0 1.7-.2 2.4-.6.6-.4 1.1-1.1 1.4-2h-2.1c-.1.2-.3.5-.6.6-.3.2-.6.2-1 .2-.5 0-1-.1-1.3-.4-.3-.3-.5-.8-.5-1.4h5.5c0-.3 0-.6 0-.9zm-5.5-.5c0-.2.1-.4.1-.6.1-.2.2-.3.3-.5.2-.1.3-.2.5-.3.2-.1.4-.1.7-.1.4 0 .8.1 1 .3.2.2.4.6.5 1.1h-3.1z" />
  </svg>
);
export const IcPlay = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8 5v14l11-7z" /></svg>
);

/* ---------------- Preloader ---------------- */
export function Preloader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}>
          <div className="preloader__inner">
            <LogoMark className="preloader__mark" animated />
            <motion.span className="preloader__word"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: EASE }}>
              Plannera
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Scroll progress ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

/* ---------------- Marquee ---------------- */
export function Marquee() {
  const { t } = useApp();
  const words = t('marquee');
  const row = Array.isArray(words) ? words : [];
  const Line = () => (
    <span className="marquee__row" aria-hidden="true">
      {row.map((w, i) => (
        <span key={i} className="marquee__item">
          {w}<span className="marquee__dot">•</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        <Line /><Line />
      </div>
    </div>
  );
}

/* ---------------- Back to top ---------------- */
export function BackToTop() {
  const { t } = useApp();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button className="backtotop" aria-label={t('footer.back')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, ease: EASE }}>
          <IcUp width="20" height="20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Reveal wrapper ---------------- */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}>
      {children}
    </Tag>
  );
}

/* ---------------- Animated counter ---------------- */
export function Counter({ to = 100, suffix = '+', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, duration, mv]);
  return (
    <b ref={ref} className="counter">
      <motion.span>{rounded}</motion.span>{suffix}
    </b>
  );
}
