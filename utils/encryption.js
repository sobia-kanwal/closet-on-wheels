const CryptoJS = require('crypto-js');

const secretKey = process.env.ENCRYPTION_KEY || 'fallback_encryption_key';

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getSessionUser = () => {
  if (typeof window === 'undefined') return null;
  
  const encryptedUser = sessionStorage.getItem('user');
  if (!encryptedUser) return null;
  
  try {
    return JSON.parse(decryptData(encryptedUser));
  } catch (error) {
    console.error('Error decrypting user data:', error);
    return null;
  }
};