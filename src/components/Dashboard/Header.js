import React from 'react';
import Logout from '../Logout'; // sesuaikan path jika perlu

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  const navbarStyle = {
    background: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #e5e7eb'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
    textShadow: 'none'
  };

  const iconStyle = {
    fontSize: '28px',
    filter: 'none'
  };

  const navActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const addButtonStyle = {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        {/* Logo/Brand Section */}
        <div style={logoStyle}>
          <span style={iconStyle}>💊</span>
          <h1 style={titleStyle}>Pharmacy Inventory</h1>
        </div>

        {/* Action Buttons */}
        <div style={navActionsStyle}>
          <button
            onClick={() => setIsAdding(true)}
            style={addButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3b82f6';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
            }}
          >
            <span>+</span>
            Add Medicine
          </button>

          {/* Menggunakan komponen Logout */}
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
      </div>
    </nav>
  );
};

export default Header;