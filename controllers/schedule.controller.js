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
});


module.exports = {
  createSchedule,getSchedule,deleteSchedule
};
