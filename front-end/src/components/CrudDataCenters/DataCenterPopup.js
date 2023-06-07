import React, { useState, useEffect } from 'react';
import '../style/DataCenterPopup.css';

const DataCenterPopup = ({ onSubmit, onClose, addEdit }) => {
  const [libelle, setLibelle] = useState('');
  const [description, setDescription] = useState('');
  const [capacite, setCapacite] = useState(0);

  useEffect(() => {
    if (addEdit) {
      // Update the input values if addEdit has a value
      setLibelle(addEdit.Libelle);
      setDescription(addEdit.Description);
      setCapacite(addEdit.Capacite);
    } else {
      // Clear the input values if addEdit is null
      setLibelle('');
      setDescription('');
      setCapacite(0);
    }
  }, [addEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ libelle, description, capacite });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="overlay" onClick={handleClose}></div>
      <div className="data-center-popup">
        <div className="data-center-popup-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <form className="data-center-popup-form" onSubmit={handleSubmit}>
            <h2>{addEdit ? 'Edit Data Center' : 'Add Data Center'}</h2>
            <div className="form-group">
              <label htmlFor="libelle">Libelle:</label>
              <input
                type="text"
                id="libelle"
                className="form-control"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacite">Capacite:</label>
              <input
                type="number"
                id="capacite"
                className="form-control"
                value={capacite}
                onChange={(e) => setCapacite(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-submit">
              {addEdit ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DataCenterPopup;
