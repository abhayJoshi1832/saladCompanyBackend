const httpStatus = require("http-status");
const {
  CustomRecipe
} = require("../models/customRecipe.model");
const {
  Ingredient
} = require("../models/ingredient.model");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const ingredientService = require("./ingredient.service");
const orderService = require("./order.service");



// Create schedule for user in database
// Inputs- user token, day-wise recipe id inside an object, start date, delivery time, delivery address
// Reject if a user Already has existing schedule
// Output- months schedule object with date & day wise salad name, macros, delivery address 1st line, time


/**
 * 
 * @param {string} userEmail 
 * @param {*} weeklySchedule 
 * @param {Date} startDate 
 */
const createSchedule = async (userEmail, weeklySchedule, startDate) =>{

  try {
    

    let orderDate = startDate;
    let i= 0;
    while(i< 22){

      if (orderDate.getDay() in weeklySchedule){
        let dayDetails = weeklySchedule[orderDate.getDay()];
        let deliveryTime = new Date(orderDate);
        deliveryTime.setHours(dayDetails.hours, 0);
      
      
        await orderService.createOrder(userEmail, dayDetails.recipeId, deliveryTime, dayDetails.address);

      };
      
      orderDate.setDate(orderDate.getDate()+1);
    }

  
} catch (error) {
  console.log(error);
  throw new ApiError(500, "Error in create schedule service (line 52)");    
}
};

const getSchedule = async(userEmail) =>{

};

const deleteSchedule = async(userEmail) =>{

};




const createUserCustomRecipe = async (user = null) => {

  try {
    let email;
    user ? email = user.email : email = "";
    const userRecipe = await CustomRecipe.create({
      email: email
    });
    if (!userRecipe) {
      throw new ApiError(500, "could not create recipe in customRecipeService");
    }
    return userRecipe;

  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.log(error);
    throw new ApiError(500,"Error in DB service");

  }


};

const getRecipe= async(recipeId) => {
  const recipe = await CustomRecipe.findById(recipeId);
  return recipe;
}

const addIngredient = async (recipeId, ingredient, quantity) => {
  try {

    const userRecipe = await CustomRecipe.findById(recipeId);
    const userIngredient = await ingredientService.getIngredientById(ingredient);

    if (!userIngredient) throw new ApiError(400, "Ingredient doesn't exist in database");

    if (userRecipe.recipeItems.some((elem) => elem["ingredient"]['id'] === ingredient)) {
      throw new ApiError(400, "Product already in CustomRecipe. Use updateIngredient API (called using PUT '../v1/recipe' method)-  recipe sidebar to update or remove item from recipe");
    }

    userRecipe.recipeItems.push({
      ingredient: userIngredient,
      weight: quantity
    });
    await userRecipe.save();

    return userRecipe;

  } catch (error) {

    //console.log(error);

    if (error instanceof ApiError) throw error;
    console.log('error in service: ', error);
    throw new ApiError(500, "Internal database error")
  }




};

const updateIngredient = async (recipeId, ingredient, quantity) => {

  //console.log("user, productId, quantity: ", user, productId, quantity);

  try {
    const userRecipe = await CustomRecipe.findById(recipeId);
    const userIngredient = await ingredientService.getIngredientById(ingredient);


    if (!userIngredient) throw new ApiError(400, "Product doesn't exist in database");
    if (!userRecipe) throw new ApiError(400, "User does not have a CustomeRecipe. Use POST to create cart and add a product");

    if (!(userRecipe.recipeItems.some((elem) => elem.ingredient.id === ingredient))) throw new ApiError(400, "Item not in recipe, use POST method");   // if (quantity > 0){
   

    const ind = userRecipe.recipeItems.findIndex(obj => obj.ingredient.id === ingredient);
    if (quantity > 0) userRecipe.recipeItems[ind].weight = quantity;
    else userRecipe.recipeItems.splice(ind, 1);

    await userRecipe.save()
    return userRecipe;

  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.log('error in service: ', error);
    throw new ApiError(500, "Internal error in the database");
  }
};

;


module.exports = {
  addIngredient,
  updateIngredient,
  createUserCustomRecipe,
  getRecipe
};