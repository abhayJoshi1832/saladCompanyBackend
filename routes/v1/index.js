const express = require("express");
const userRoute = require("./user.route");
const router = express.Router();
const authRoute = require("./auth.route");
const recipeRoute = require("./recipe.route");
const scheduleRoute = require("./schedule.route");
const addressRoute = require("./address.route");


router.use("/auth",authRoute);
//router.use("/products", productRoute);
router.use("/recipe", recipeRoute);
router.use('/users',userRoute);
router.use('/schedule',scheduleRoute);
router.use("/address", addressRoute);

module.exports = router;
