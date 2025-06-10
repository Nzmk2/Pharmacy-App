import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SecurityManager from '../../encryption';
import './login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleEmailChange = (e) => {
    const sanitizedEmail = SecurityManager.sanitizeInput(e.target.value);
    setEmail(sanitizedEmail);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Don't sanitize password as it might contain special chars
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Input validation
      if (!SecurityManager.validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      if (!captchaValue) {
        throw new Error('Please complete the captcha');
      }

      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      setIsAuthenticated(true);
      
      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 1500,
      });

    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Account temporarily disabled due to many failed login attempts.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        showConfirmButton: true,
      });

      // Reset captcha on failed attempt
      setCaptchaValue(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        {/* Logo */}
        <div className="logo-wrapper" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img 
            src={`${process.env.PUBLIC_URL}/icon.jpg`} 
            alt="Pharmacy Logo" 
            style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
          />
        </div>

        <h1>Pharmacy Inventory Login</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Insert Your Email"
          value={email}
          onChange={handleEmailChange}
          maxLength="100"
          required
          disabled={isLoading}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Insert Your Password"
          value={password}
          onChange={handlePasswordChange}
          maxLength="50"
          required
          disabled={isLoading}
        />

        {<div className="recaptcha-wrapper">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
        </div>}

        <button 
          type="submit" 
          disabled={isLoading || !captchaValue}
          style={{ 
            marginTop: '12px',
            opacity: (isLoading || !captchaValue) ? 0.6 : 1,
            cursor: (isLoading || !captchaValue) ? 'not-allowed' : 'pointer'
          }}
          >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
