import Footer from './Footer';
import { useRouter } from 'next/router';
import TopHeader from './TopHeader';
import MainHeader from './MainHeader';

export default function Layout({ children }) {
  const router = useRouter();
  const isAuthPage = router.pathname === '/auth';
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAuthPage && <TopHeader />}
      {!isAuthPage && <MainHeader />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}