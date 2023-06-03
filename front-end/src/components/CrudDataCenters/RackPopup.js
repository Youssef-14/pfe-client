import React, { useState, useEffect } from 'react';
import '../style/DataCenterPopup.css';

const RackPopup = ({ onSubmit, onClose, addEdit }) => {
  const [nom, setNom] = useState('');
  const [taille, setTaille] = useState(0);

  useEffect(() => {
    if (addEdit) {
      // Update the input values if addEdit has a value
      setNom(addEdit.Nom);
      setTaille(addEdit.Taille);
    } else {
      // Clear the input values if addEdit is null
      setNom('');
      setTaille(0);
    }
  }, [addEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, taille });
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
          <h2>{addEdit ? 'Edit Rack' : 'Add Rack'}</h2>
          <div className="form-group">
            <label htmlFor="nom">Rack Name:</label>
            <input
              type="text"
              id="nom"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taille">Rack Size:</label>
            <input
              type="number"
              id="taille"
              className="form-control"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
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

export default RackPopup;
