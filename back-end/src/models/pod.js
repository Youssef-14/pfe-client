const { default: mongoose } = require("mongoose");

const Pod = mongoose.model('Pod', {
    Libelle: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    DataCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataCenter'
    },
    Racks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rack'
    }],
});

module.exports = { Pod };