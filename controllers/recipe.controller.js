const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { ingredientService,recipeService } = require("../services");
const ApiError = require("../utils/ApiError");
const {User} = require("../models/user.model");
const { getIngredients } = require("../services/ingredient.service");
const { all } = require("../app");

/**
 * Fetch the cart details
 *
 * Example response:
 * HTTP 200 OK
 * {
 *  "_id": "5f82eebd2b11f6979231653f",
 *  "email": "crio-user@gmail.com",
 *  "cartItems": [
 *      {
 *          "_id": "5f8feede75b0cc037b1bce9d",
 *          "product": {
 *              "_id": "5f71c1ca04c69a5874e9fd45",
 *              "name": "ball",
 *              "category": "Sports",
 *              "rating": 5,
 *              "cost": 20,
 *              "image": "google.com",
 *              "__v": 0
 *          },
 *          "quantity": 2
 *      }
 *  ],
 *  "paymentOption": "PAYMENT_OPTION_DEFAULT",
 *  "__v": 33
 * }
 * 
 *
 */
const getAllItems = catchAsync(async(req,res)=>{
  const allItem = await ingredientService.getIngredients();
  res.json(allItem)
});


// TO DO- change getrecipe to get recipes by ID or get recipes by email ; based on query
const getRecipe = catchAsync(async(req,res)=>{
  //console.log('request ID in query: --', req.query )
  //console.log("recipeID: ", req.body.recipeId)
  const recipe = await recipeService.getRecipe(req.body.recipeId);
  
  if (recipe.userEmail !== req.user.email) throw new ApiError('Email validation failed in token, recipe controller');
  res.json(recipe);
})

const createRecipe = catchAsync(async (req, res) => {
  console.log('create recipe controller called', req.user);
  const recipe = await recipeService.createUserCustomRecipe(req.user);
  console.log('created recipe in controller: ', recipe);
  res.json(recipe);
});

/**
 * Add a product to cart
 *
 *
 */
const addItemToRecipe = catchAsync(async (req, res) => {
  //console.log('req body',req.body);
  const recipe = await recipeService.addIngredient(
    req.body.recipeId,
    req.body.ingredientId,
    req.body.weight,
    req.user.email
  );

  res.status(httpStatus.CREATED).json(recipe);
});

// TODO: CRIO_TASK_MODULE_CART - Implement updateProductInCart()
/**
 * Update product quantity in cart
 * - If updated quantity > 0, 
 * --- update product quantity in user's cart
 * --- return "200 OK" and the updated cart object
 * - If updated quantity == 0, 
 * --- delete the product from user's cart
 * --- return "204 NO CONTENT"
 * 
 * Example responses:
 * HTTP 200 - on successful update
 * HTTP 204 - on successful product deletion
 * 
 *
 */
const updateItemInRecipe = catchAsync(async (req, res) => {
  const recipe = await recipeService.updateIngredient(
    req.body.recipeId,
    req.body.ingredientId,
    req.body.weight,
    req.user.email
  );

  if (req.body.weight) res.status(200).send(recipe);
  else res.status(204).json(recipe);

  
});


/**
 * Checkout user's cart
 */
// const checkout = catchAsync(async (req, res) => {

//   try {

//     const user = await User.findById(req.user._id);
//     await cartService.checkout(user);
//     res.status(204).send()
//   return ;
    
//   } catch (error) {

//     if(error instanceof ApiError) res.status(error.statusCode).json({statusCode: error.statusCode, message: error.message});
//     else res.status(500).json({statusCode: error.statusCode, message: "Internal error, Caught at controller"});
    
//   }
   
// });

module.exports = {
  getAllItems,
  createRecipe,
  addItemToRecipe,
  updateItemInRecipe,
  getRecipe
};
