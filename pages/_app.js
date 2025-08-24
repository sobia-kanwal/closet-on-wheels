// pages/_app.js (Wrap app with CartProvider)
import { useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
import { initializeSampleProducts } from '../lib/db';
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // Initialize sample products on app load
  useEffect(() => {
    initializeSampleProducts();
  }, []);

  return (
    <CartProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;