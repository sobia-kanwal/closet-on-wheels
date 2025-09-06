// components/Logo.js
import React from 'react';

const Logo = () => {
  return (
    <div className="logo-container">
      <svg 
        className="logo-svg" 
        viewBox="0 0 260 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z" 
          fill="#008994"
        />
        <path 
          d="M25 15H15V25H25V15Z" 
          fill="white"
        />
        <path 
          d="M30 10H10V12H30V10Z" 
          fill="white"
        />
        <path 
          d="M30 28H10V30H30V28Z" 
          fill="white"
        />
        <text 
          x="50" 
          y="25" 
          className="logo-text"
        >
          CLOSET ON WHEELS
        </text>
      </svg>

      <style jsx>{`
        .logo-container {
          display: inline-block;
          max-width: 100%;
        }
        
        .logo-svg {
          width: 100%;
          height: auto;
          max-width: 340px;
        }
        
        .logo-text {
          font-family: Montserrat, sans-serif;
          font-weight: 700;
          font-size: 20px;
          fill: #4B5563;
        }
        
        @media (max-width: 768px) {
          .logo-svg {
            max-width: 280px;
          }
          
          .logo-text {
            font-size: 18px;
          }
        }
        
        @media (max-width: 480px) {
          .logo-svg {
            max-width: 220px;
          }
          
          .logo-text {
            font-size: 16px;
          }
        }
        
        @media (max-width: 360px) {
          .logo-svg {
            max-width: 180px;
          }
          
          .logo-text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;