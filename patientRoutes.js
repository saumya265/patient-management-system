const express = require('express');
const { bookAppointment, getPatientAppointments, updateAppointment, requestDeleteAppointment } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/appointments', authMiddleware(['patient']), bookAppointment);
router.get('/appointments', authMiddleware(['patient']), getPatientAppointments);
router.put('/appointments/:id', authMiddleware(['patient']), updateAppointment);
router.post('/appointments/request-delete/:id', authMiddleware(['patient']), requestDeleteAppointment);

module.exports = router;