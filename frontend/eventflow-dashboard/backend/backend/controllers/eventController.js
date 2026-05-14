const Event = require("../models/Event");


// CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      venue,
      date,
      capacity,
      category
    } = req.body;
    const image = req.file
  ? `/uploads/${req.file.filename}`
  : "";

    const event = await Event.create({
      title,
      description,
      venue,
      date,
      capacity,
      image,
      category,
      organizer: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL EVENTS
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate(
  "organizer",
  "_id name email"
)

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE EVENT
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(
      req.params.id
    ).populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE EVENT
const updateEvent = async (req, res) => {
  try {

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      });
    }


    // Only organizer or admin
    if (
      event.organizer.toString() !==
        req.user.id &&
      req.user.role !== "admin"
    ) {

      return res.status(403).json({
        message: "Access denied",
      });
    }


    // IMAGE UPDATE
    if (req.file) {

      req.body.image =
        `/uploads/${req.file.filename}`;
    }


    const updatedEvent =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );


    res.status(200).json({
      message:
        "Event updated successfully",

      updatedEvent,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE EVENT
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Only organizer or admin
    if (
      event.organizer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyEvents =
  async (req, res) => {

    try {

      const events =
        await Event.find({
          organizer: req.user.id,
        });

      res.status(200).json(
        events
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
};