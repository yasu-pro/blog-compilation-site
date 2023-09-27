import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTitle from '../components/PageTitle';

const Layout: React.FC = ({ children }) => {
    return (
      <main>
        <Header />
        <PageTitle title='Blog Compilation Site' />
        {children}
        <Footer />
      </main>
    );
  };
  
  export default Layout;
