const mongoose = require('mongoose');

const Utilisateur = mongoose.model('Utilisateur', {
    Nom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Prenom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Role: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    }
});

module.exports = { Utilisateur };
