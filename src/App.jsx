import { useEffect, useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Preloader, ScrollProgress, Marquee, BackToTop } from './components/ui';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // прелоадер: минимум 1.7 c, чтобы логотип успел «нарисоваться»
    const timer = setTimeout(() => setReady(true), 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <Preloader done={ready} />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </AppProvider>
  );
}
