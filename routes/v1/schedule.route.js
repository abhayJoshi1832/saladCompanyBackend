const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const scheduleController = require("../../controllers/schedule.controller");


const router = express.Router();

router.post("/week",auth, scheduleController.createSchedule);

router.get("/month", auth, scheduleController.getSchedule);

router.delete("/month", auth, scheduleController.deleteSchedule );



// router.put(
//   "/checkout", auth,
//   cartController.checkout
// );

module.exports = router;
