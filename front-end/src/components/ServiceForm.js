import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

function ServiceForm({ onSubmit, onCancel, initialData }) {
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
            />
            <TextField
                label="Prix"
                name="prix"
                type="number"
                value={formData.prix}
                onChange={handleInputChange}
                required
            />
            <div>
                <Button variant="contained" color="primary" type="submit">
                    Enregistrer
                </Button>
                <Button variant="contained" onClick={onCancel}>
                    Annuler
                </Button>
            </div>
        </form>
    );
}

ServiceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        role: PropTypes.string,
        prix: PropTypes.number,
    }),
};

ServiceForm.defaultProps = {
    initialData: {
        role: '',
        prix: 0,
    },
};

export default ServiceForm;

