const { Ingredient } = require("../models/ingredient.model");

/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getIngredientById = async (id) => {
  return await Ingredient.findOne({id: id});
};

/**
 * Fetch all products
 * @returns {Promise<List<Products>>}
 */
const getIngredients = async () => {
  //console.log("ingedients service", Ingredient);
  const result = await Ingredient.find({});
  
  return result;
};

module.exports = {
  getIngredientById,
  getIngredients,
};
