const express = require("express");

const {
  markAttendance,
  getAttendanceByEvent,
} = require("../controllers/attendanceController");

const {protect} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


router.post(
  "/mark",
  protect,
  authorize("admin", "organizer"),
  markAttendance
);

router.get(
  "/event/:eventId",
  protect,
  authorize("admin", "organizer"),
  getAttendanceByEvent
);


module.exports = router;