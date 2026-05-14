const express = require("express");

const {
  createAnnouncement,
  getAnnouncements,
} = require("../controllers/announcementController");

const {protect} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  createAnnouncement
);

router.get("/", getAnnouncements);


module.exports = router;