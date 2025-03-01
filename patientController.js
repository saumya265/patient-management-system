const Appointment = require('../models/Appointment');
const redisClient = require('../services/redisService');

const requestDeleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    // Store deletion request in Redis
    await redisClient.lPush('appointmentDeletionRequests', id);
    res.json({ message: 'Deletion request submitted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { requestDeleteAppointment };