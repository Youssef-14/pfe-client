const mongoose = require('mongoose');

const Utilisateur = mongoose.model('Utilisateur', {
    _id: mongoose.Schema.Types.ObjectId,
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
    Email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    IsAdmin: {
        type: Boolean,
        required: true,
        minlength: 1,
        trim: true
    },
});

module.exports = { Utilisateur };
