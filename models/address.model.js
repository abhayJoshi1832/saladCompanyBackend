const mongoose = require('mongoose');
//const {} = require('');
const config = require("../config/config");

const addressSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        required: true
    },


    addressArr: [{
        tag: {type: String, unique: true},
        addressLine1: {type: String},
        addressLine2: {type: String},
        addressLine3: {type: String},
        pincode: {type: Number},
        mapsPin: {type:String}
    }],

    primaryAddressIndex: {type: Number, default: 0}

    
}, {
    timestamps: true,
    collection: "addresses"
});

const Addresses = mongoose.model('address', addressSchema);
module.exports = Addresses;