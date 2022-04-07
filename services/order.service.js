const httpStatus = require("http-status");
const OrderModel = require("../models/order.model");
// const {} = require("../models/ingredient.model");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const ingredientService = require("./ingredient.service");




class OrderMethodsClass
{

    createOrder = async (userEmail, recipeId, deliveryTime, address) =>{

        console.log("inside order method: ",userEmail, recipeId, deliveryTime, address);

        try {
        const order = await OrderModel.create({
            userEmail: userEmail,
            recipeId: recipeId,
            deliveryTime: deliveryTime,
            deliveryAddress: address
        });
        return order;

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error in orderService, create order fn");
    }

    };

    getUpcomingOrdersByUser = async(userEmail) =>{

        //console.log("userEmail in order service", userEmail);
        try {
            const orders = await OrderModel.find(
                {
                "userEmail": userEmail,                
                "orderStatus": "Upcoming"
                }
            );

            //console.log("order inside order service",orders);
            return orders
        } catch (error) {
            console.log("error in getting order", error);
            throw new ApiError(500, "Error in orderService, create getUpcoming fn");
            
        }

    };

    deleteByEmail = async(email) =>
    {
        const res = await OrderModel.deleteMany({userEmail: email, orderStatus: "Upcoming" });
        return res;
    }
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

