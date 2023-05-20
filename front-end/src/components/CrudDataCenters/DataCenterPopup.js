import React, { useState } from 'react';
import '../style/DataCenterPopup.css';


const DataCenterPopup = ({ onSubmit, onClose }) => {
    const [libelle, setLibelle] = useState('');
    const [description, setDescription] = useState('');
    const [capacite, setCapacite] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ libelle, description, capacite });
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="data-center-popup">
            <div className="data-center-popup-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <form className="data-center-popup-form" onSubmit={handleSubmit}>
                    <h2>Add Data Center</h2>
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
                    <button type="submit" className="btn-submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default DataCenterPopup;
