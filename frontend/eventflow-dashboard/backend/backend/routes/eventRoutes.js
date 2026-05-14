const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require("../controllers/eventController");

const {protect} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");



const router = express.Router();


// GET ALL EVENTS
router.get("/", getEvents);



router.get(
  "/my-events",
  protect,
  authorize("organizer", "admin"),
  getMyEvents
);

// GET SINGLE EVENT
router.get("/:id", getEventById);



// CREATE EVENT
router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  upload.single("image"),
  createEvent
);


// UPDATE EVENT
router.put(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  upload.single("image"),
  updateEvent
);


// DELETE EVENT
router.delete(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  deleteEvent
);


module.exports = router;