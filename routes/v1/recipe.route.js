const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const cartValidation = require("../../validations/cart.validation");
const { recipeController } = require("../../controllers");

const router = express.Router();

router.get("/items", recipeController.getAllItems);

router.get("/", auth, recipeController.getRecipe);

router.post("/create", auth, recipeController.createRecipe);

router.post(
  "/", auth,
  recipeController.addItemToRecipe
);

router.put(
  "/", auth,
  recipeController.updateItemInRecipe
);

// router.put(
//   "/checkout", auth,
//   cartController.checkout
// );

module.exports = router;
