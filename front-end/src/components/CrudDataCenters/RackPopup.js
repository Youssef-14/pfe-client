import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from "../_services/account.services";

const RackPopup = ({ selectedPod, onRackAdded, onClose }) => {
    const [rackName, setRackName] = useState('');
    const [rackSize, setRackSize] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3001/racks/add',
                {
                    Nom: rackName,
                    Taille: rackSize,
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
        <div className="rack-popup">
            <div className="rack-popup-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <form className="rack-popup-form" onSubmit={handleSubmit}>
                    <h2>Add Rack</h2>
                    <div className="form-group">
                        <label htmlFor="rackName">Rack Name:</label>
                        <input
                            type="text"
                            id="rackName"
                            className="form-control"
                            value={rackName}
                            onChange={(e) => setRackName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rackSize">Rack Size:</label>
                        <input
                            type="number"
                            id="rackSize"
                            className="form-control"
                            value={rackSize}
                            onChange={(e) => setRackSize(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default RackPopup;
