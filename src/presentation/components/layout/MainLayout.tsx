import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-dark-800 text-white flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-3 sm:px-4 md:px-8 lg:px-16 xl:px-40 py-4 sm:py-6 md:py-8 text-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};
