'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`layout-wrapper ${className}`}>
      <Header />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
