const { createObjectCsvWriter } = require('csv-writer');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

const generateReport = async () => {
  const doctors = await User.countDocuments({ role: 'doctor' });
  const patients = await User.countDocuments({ role: 'patient' });
  const appointments = await Appointment.countDocuments();

  const csvWriter = createObjectCsvWriter({
    path: 'report.csv',
    header: [
      { id: 'doctors', title: 'Total Doctors' },
      { id: 'patients', title: 'Total Patients' },
      { id: 'appointments', title: 'Total Appointments' },
    ],
  });

  await csvWriter.writeRecords([{ doctors, patients, appointments }]);
  return 'report.csv';
};

module.exports = generateReport;