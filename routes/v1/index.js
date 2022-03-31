const express = require("express");
const userRoute = require("./user.route");

const router = express.Router();
// router.all('/:var', (req,res) => {
//     console.log('received v1 req', req.url, req.params)
//     res.end();
// });
// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Reroute all API requests beginning with the `/v1/users` route to Express router in user.route.js
// TODO: CRIO_TASK_MODULE_AUTH - Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js 

const authRoute = require("./auth.route");
//const productRoute = require("./product.route");
const recipeRoute = require("./recipe.route");


router.use("/auth",authRoute);
//router.use("/products", productRoute);
router.use("/recipe", recipeRoute);
router.use('/users',userRoute);

module.exports = router;
