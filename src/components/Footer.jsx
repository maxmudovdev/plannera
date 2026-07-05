import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CONFIG } from '../config';
import { LogoMark, IcBehance, IcInstagram, IcWhatsapp, IcTelegram } from './ui';

export default function Footer() {
  const { t } = useApp();
  const socials = [
    { Icon: IcBehance, href: CONFIG.behance, label: 'Behance' },
    { Icon: IcInstagram, href: `https://instagram.com/${CONFIG.instagram}`, label: 'Instagram' },
    { Icon: IcWhatsapp, href: `https://wa.me/${CONFIG.phone.replace(/\D/g, '')}`, label: 'WhatsApp' },
    { Icon: IcTelegram, href: `https://t.me/${CONFIG.telegram}`, label: 'Telegram' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <LogoMark className="brand__mark" />
            <span className="brand__text">
              <span className="brand__name">Plannera</span>
              <span className="brand__tag">{t('footer.tagline')}</span>
            </span>
          </div>
          <div className="socials">
            {socials.map(({ Icon, href, label }) => (
              <motion.a key={label} className="social" href={href}
                target="_blank" rel="noopener" aria-label={label}
                whileHover={{ y: -4 }} whileTap={{ scale: 0.92 }}>
                <Icon width="18" height="18" />
              </motion.a>
            ))}
          </div>
        </div>
        <div className="footer__copy">
          <span>© {new Date().getFullYear()} Plannera. {t('footer.rights')}</span>
          <a href="#top">{t('footer.back')}</a>
        </div>
      </div>
    </footer>
  );
}
