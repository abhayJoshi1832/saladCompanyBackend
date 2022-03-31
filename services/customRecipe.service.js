const httpStatus = require("http-status");
const { CustomRecipe,Ingredient  } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const ingredientService = require("./ingredient.service")

// TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

/**
 * Fetches cart for a user
 * - Fetch user's cart from Mongo
 * - If cart doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "User does not have a cart"
 *
 * @param {User} user
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const createUserCustomRecipe = async (user=null) => {
  let email;
  user? email = user.email : email = "";  
  const userRecipe = new CustomRecipe({email});
  await userRecipe.save();
  if (!userRecipe){
    throw new ApiError(500,"could not create recipe in customRecipeService" );
  }
  return userRecipe;  
};

/**
 * Adds a new product to cart
 * - Get user's cart object using "Cart" model's findOne() method
 * --- If it doesn't exist, create one
 * --- If cart creation fails, throw ApiError with "500 Internal Server Error" status code
 *
 * - If product to add already in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product already in CustomRecipe. Use the cart sidebar to update or remove product from cart"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - Otherwise, add product to user's cart
 *
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const addIngredient = async (recipeId, ingredient, quantity) => {

  try {
    
    const userRecipe = await CustomRecipe.findById(recipeId);
    const userIngredient = await ingredientService.getIngredientById(ingredient);

    //console.log("userProduct: ", userProduct);

    //console.log('userCart: - ', userCart);

    if (!userIngredient) throw new ApiError(400,"Ingredient doesn't exist in database");

    if (userRecipe.recipeItems.some((elem) => elem.ingredient.id === ingredient)){
      throw new ApiError(400,"Product already in CustomRecipe. Use the cart sidebar to update or remove product from cart");
    }

    userRecipe.recipeItems.push({ingredient, weight: quantity});
    await userRecipe.save();

     return userRecipe;    
    
  } catch (error) {

    //console.log(error);

    if(error instanceof ApiError) throw error;    
    throw new ApiError(500,"Internal database error")
  }

  


};

/**
 * Updates the quantity of an already existing product in cart
 * - Get user's cart object using "Cart" model's findOne() method
 * - If cart doesn't exist, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a CustomRecipe. Use POST to create cart and add a product"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * - Otherwise, update the product's quantity in user's cart to the new quantity provided and return the cart object
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>
 * @throws {ApiError}
 */
const updateIngredient = async (userRecipe, ingredient, quantity) => {

  //console.log("user, productId, quantity: ", user, productId, quantity);

  try {

    const userIngredient = await ingredientService.getIngredientById(ingredient);
    

    if (!userIngredient) throw new ApiError(400,"Product doesn't exist in database");
    if (!userRecipe) throw new ApiError(400,"User does not have a CustomeRecipe. Use POST to create cart and add a product");
    
    

    const items = userRecipe.recipeItems;
    //console.log('usercart: ', cartArr );
    console.log('......................................................................................... ');


    //console.log("isProduct- ",isProduct);
    
    if(!userRecipe.recipeItems.some((elem) => elem.ingredient.id === ingredient)) throw new ApiError(400,"Product not in cart");

    // if (quantity > 0){
    // }
    // // working-
    // await CustomeRecipe.updateOne({'cartItems.product': userProduct},
    // {$set: {'cartItems.$.quantity': quantity}});
    //console.log("user cart 158: ",userCart.cartItems, userProduct);

    const ind = userRecipe.recipeItems.findIndex(obj => obj.ingredient.id === ingredient);

    if (quantity > 0) userRecipe.recipeItems[ind].weight = quantity;
    else userRecipe.recipeItems.splice(ind,1);

    await userRecipe.save()
    return userRecipe;     
  
  }  
  catch (error) {
    //console.log(error);
    if(error instanceof ApiError) throw error;    
    throw new ApiError(500,"Internal error in the database" );
    
    
  }
};

// const checkout = async (user) => {

//   try {
    
//   //test1
//   const userCart = await CustomeRecipe.findOne({email: user.email});
//   if(!userCart) throw new ApiError(404, "User does not have a cart");

//   //test2  
//   if(!userCart.cartItems.length) throw new ApiError(400, "user cart empty");

//   //test3  
//   const addressSet = await user.hasSetNonDefaultAddress();
//   if(!addressSet) throw new ApiError(400, "address not set etc..");

//  // test4

//   const reduceFn = (total, current) =>{
//     return total + current.product.cost * current.quantity
//   };
//   const totalPrice = userCart.cartItems.reduce(reduceFn,0);
//   if (totalPrice > user.walletMoney){
//     throw new ApiError(400, "insufficient balance");
//   }

//   //test5

//   user.walletMoney -= totalPrice;
//   userCart.cartItems = [];

//   await user.save();
//   await userCart.save();
//   ;
//   //make cartitems 0
//   //
    
//   } catch (error) {

//     if (error instanceof ApiError){
//       //console.log("Instance of API error failed with Status: ", error.statusCode, " with message: ", error.message);
//       throw error;
//     }
//     //console.log("Instance of other error", error)
//     throw new ApiError(500, "Internal failure inside cartService");    
//   }





// };


module.exports = {
  addIngredient,
  updateIngredient,
  createUserCustomRecipe  
};
