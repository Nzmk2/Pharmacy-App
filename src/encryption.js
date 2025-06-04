// src/encryption.js
import CryptoJS from 'crypto-js';

class SecurityManager {
  constructor() {
    this.secretKey = process.env.REACT_APP_ENCRYPTION_KEY || 'your-256-bit-secret-key-here';
  }

  // AES-256 Encryption
  encrypt(data) {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Encryption failed');
    }
  }

  // AES-256 Decryption
  decrypt(encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Decryption failed');
    }
  }

  // Input Sanitization
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .replace(/[;&|`$]/g, '') // Remove command injection chars
      .trim();
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Validate medicine data
  validateMedicineData(medicine) {
    const errors = [];

    if (!medicine.medicineName || medicine.medicineName.length < 2) {
      errors.push('Medicine name must be at least 2 characters');
    }

    if (!medicine.medicineType || medicine.medicineType.length < 2) {
      errors.push('Medicine type must be at least 2 characters');
    }

    if (!medicine.indications || medicine.indications.length < 5) {
      errors.push('Indications must be at least 5 characters');
    }

    if (!medicine.sideEffect || medicine.sideEffect.length < 5) {
      errors.push('Side effects must be at least 5 characters');
    }

    if (!medicine.price || isNaN(medicine.price) || medicine.price < 0) {
      errors.push('Price must be a valid positive number');
    }

    if (!medicine.Stock || isNaN(medicine.Stock) || medicine.Stock < 0) {
      errors.push('Stock must be a valid positive number');
    }

    return errors;
  }
}

// Create an instance of SecurityManager
const securityManagerInstance = new SecurityManager();

// Export the instance as default
export default securityManagerInstance;
