import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceForm';

function Services() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/services')
            .then(response => setServices(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleAddService = (service) => {
        axios.post('http://localhost:8000/api/services', service)
            .then(response => setServices([...services, response.data]))
            .catch(error => console.log(error));
    };

    const handleUpdateService = (service) => {
        axios.put(`http://localhost:8000/api/services/${selectedService.id}`, service)
            .then(response => {
                const updatedServices = services.map(s => s.id === response.data.id ? response.data : s);
                setServices(updatedServices);
                setSelectedService(null);
                setIsEditing(false);
            })
            .catch(error => console.log(error));
    };

    const handleDeleteService = (id) => {
        axios.delete(`http://localhost:8000/api/services/${id}`)
            .then(() => setServices(services.filter(s => s.id !== id)))
            .catch(error => console.log(error));
    };

    const handleEditService = (id) => {
        const service = services.find(s => s.id === id);
        setSelectedService(service);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setSelectedService(null);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Services</h1>
            <ServiceForm
                onAddService={handleAddService}
                onUpdateService={handleUpdateService}
                selectedService={selectedService}
                onCancelEdit={handleCancelEdit}
                isEditing={isEditing}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Prix</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.role}</td>
                            <td>{service.prix} dt</td>
                            <td>
                                <button onClick={() => handleEditService(service.id)}>Edit</button>
                                <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Services;
