const mongoose = require('mongoose');
const {ingredientSchema} = require('./ingredient.model');
const config = require("../../config/config")

// TODO: CRIO_TASK_MODULE_CART - Complete cartSchema, a Mongoose schema for "carts" collection
const recipeSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    default: ""
  },
  recipeItems: [{
    ingredient: ingredientSchema,
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
    protein: {type: Number, default: 0},
    fats: {type: Number, default: 0},
    carbohydrates: {type: Number, default: 0},
    calories: {type: Number, default: 0},
    fibre: {type: Number, default: 0}
  }


}, {
  timestamps: false,
  collection: customRecipes
});

recipeSchema.pre('save', function(doc){  
  // const macros = array1.reduce(
  //   (previousValue, currentValue) =>{
  //     total = {}

  //     previousValue.protein
  //     previousValue + currentValue}
    
    
    
  //   ,    
  //   {protein: 0, fats: 0, carbohydrates:0, calories:0, fibre:0}
  // );

  const macros = doc.recipeItems.reduce((prev, current) => {
    for (let k in prev) {
      if (current.ingredient.hasOwnProperty(k))
        prev[k] += parseFloat(current.ingredient[k]*current.weight/100);
    }
    return prev;
  }, {protein: 0, fats: 0, carbohydrates:0, calories:0, fibre:0});

  doc.macros = macros

  return

})


/**
 * @typedef Cart
 */
const customRecipe = mongoose.model('Custome Recipe', recipeSchema);

module.exports.Cart = Cart;