// components/Layout.js
import TopHeader from './TopHeader';
import MainHeader from './MainHeader';
import Footer from './Footer';
import WelcomeMessage from './WelcomeMessage';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopHeader />
      <MainHeader />
      <WelcomeMessage />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;