const sendEmail = require('../utils/emailService');

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDateTime, symptoms } = req.body;
    const appointment = new Appointment({ patientId: req.user.userId, doctorId, appointmentDateTime, symptoms });
    await appointment.save();

    // Send email to patient
    const patient = await User.findById(req.user.userId);
    await sendEmail(patient.email, 'Appointment Booked', 'Your appointment is booked for ${appointmentDateTime}');

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};