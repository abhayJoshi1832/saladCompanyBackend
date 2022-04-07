const httpStatus = require("http-status");
const OrderModel = require("../models/order.model");
// const {} = require("../models/ingredient.model");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const ingredientService = require("./ingredient.service");




class OrderMethodsClass
{

    createOrder = async (userEmail, recipeId, deliveryTime, address) =>{

        try {
        const order = await OrderModel.create({
            userEmail: userEmail,
            recipeId: recipeId,
            deliveryTime: deliveryTime,
            deliveryAddress: address
        });

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error in orderService, create order fn");
    }

    };

    getUpcomingOrdersByUser = async(userEmail) =>{

    };

    getCurrentOrdersByUser = async(userEmail) =>{

    };

    getPastOrdersByUser = async(userEmail) =>{

    };

    editOrderById = async(orderId) =>{

    };

    deleteOrderById = async(orderId) =>{

    };

};

module.exports = new OrderMethodsClass();

