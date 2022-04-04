const mongoose = require('mongoose');
const {ingredientSchema} = require('./ingredient.model');
const config = require("../config/config")

// TODO: CRIO_TASK_MODULE_CART - Complete cartSchema, a Mongoose schema for "carts" collection
const recipeSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    default: ""
  },
  recipeItems: [{
    ingredient: {type: ingredientSchema},
    weight: {
      type: Number,
      required: true
    }
  }],
  recipeName: {
    type: String,
    default: ""
  },
  macros:{
    protein: {type: Number, default: 0.0},
    total_fat: {type: Number, default: 0.0},
    carbohydrate: {type: Number, default: 0.0},
    calories: {type: Number, default: 0.0},
    fiber: {type: Number, default: 0.0}
  }


}, {
  timestamps: false,
  collection: "customrecipes"
});

recipeSchema.pre('save', function(next){  
  
  // const macrosTotal = this.recipeItems.reduce(
  //   (previousValue, currentValue) =>{
  //     total = {}

  //     previousValue.protein
  //     previousValue + currentValue}    
  //   ,    
  //   {protein: 0, fats: 0, carbohydrate:0, calories:0, fiber:0}
  // );

  const doc = this;

  //console.log("Recipe Items::: ----",doc)

  if((!doc.recipeItems)) next();


  const macrosTotal = doc.recipeItems.reduce((prev, current) => {

    console.log('current: ', current);
    console.log('prev at beginning: ', prev);
    

    for (let k in prev) {
        const eachMacro = Number(parseFloat(current.ingredient[k])*(current.weight/100)).toFixed(2);
        
        prev[k] = Number((Number(prev[k]) + Number(eachMacro))).toFixed(2);
        prev[k] = Number(prev[k]);
        console.log("eachMacro: ",eachMacro, k, "prev[k] : ", prev[k]);
      
    }
    console.log("line 68: prev at end",prev);
    return prev;
  }, {protein: 0.0, total_fat: 0.0, carbohydrate:0.0, calories:0.0, fiber:0.0});

  console.log(macrosTotal);

  doc.macros = macrosTotal;
  next();
})


/**
 * @typedef Cart
 */
const CustomRecipe = mongoose.model('customrecipe', recipeSchema);

module.exports.CustomRecipe = CustomRecipe;