const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalEvents = await Event.countDocuments();

    const totalRegistrations =
      await Registration.countDocuments();

    const totalAttendance =
      await Registration.countDocuments({
        attendanceStatus: true,
      });

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalRegistrations,
      totalAttendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  dashboardStats,
};