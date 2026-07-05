import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CONFIG } from '../config';
import {
  Reveal, IcArrow, IcArrowUpRight, IcWhatsapp, IcTelegram, IcInstagram, IcMail,
} from './ui';

export default function Contact() {
  const { t } = useApp();
  const [status, setStatus] = useState(null); // 'ok' | 'err' | 'sending' | null

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (CONFIG.formspreeId) {
      setStatus('sending');
      try {
        const r = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        if (!r.ok) throw new Error();
        setStatus('ok');
        form.reset();
      } catch {
        setStatus('err');
      }
    } else {
      const subj = encodeURIComponent(`Plannera — ${data.get('name') || ''}`);
      const body = encodeURIComponent(
        `${data.get('message') || ''}\n\n— ${data.get('name') || ''} (${data.get('email') || ''})`
      );
      window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subj}&body=${body}`;
      setStatus('ok');
    }
  }

  const channels = [
    { Icon: IcWhatsapp, k: 'ch.whatsapp', v: CONFIG.phonePretty, href: `https://wa.me/${CONFIG.phone.replace(/\D/g, '')}` },
    { Icon: IcTelegram, k: 'ch.telegram', v: `@${CONFIG.telegram}`, href: `https://t.me/${CONFIG.telegram}` },
    { Icon: IcInstagram, k: 'ch.instagram', v: `@${CONFIG.instagram}`, href: `https://instagram.com/${CONFIG.instagram}` },
    { Icon: IcMail, k: 'ch.email', v: CONFIG.contactEmail, href: `mailto:${CONFIG.contactEmail}` },
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__head">
          <Reveal>
            <span className="eyebrow">{t('contact.eyebrow')}</span>
            <h2 className="section__title">{t('contact.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="section__lead">{t('contact.lead')}</p></Reveal>
        </div>

        <div className="contact__grid">
          <Reveal as="form" className="form" delay={0.05}>
            <form onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="cf-name">{t('form.name')}</label>
                <input id="cf-name" name="name" type="text" required placeholder={t('form.namePh')} />
              </div>
              <div className="field">
                <label htmlFor="cf-email">{t('form.email')}</label>
                <input id="cf-email" name="email" type="email" required placeholder={t('form.emailPh')} />
              </div>
              <div className="field">
                <label htmlFor="cf-msg">{t('form.message')}</label>
                <textarea id="cf-msg" name="message" required placeholder={t('form.messagePh')} />
              </div>
              <motion.button className="btn" type="submit" disabled={status === 'sending'}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                {status === 'sending' ? t('form.sending') : t('form.send')}
                <IcArrow width="17" height="17" />
              </motion.button>
              <p className="form__note">{t('form.note')}</p>
              <p className={`form__status${status === 'ok' ? ' ok' : status === 'err' ? ' err' : ''}`}
                role="status" aria-live="polite">
                {status === 'ok' ? t('form.ok') : status === 'err' ? t('form.err') : ''}
              </p>
            </form>
          </Reveal>

          <Reveal className="channels" delay={0.14}>
            {channels.map(({ Icon, k, v, href }) => (
              <motion.a key={k} className="channel" href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                whileHover={{ x: 5 }} transition={{ duration: 0.25 }}>
                <span className="channel__ic"><Icon width="21" height="21" /></span>
                <span>
                  <span className="channel__k">{t(k)}</span><br />
                  <span className="channel__v">{v}</span>
                </span>
                <span className="channel__go"><IcArrowUpRight width="18" height="18" /></span>
              </motion.a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
