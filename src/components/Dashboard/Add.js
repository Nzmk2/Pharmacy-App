import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firestore';

const Add = ({ medicines, setMedicines, setIsAdding }) => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [indications, setIndications] = useState('');
  const [sideEffect, setSideEffect] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newMedicine = {
        medicineName,
        medicineType,
        indications,
        sideEffect,
        price: Number(price),
        Stock: Number(stock),
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "medicine"), newMedicine);
      setMedicines([...medicines, { id: docRef.id, ...newMedicine }]);
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'New medicine has been added successfully.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add medicine',
        text: error.message,
        showConfirmButton: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Medicine</h1>
        <label htmlFor="medicineName">Medicine Name</label>
        <input id="medicineName" type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} required disabled={isSubmitting} />
        <label htmlFor="medicineType">Medicine Type</label>
        <input id="medicineType" type="text" value={medicineType} onChange={(e) => setMedicineType(e.target.value)} required disabled={isSubmitting} />
        <label htmlFor="indications">Indications</label>
        <textarea id="indications" value={indications} onChange={(e) => setIndications(e.target.value)} rows="3" required disabled={isSubmitting} />
        <label htmlFor="sideEffect">Side Effects</label>
        <textarea id="sideEffect" value={sideEffect} onChange={(e) => setSideEffect(e.target.value)} rows="3" required disabled={isSubmitting} />
        <label htmlFor="price">Price</label>
        <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required disabled={isSubmitting} />
        <label htmlFor="stock">Stock</label>
        <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required disabled={isSubmitting} />
        <div style={{ marginTop: '12px' }}>
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</button>
          <button type="button" onClick={() => setIsAdding(false)} className="muted-button" disabled={isSubmitting}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
