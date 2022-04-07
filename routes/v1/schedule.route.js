const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const { recipeController } = require("../../controllers");

const router = express.Router();

router.post("/week", );

router.get("/month", );

router.delete("/month", );



// router.put(
//   "/checkout", auth,
//   cartController.checkout
// );

module.exports = router;
