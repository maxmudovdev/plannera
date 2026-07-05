import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CONFIG } from '../config';
import { projects } from '../data/projects';
import { Reveal, Counter, IcArrow } from './ui';

export default function About() {
  const { t } = useApp();
  const mediaRef = useRef(null);

  const aboutImg =
    projects.find((p) => p.category === 'interior' && p.type === 'image') ||
    projects.find((p) => p.type === 'image');

  // лёгкий параллакс фотографии
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const facts = [
    ['fact.name', CONFIG.name],
    ['fact.dob', CONFIG.birthday],
    ['fact.address', CONFIG.address],
    ['fact.email', <a key="e" href={`mailto:${CONFIG.contactEmail}`}>{CONFIG.contactEmail}</a>],
    ['fact.phone', <a key="p" href={`tel:${CONFIG.phone}`}>{CONFIG.phonePretty}</a>],
  ];

  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <div className="about__grid">
          <div>
            <Reveal><span className="eyebrow">{t('about.eyebrow')}</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="about__hi">{t('about.hi1')}<span>{t('about.hi2')}</span></h2>
            </Reveal>
            <Reveal delay={0.12}><p className="about__quote">{t('about.quote')}</p></Reveal>

            <Reveal delay={0.18} className="facts">
              {facts.map(([k, v]) => (
                <div className="fact" key={k}>
                  <span className="fact__k">{t(k)}</span>
                  <span className="fact__v">{v}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.24} className="about__stat">
              <Counter to={CONFIG.projectsDone} suffix="+" />
              <span>{t('about.statLabel')}</span>
            </Reveal>

            <Reveal delay={0.3}>
              <motion.a href="#contact" className="btn"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                {t('about.cta')}
                <IcArrow width="17" height="17" />
              </motion.a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="about__mediawrap">
            <div className="about__media" ref={mediaRef}>
              {aboutImg && (
                <motion.img src={aboutImg.src} alt="Interior visualization by Plannera"
                  loading="lazy" style={{ y: imgY }} />
              )}
              <span className="word" aria-hidden="true">Interior</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
