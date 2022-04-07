const mongoose = require('mongoose');
const {recipeSchema} = require('./customRecipe.model');
const config = require("../config/config");

const orderSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        default: ""
      },

    recipeId: {type:String},

    deliverytime: {type: Date},

    orderStatus: {
        type: String,
        enum: ["Upcoming", "Completed", "Preparing", "Delivering", "Fulfilled", "Cancelled", "Edited", "RemovedFromSchedule"],
        default: "Upcoming"         
    },

    deliveryAdress: {type: String, required: true}

},
{
    timestamps: true,
    collection: "orders"
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;


