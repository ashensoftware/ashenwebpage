import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SkipLink } from '@/components/SkipLink';
import { HtmlLang } from '@/components/HtmlLang';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary selection:bg-brand-primary selection:text-white">
      <HtmlLang />
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-grow pt-20" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
