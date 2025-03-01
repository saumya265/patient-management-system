const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDateTime: { type: Date, required: true },
  symptoms: { type: String, required: true },
  fees: { type: Number },
  prescription: { type: String },
  isDiagnosisDone: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);