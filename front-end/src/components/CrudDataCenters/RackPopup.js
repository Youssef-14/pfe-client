import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from "../../_services/account.services";

const RackPopup = ({ selectedPod, onRackAdded, onClose }) => {
    const [Nom, setNom] = useState('');
    const [Taille, setTaille] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(selectedPod);

        try {
            const response = await axios.post(
                'http://127.0.0.1:3001/racks/add',
                {
                    Nom: Nom,
                    Taille: Taille,
                    Pod: selectedPod
                },
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
            );

            onRackAdded(response.data.rack);
            onClose();
        } catch (error) {
            console.error(error);
        }
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
