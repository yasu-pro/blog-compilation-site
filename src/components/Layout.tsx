import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTitle from '../components/PageTitle';

interface LayoutProps {
  children?: React.ReactNode;
  title: string;
}

const Layout: React.FC< LayoutProps > = ({ children, title }) => {
  return (
    <main>
      <Header />
      <PageTitle title={title} />
      {children}
      <Footer />
    </main>
  );
};

  export default Layout;
