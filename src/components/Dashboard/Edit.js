import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../config/firestore';

const Edit = ({ medicines, selectedMedicine, setMedicines, setIsEditing, getMedicines }) => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [indications, setIndications] = useState('');
  const [sideEffect, setSideEffect] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (selectedMedicine) {
      setMedicineName(selectedMedicine.medicineName || '');
      setMedicineType(selectedMedicine.medicineType || '');
      setIndications(selectedMedicine.indications || '');
      setSideEffect(selectedMedicine.sideEffect || '');
      setPrice(selectedMedicine.price || '');
      setStock(selectedMedicine.Stock || '');
    }
  }, [selectedMedicine]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!medicineName || !medicineType || !indications || !sideEffect || !price || !stock) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedMedicine = {
      medicineName,
      medicineType,
      indications,
      sideEffect,
      price: Number(price),
      Stock: Number(stock),
    };

    try {
      const medicineDoc = doc(db, "medicine", selectedMedicine.id);
      await updateDoc(medicineDoc, updatedMedicine);

      const medicinesCopy = [...medicines];
      const index = medicinesCopy.findIndex(med => med.id === selectedMedicine.id);
      medicinesCopy[index] = { id: selectedMedicine.id, ...updatedMedicine };

      setMedicines(medicinesCopy);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Medicine data has been updated.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update medicine',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Medicine</h1>

        <label htmlFor="medicineName">Medicine Name</label>
        <input
          id="medicineName"
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={e => setMedicineName(e.target.value)}
        />

        <label htmlFor="medicineType">Medicine Type</label>
        <input
          id="medicineType"
          type="text"
          name="medicineType"
          placeholder="Medicine Type (e.g., Tablet, Capsule, Syrup)"
          value={medicineType}
          onChange={e => setMedicineType(e.target.value)}
        />

        <label htmlFor="indications">Indications</label>
        <textarea
          id="indications"
          name="indications"
          placeholder="Indications (what is this medicine used for)"
          value={indications}
          onChange={e => setIndications(e.target.value)}
          rows="3"
        />

        <label htmlFor="sideEffect">Side Effects</label>
        <textarea
          id="sideEffect"
          name="sideEffect"
          placeholder="Side Effects"
          value={sideEffect}
          onChange={e => setSideEffect(e.target.value)}
          rows="3"
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />

        <div style={{ marginTop: '12px' }}>
          <button type="submit">Update</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: '12px' }}
            className="muted-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;