const Registration = require("../models/Registration");
const Event = require("../models/Event");
const QRCode = require("qrcode");


// REGISTER FOR EVENT
const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check duplicate
    const existing = await Registration.findOne({
      user: req.user.id,
      event: eventId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already registered",
      });
    }

    // Generate QR
    const qrData = `USER:${req.user.id}-EVENT:${eventId}`;

    const qrCode = await QRCode.toDataURL(qrData);

    const registration = await Registration.create({
      user: req.user.id,
      event: eventId,
      qrCode,
    });

    res.status(201).json({
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// MY EVENTS
const myRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id,
    }).populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CANCEL REGISTRATION
const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(
      req.params.id
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      message: "Registration cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getAllRegistrations =
  async (req, res) => {

    try {

      const registrations =
        await Registration.find()

          .populate(
            "user",
            "name email"
          )

          .populate(
            "event",
            "title date"
          );

      res.status(200).json(
        registrations
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
};

module.exports = {
  registerForEvent,
  myRegistrations,
  cancelRegistration,
    getAllRegistrations,
};