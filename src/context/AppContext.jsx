import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { I18N } from '../i18n';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* noop */ } };

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = safeGet('plannera-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [lang, setLang] = useState(() => {
    const saved = safeGet('plannera-lang');
    if (saved && I18N[saved]) return saved;
    const nav = (navigator.language || 'en').slice(0, 2);
    return I18N[nav] ? nav : 'en';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    safeSet('plannera-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = I18N[lang]['meta.title'];
    safeSet('plannera-lang', lang);
  }, [lang]);

  const t = useCallback((key) => I18N[lang][key] ?? I18N.en[key] ?? key, [lang]);
  const toggleTheme = useCallback(() => setTheme((v) => (v === 'dark' ? 'light' : 'dark')), []);

  return (
    <Ctx.Provider value={{ theme, toggleTheme, lang, setLang, t }}>
      {children}
    </Ctx.Provider>
  );
}
