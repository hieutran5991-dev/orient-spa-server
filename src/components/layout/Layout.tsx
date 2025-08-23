import React from 'react';
import Header from './Header';
import Footer from './Footer';
import type { Locale } from '@/utils/constants';
import type { SpaLocation } from '@/types/api';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  spaLocations?: SpaLocation[];
}

const Layout: React.FC<LayoutProps> = ({ children, className = '', spaLocations = [] }) => {
  return (
    <div className={`layout-wrapper ${className}`}>
      <Header />

      <main className="main-content">
        {children}
      </main>

      <Footer spaLocations={spaLocations} />
    </div>
  );
};

export default Layout;
