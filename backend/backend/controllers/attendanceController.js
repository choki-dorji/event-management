const Registration = require("../models/Registration");
const Event = require("../models/Event");

// MARK ATTENDANCE
const markAttendance = async (req, res) => {
  try {
    const { registrationId } = req.body;

    const registration =
      await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    registration.attendanceStatus = true;

    await registration.save();

    res.status(200).json({
      message: "Attendance marked",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET EVENT ATTENDANCE
const getAttendanceByEvent = async (req, res) => {
  try {
    const attendance = await Registration.find({
      event: req.params.eventId,
    })
      .populate("user", "name email")
      .populate("event", "title");

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL ATTENDANCE FOR ORGANIZER EVENTS
const getOrganizerAttendance = async (req, res) => {
  try {

    // logged in organizer id
    const organizerId = req.user.id;

    // find all events created by organizer
    const events = await Event.find({
      organizer: organizerId,
    });

    // extract event ids
    const eventIds = events.map(
      (event) => event._id
    );

    // find registrations for those events
    const attendance =
      await Registration.find({
        event: {
          $in: eventIds,
        },
      })
        .populate(
          "user",
          "name email"
        )
        .populate(
          "event",
          "title date venue"
        );

    res.status(200).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByEvent,
  getOrganizerAttendance,
};

