const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { ingredientService,recipeService } = require("../services");
const ApiError = require("../utils/ApiError");
const {User} = require("../models/user.model");
const { getIngredients } = require("../services/ingredient.service");
const { all } = require("../app");
const scheduleService = require("../services/schedule.service");
const { createUserCustomRecipe } = require("../services/customRecipe.service");
const { crossOriginResourcePolicy } = require("helmet");


const createSchedule = catchAsync(async (req,res) => {

  //console.log("create schedule received with: ", req.user.email, req.body.weeklySchedule, req.body.startDate);
  await scheduleService.createSchedule(req.user.email, req.body.weeklySchedule, req.body.startDate);
  res.json({message: "success"});

});

const getSchedule = catchAsync(async (req,res) =>{
  const responseArr = await scheduleService.getSchedule(req.user.email);
  res.json({orders: responseArr});

});

const deleteSchedule = catchAsync(async(req,res) =>{
  const response = await scheduleService.deleteSchedule(req.user.email);
  res.json({message: response});
})


// const getAllItems = catchAsync(async(req,res)=>{
//   const allItem = await ingredientService.getIngredients();
//   res.json(allItem)
// });


// // TO DO- change getrecipe to get recipes by ID or get recipes by email ; based on query
// const getRecipe = catchAsync(async(req,res)=>{
//   console.log('request ID in query: --', req.query )
//   console.log("recipeID: ", req.body.recipeId)
//   const recipe = await recipeService.getRecipe(req.body.recipeId);
//   res.json(recipe);
// })

// const createRecipe = catchAsync(async (req, res) => {
//   console.log('create recipe controller called');
//   const recipe = await recipeService.createUserCustomRecipe();
//   console.log('created recipe in controller: ', recipe);
//   res.json(recipe);
// });

/**
 * Add a product to cart
 *
 *
 */
// const addItemToRecipe = catchAsync(async (req, res) => {
//   //console.log('req body',req.body);
//   const recipe = await recipeService.addIngredient(
//     req.body.recipeId,
//     req.body.ingredientId,
//     req.body.weight
//   );

//   res.status(httpStatus.CREATED).json(recipe);
// });

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
// const updateItemInRecipe = catchAsync(async (req, res) => {
//   const recipe = await recipeService.updateIngredient(
//     req.body.recipeId,
//     req.body.ingredientId,
//     req.body.weight
//   );

//   if (req.body.weight) res.status(200).send(recipe);
//   else res.status(204).json(recipe);

  
// });


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
  createSchedule,getSchedule,deleteSchedule
};
