const mongoose = require('mongoose');

const Serveur = mongoose.model('Serveur', {
    Login: {
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
    Model: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    IP: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    IPManagment: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    RAM: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    CPU: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    ConsommationRAM: {
        type: Float,
        required: true,
        minlength: 1,
        trim: true
    },
    ConsommationCPU: {
        type: Float,
        required: true,
        minlength: 1,
        trim: true
    },
    Uptime: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Owner: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Role: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    DataCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataCenter'
    }
});

module.exports = { Serveur };