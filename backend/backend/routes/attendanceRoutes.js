const express = require("express");

const {
  markAttendance,
  getAttendanceByEvent,
   getOrganizerAttendance,
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
  
  getAttendanceByEvent
);

router.get(
  "/organizer",
  protect,
  authorize("organizer"),
  getOrganizerAttendance
);


module.exports = router;