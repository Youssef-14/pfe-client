import React, { useState } from 'react';
import '../style/DataCenterPopup.css';

const RackPopup = ({ id, onSubmit, onClose }) => {
    const [Nom, setNom] = useState('');
    const [Taille, setTaille] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ id, Nom, Taille });
    };

    const handleClose = () => {

        onClose();

    };

    return (
        <div className="data-center-popup">
            <div className="data-center-popup-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <form className="data-center-popup-form" onSubmit={handleSubmit}>
                    <h2>Add Rack</h2>
                    <div className="form-group">
                        <label htmlFor="Nom">Rack Name:</label>
                        <input
                            type="text"
                            id="Nom"
                            className="form-control"
                            value={Nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Taille">Rack Size:</label>
                        <input
                            type="number"
                            id="Taille"
                            className="form-control"
                            value={Taille}
                            onChange={(e) => setTaille(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default RackPopup;
