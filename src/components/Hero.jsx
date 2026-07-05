import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { heroStrip } from '../data/projects';
import { EASE, EASE_EXPO } from './ui';

export default function Hero({ ready }) {
  const { t } = useApp();
  const ref = useRef(null);

  // параллакс: водяной знак уплывает медленнее контента
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const wmY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const wmOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const stripY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const letters = 'Plannera'.split('');

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__stage">
        <motion.h1 className="hero__watermark" style={{ y: wmY, opacity: wmOpacity }} aria-label="Plannera">
          {letters.map((c, i) => (
            <span className="hero__letterbox" key={i} aria-hidden="true">
              <motion.span className="hero__letter"
                initial={{ y: '112%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.055, duration: 0.9, ease: EASE_EXPO }}>
                {c}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p className="hero__tagline"
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.7, ease: EASE }}>
          {t('hero.tag1')} <b>{t('hero.tag2')}</b>
        </motion.p>

        <motion.div className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.6 }}>
          <span>{t('hero.scroll')}</span><span className="line" />
        </motion.div>
      </div>

      <motion.div className="hero__strip" style={{ y: stripY }}>
        {heroStrip.map((p, i) => (
          <motion.figure key={p.id}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}}
            transition={{ delay: 0.35 + i * 0.1, duration: 0.95, ease: EASE_EXPO }}>
            <motion.img src={p.thumb} alt={p.title}
              initial={{ scale: 1.18 }}
              animate={ready ? { scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.1, duration: 1.2, ease: EASE_EXPO }} />
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
