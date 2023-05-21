import React, { useState } from 'react';
import '../style/DataCenterPopup.css';

const PodPopup = ({ id, onSubmit, onClose }) => {
    const [Libelle, setLibelle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ id, Libelle });
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="data-center-popup">
            <div className="data-center-popup-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <form className="data-center-popup-form" onSubmit={handleSubmit}>
                    <h2>Add Pod</h2>
                    <div className="form-group">
                        <label htmlFor="Libelle">Pod Name:</label>
                        <input
                            type="text"
                            id="Libelle"
                            className="form-control"
                            value={Libelle}
                            onChange={(e) => setLibelle(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default PodPopup;
