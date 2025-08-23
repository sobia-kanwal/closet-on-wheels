// components/WelcomeMessage.js
import { useAuth } from '../context/AuthContext';

const WelcomeMessage = () => {
  const { showWelcome, user, setShowWelcome } = useAuth();

  if (!showWelcome || !user) return null;

  return (
    <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 极速加速器 011.547 2.94c-.37 1.16-.99 2.36-1.85 3.47a.5.5 0 00.73.7 10.02 10.02 0 002.45-3.86A.5.5 0 0012.9 5h.01a7.5 7.5 0 011.57 14.8.5.5 0 00-.6-.6A7.5 7.5 0 0110 18zm-4.5-6a.5.5 0 00-.5.5v3a.5.5 0 01-1 0v-3a1.5 1.5 0 113 0v3a.5.5 0 01-1 0v-3a.5.5 0 00-.5-.5z" clipRule="evenodd" />
          </svg>
          <span>Welcome back, {user.name}! 🎉</span>
        </div>
        <button 
          onClick={() => setShowWelcome(false)}
          className="ml-4 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;