// lib/db.js (Database utility functions)
// For demonstration, we'll use localStorage as our "database"
// In a real application, replace these with actual API calls

export const db = {
  // Products collection
  products: {
    getAll: () => {
      try {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    getById: (id) => {
      try {
        const products = localStorage.getItem('products');
        const parsedProducts = products ? JSON.parse(products) : [];
        return parsedProducts.find(product => product.id === id);
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
    }
  },
  
  // Cart collection
  cart: {
    get: () => {
      try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
      } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
      }
    },
    add: (product) => {
      try {
        const cart = db.cart.get();
        const existingItem = cart.find(item => item.id === product.id);
        
        let updatedCart;
        if (existingItem) {
          updatedCart = cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price * item.days }
              : item
          );
        } else {
          updatedCart = [...cart, {
            ...product,
            quantity: 1,
            days: 1,
            total: product.price * 1
          }];
        }
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } catch (error) {
        console.error('Error adding to cart:', error);
        return [];
      }
    },
    update: (productId, updates) => {
      try {
        const cart = db.cart.get();
        const updatedCart = cart.map(item =>
          item.id === productId
            ? { ...item, ...updates, total: (updates.quantity || item.quantity) * item.price * (updates.days || item.days) }
            : item
        );
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } catch (error) {
        console.error('Error updating cart:', error);
        return [];
      }
    },
    remove: (productId) => {
      try {
        const cart = db.cart.get();
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } catch (error) {
        console.error('Error removing from cart:', error);
        return [];
      }
    },
    clear: () => {
      try {
        localStorage.removeItem('cart');
        return [];
      } catch (error) {
        console.error('Error clearing cart:', error);
        return [];
      }
    }
  }
};

// Initialize sample products if none exist
export const initializeSampleProducts = () => {
  const existingProducts = localStorage.getItem('products');
  if (!existingProducts) {
    const sampleProducts = [
      {
        id: 1,
        name: 'Designer Evening Gown',
        image: '/images/products/evening-gown.jpg',
        price: 1500,
        description: 'Elegant evening gown for special occasions',
        category: 'Clothing'
      },
      {
        id: 2,
        name: 'Persian Carpet',
        image: '/images/products/persian-carpet.jpg',
        price: 2500,
        description: 'Beautiful handwoven Persian carpet',
        category: 'Home Decor'
      },
      {
        id: 3,
        name: 'Wedding Decor Set',
        image: '/images/products/wedding-decor.jpg',
        price: 3500,
        description: 'Complete wedding decoration package',
        category: 'Event Supplies'
      },
      {
        id: 4,
        name: 'Party Tent',
        image: '/images/products/party-tent.jpg',
        price: 2000,
        description: '10x10 party tent for outdoor events',
        category: 'Event Supplies'
      }
    ];
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
};