const Announcement = require("../models/Announcement");


// CREATE ANNOUNCEMENT
const createAnnouncement = async (req, res) => {
  try {
    const { title, message, event } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      event,
    });

    res.status(201).json({
      message: "Announcement created",
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ANNOUNCEMENTS
const getAnnouncements = async (req, res) => {
  try {
    const announcements =
      await Announcement.find().populate(
        "event",
        "title"
      );

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createAnnouncement,
  getAnnouncements,
};