import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { db } from '../../config/firestore';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const Dashboard = ({ setIsAuthenticated }) => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMedicines = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "medicine"));
      const medicinesData = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));

      setMedicines(medicinesData);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load data. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  const handleEdit = (id) => {
    const medicine = medicines.find(med => med.id === id);
    if (medicine) {
      setSelectedMedicine(medicine);
      setIsEditing(true);
    }
  };

  const handleDelete = (id) => {
    const medicine = medicines.find(med => med.id === id);
    if (!medicine) return;

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Delete ${medicine.medicineName}'s data?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "medicine", id));
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${medicine.medicineName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 2000,
          });

          setMedicines(prev => prev.filter(med => med.id !== id));
        } catch (error) {
          console.error("Error deleting medicine:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete data. Please try again.',
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: '#666' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column'
    }}>
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <div style={{
            flex: 1,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <Table
              medicines={medicines}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </>
      )}
      
      {isAdding && (
        <Add
          medicines={medicines}
          setMedicines={setMedicines}
          setIsAdding={setIsAdding}
          getMedicines={getMedicines}
        />
      )}
      
      {isEditing && (
        <Edit
          medicines={medicines}
          selectedMedicine={selectedMedicine}
          setMedicines={setMedicines}
          setIsEditing={setIsEditing}
          getMedicines={getMedicines}
        />
      )}
    </div>
  );
};

export default Dashboard;
