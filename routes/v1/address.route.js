const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const addressService = require ("../../services/address.service");



const router = express.Router();

router.post("/create",auth, async(req,res) =>{

    

});


router.get("/month", auth, scheduleController.getSchedule);

router.delete("/month", auth, scheduleController.deleteSchedule );



// router.put(
//   "/checkout", auth,
//   cartController.checkout
// );

module.exports = router;
