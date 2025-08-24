// pages/_app.js (Wrap app with CartProvider)
import { useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
import { initializeSampleProducts } from '../lib/db';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Initialize sample products on app load
  useEffect(() => {
    initializeSampleProducts();
  }, []);

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;