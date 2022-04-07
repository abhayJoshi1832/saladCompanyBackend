const mongoose = require('mongoose');
const {recipeSchema} = require('./customRecipe.model');
const config = require("../config/config");

const orderSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        default: ""
      },

    recipeId: {type:String},

    deliveryTime: {type: Date},

    orderStatus: {
        type: String,
        enum: ["Upcoming", "Completed", "Preparing", "Delivering", "Fulfilled", "Cancelled", "Edited", "RemovedFromSchedule"],
        default: "Upcoming"         
    },

    deliveryAddress: {type: String, required: true}

},
{
    timestamps: true,
    collection: "orders"
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;


