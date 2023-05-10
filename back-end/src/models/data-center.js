const mongoose = require('mongoose');

const DataCenter = mongoose.model('DataCenter', {
    Libelle: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Capacite: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    pods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pod'
    }],
});

module.exports = { DataCenter };