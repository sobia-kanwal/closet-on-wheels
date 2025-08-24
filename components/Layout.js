// components/Layout.js
import TopHeader from './TopHeader';
import MainHeader from './MainHeader';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopHeader />
      <MainHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;