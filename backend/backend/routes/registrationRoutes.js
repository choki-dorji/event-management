const express = require("express");

const {
  registerForEvent,
  myRegistrations,
  cancelRegistration,
  getAllRegistrations,
} = require("../controllers/registrationController");

const {protect, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/all",
  protect,
  authorize("admin", "organizer"),
  getAllRegistrations
);

router.post("/", protect, registerForEvent);

router.get("/my-events", protect, myRegistrations);

router.delete("/:id", protect, cancelRegistration);


module.exports = router;