import React, { useState, useEffect } from 'react';
import '../style/DataCenterPopup.css';

const PodPopup = ({ onSubmit, onClose, addEdit }) => {
  const [libelle, setLibelle] = useState('');

  useEffect(() => {
    if (addEdit) {
      // Update the input value if addEdit has a value
      setLibelle(addEdit.Libelle);
    } else {
      // Clear the input value if addEdit is null
      setLibelle('');
    }
  }, [addEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ libelle });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="data-center-popup">
      <div className="data-center-popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <form className="data-center-popup-form" onSubmit={handleSubmit}>
          <h2>{addEdit ? 'Edit Pod' : 'Add Pod'}</h2>
          <div className="form-group">
            <label htmlFor="libelle">Pod Name:</label>
            <input
              type="text"
              id="libelle"
              className="form-control"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">
            {addEdit ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PodPopup;
