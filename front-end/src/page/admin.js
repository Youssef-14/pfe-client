import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ServeurList() {
    const [serveurs, setServeurs] = useState([]);
    const [newServeurName, setNewServeurName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/serveurs/get')
            .then(response => {
                setServeurs(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleAdd = () => {
        axios.post('http://localhost:3001/serveurs/post', { name: newServeurName })
            .then(response => {
                setServeurs([...serveurs, response.data]);
                setNewServeurName('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/serveurs/${id}`)
            .then(response => {
                const newServeurs = serveurs.filter(serveur => serveur.id !== id);
                setServeurs(newServeurs);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdate = (id, name) => {
        axios.put(`http://localhost:3001/serveurs/${id}`, { name })
            .then(response => {
                const newServeurs = [...serveurs];
                const index = newServeurs.findIndex(serveur => serveur.id === id);
                newServeurs[index].name = name;
                setServeurs(newServeurs);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1>Serveurs</h1>
            <form onSubmit={e => {
                e.preventDefault();
                handleAdd();
            }}>
                <input type="text" value={newServeurName} onChange={e => setNewServeurName(e.target.value)} />
                <button type="submit">Add</button>
            </form>
            <ul>
                {serveurs.map(serveur => (
                    <li key={serveur.id}>
                        {serveur.Name}
                        <button onClick={() => handleDelete(serveur.id)}>Delete</button>
                        <button onClick={() => handleUpdate(serveur.id, prompt('Enter new name'))}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServeurList;
