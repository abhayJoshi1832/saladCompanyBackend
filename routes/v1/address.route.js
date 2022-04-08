const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const addressController = require("../../controllers/address.controller");



const router = express.Router();


router.post("/create", auth, addressController.createAddressDb);

router.get("/", auth, addressController.getAddresses);

router.post("/add", auth, addressController.add);

router.delete("/", auth, addressController.deleteUserAddress);

//router.post("/edit",auth, addressController.changeUserAddress);

router.put("/changedefault", auth, addressController.changeUserDefault);


// router.put(
//   "/checkout", auth,
//   cartController.checkout
// );

module.exports = router;
