const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const cartValidation = require("../../validations/cart.validation");
const { recipeController } = require("../../controllers");

const router = express.Router();

router.get("/items", recipeController.getAllItems);

router.post("/create", recipeController.createRecipe);

router.post(
  "/",
  recipeController.addItemToRecipe
);

router.put(
  "/",
  recipeController.updateItemInRecipe
);

// router.put(
//   "/checkout", auth,
//   cartController.checkout
// );

module.exports = router;
