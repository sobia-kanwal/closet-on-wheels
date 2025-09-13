import { LayoutGroup } from "framer-motion";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { WishlistProvider } from "../context/WishlistContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <LayoutGroup>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </LayoutGroup>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
