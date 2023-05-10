
import React, { useState } from 'react';
import './style/ListServices.css'
import { Link } from 'react-router-dom';

function ListProduitVisteur() {
    const [photos, setPhotos] = useState([
        {
            id: 1,
            url: require('../img/p1.jpg'),
            role: "purification de l'huile d'olive",
            prix: 9,
            selected: false
        },
        {
            id: 2,
            url: require('../img/p2.jpg'),
            role: 'ramassage',
            prix: 14,
            selected: false
        },
        {
            id: 3,
            url: require('../img/p3.jpg'),
            role: 'labour',
            prix: 19,
            selected: false
        },
        {
            id: 4,
            url: require('../img/p4.jpg'),
            role: 'irrigation',
            prix: 9.99,
            selected: false
        },
        {
            id: 5,
            url: require('../img/p1.jpg'),
            role: 'taftaf',
            prix: 14,
            selected: false
        },

    ]);

    const [total, setTotal] = useState(0);

    const handleSelection = (id) => {
        let newPhotos = [...photos];
        let selectedPhoto = newPhotos.find(photo => photo.id === id);
        selectedPhoto.selected = !selectedPhoto.selected;
        setPhotos(newPhotos);
        calculateTotal();
    }

    const calculateTotal = () => {
        let selectedPhotos = photos.filter(photo => photo.selected);
        let sum = selectedPhotos.reduce((acc, photo) => acc + photo.prix, 0);
        setTotal(sum);
    }


    return (
        <div>
            <div className="photo-container">
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img className={photo.selected ? 'photo-card selected' : 'photo-card'} src={photo.url} alt={`Photo ${photo.id}`} onClick={() => handleSelection(photo.id)} />
                        <div id='text'> <div>service: {photo.role}</div>
                            <div>Prix: {photo.prix}dt</div>
                            <div>Selected: {photo.selected ? 'Yes' : 'No'}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total">Total: {total.toFixed(2)} dt pour l'olive</div>
            <button> <Link to="/login" id="button" className="btn">ajouter au pagnee!</Link></button>

        </div>
    );
}

export default ListProduitVisteur;
