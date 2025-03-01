const cron = require('node-cron');
const redisClient = require('./services/redisService');
const Appointment = require('./models/Appointment');

// Cron job to process deletion requests every 2 minutes
cron.schedule('*/2 * * * *', async () => {
  try {
    const requests = await redisClient.lRange('appointmentDeletionRequests', 0, -1);
    if (requests.length > 0) {
      await Appointment.deleteMany({ _id: { $in: requests } });
      await redisClient.del('appointmentDeletionRequests');
      console.log('Processed deletion requests:', requests);
    }
  } catch (err) {
    console.error('Error processing deletion requests:', err);
  }
});