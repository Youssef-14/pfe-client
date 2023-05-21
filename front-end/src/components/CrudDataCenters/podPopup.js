import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from "../../_services/account.services";
import '../style/DataCenterPopup.css';
const PodPopup = ({ selectedDatacenter, onPodAdded, onClose }) => {
    const [Libelle, setLibelle] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3001/pods/add',
                {
                    Nom: Libelle,

                    Pod: selectedDatacenter
                },
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
            );

            onPodAdded(response.data.Pod);
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
                    {/* <div className="form-group">
                        <label htmlFor="_id">Pod id:</label>
                        <input
                            type="number"
                            id="_id"
                            className="form-control"
                            value={_id}
                            onChange={(e) => set_id(e.target.value)}
                        />
                    </div> */}
                    <button type="submit" className="btn-submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default PodPopup;
