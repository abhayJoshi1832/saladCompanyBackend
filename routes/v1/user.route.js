const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();
const authMiddleWare = require('../../middlewares/auth')

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`


// router.use('/:userId',validate(userValidation.getUser))

router.get('/:userId',authMiddleWare, validate(userValidation.getUser), userController.getUser);

// const auth = require("../../middlewares/auth");

router.put(
  "/:userId",
  authMiddleWare,
  validate(userValidation.setAddress),
  userController.setAddress
);

module.exports = router;
