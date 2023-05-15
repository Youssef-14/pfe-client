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
    IPManagement: {
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
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        decimal: true
    },
    ConsommationCPU: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        decimal: true
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
    Rack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rack'
    }
});

module.exports = { Serveur };