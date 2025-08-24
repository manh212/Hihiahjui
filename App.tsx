import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SkipToContentLink from './components/layout/SkipToContentLink';
import { sections } from './sections.config';

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <SkipToContentLink />
      <Header theme={theme} setTheme={setTheme} sections={sections.map(({ id, title }) => ({ id, title }))} />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {sections.map(({ id, Component }) => (
            <Component key={id} id={id} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
