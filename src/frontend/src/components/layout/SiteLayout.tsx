import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsAppFab from '../contact/FloatingWhatsAppFab';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsAppFab />
    </div>
  );
}
