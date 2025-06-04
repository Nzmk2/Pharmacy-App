import React from 'react';

const Table = ({ medicines, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const tableContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  };

  const headerStyle = {
    backgroundColor: '#f8fafc',
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const tdStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #f3f4f6',
    color: '#1f2937'
  };

  const buttonStyle = {
    padding: '6px 12px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dbeafe',
    color: '#1d4ed8'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#fee2e2',
    color: '#dc2626'
  };

  if (!medicines || medicines.length === 0) {
    return (
      <div style={tableContainerStyle}>
        <div style={{ ...headerStyle, textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ 
            fontSize: '48px', 
            color: '#d1d5db', 
            marginBottom: '16px' 
          }}>💊</div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            No medicines found
          </h3>
          <p style={{ 
            color: '#6b7280', 
            margin: '0',
            fontSize: '14px' 
          }}>
            Start by adding your first medicine to the inventory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={tableContainerStyle}>
      <div style={headerStyle}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1f2937', 
          margin: '0 0 4px 0' 
        }}>
          Medicine Inventory
        </h2>
        <p style={{ 
          color: '#6b7280', 
          margin: '0',
          fontSize: '14px' 
        }}>
          {medicines.length} medicine(s) in total
        </p>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Medicine Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Indications</th>
              <th style={thStyle}>Side Effects</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr 
                key={medicine.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9fafb';
                }}
              >
                <td style={{ ...tdStyle, fontWeight: '500' }}>
                  {medicine.medicineName || 'N/A'}
                </td>
                <td style={tdStyle}>
                  {medicine.medicineType || 'N/A'}
                </td>
                <td style={{ ...tdStyle, maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {medicine.indications || 'N/A'}
                </td>
                <td style={{ ...tdStyle, maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {medicine.sideEffect || 'N/A'}
                </td>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#059669' }}>
                  {medicine.price ? formatter.format(Number(medicine.price)) : 'N/A'}
                </td>
                <td style={{ ...tdStyle, fontWeight: '500' }}>
                  {medicine.Stock !== undefined && medicine.Stock !== null && medicine.Stock !== '' ? Number(medicine.Stock) : 'N/A'}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(medicine.id)}
                    style={editButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#bfdbfe';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#dbeafe';
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(medicine.id)}
                    style={deleteButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#fecaca';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#fee2e2';
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;