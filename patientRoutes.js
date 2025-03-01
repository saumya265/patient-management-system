const express = require('express');
const { bookAppointment, getPatientAppointments, updateAppointment, requestDeleteAppointment } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { createPaymentIntent } = require('../utils/paymentService');


router.post('/appointments', authMiddleware(['patient']), bookAppointment);
router.get('/appointments', authMiddleware(['patient']), getPatientAppointments);
router.put('/appointments/:id', authMiddleware(['patient']), updateAppointment);
router.post('/appointments/request-delete/:id', authMiddleware(['patient']), requestDeleteAppointment);
router.post('/appointments/:id/pay', authMiddleware(['patient']), async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
  
      const clientSecret = await createPaymentIntent(appointment.fees);
      res.json({ clientSecret });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;