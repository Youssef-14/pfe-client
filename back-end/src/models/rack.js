const mongoose = require('mongoose');

const Rack = mongoose.model('Rack', {
    Nom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Taille: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    Pod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pod'
    },
});

module.exports = { Rack };