const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required:true,
    },
    calories: {
      type: Number,
      required:true,
    },
    total_fat: {
      type: String,
      required:true,
    },
    fiber: {
      type: String,
      required:true,
    },
    protein: {
      type: String,
      required:true,
    },
    carbohydrate: {
      type: String,
      required:true,
    },
  },
  {
    timestamps: false,
    collection: "ingredients"
  }
);

/**
 * @typedef Product
 */
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports.Ingredient = Ingredient;
module.exports.ingredientSchema = ingredientSchema;
