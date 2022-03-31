const { Ingredient } = require("../models");

/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getIngredientById = async (id) => {
  return Ingredient.findOne({id: id});
};

/**
 * Fetch all products
 * @returns {Promise<List<Products>>}
 */
const getIngredients = async () => {
  return Ingredient.find({});
};

module.exports = {
  getIngredientById,
  getIngredients,
};
