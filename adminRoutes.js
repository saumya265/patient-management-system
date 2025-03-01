const express = require('express');
const { getAllUsers, getUserById, deleteUser, getAllAppointments, deleteAppointment } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware(['admin']), getAllUsers);
router.get('/users/:id', authMiddleware(['admin']), getUserById);
router.delete('/users/:id', authMiddleware(['admin']), deleteUser);
router.get('/appointments', authMiddleware(['admin']), getAllAppointments);
router.delete('/appointments/:id', authMiddleware(['admin']), deleteAppointment);

module.exports = router;