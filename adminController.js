const generateReport = require('../utils/generateReport');
const fs = require('fs');
const path = require('path');

const downloadReport = async (req, res) => {
  try {
    const filePath = await generateReport();
    res.download(path.resolve(filePath), 'report.csv', () => {
      fs.unlinkSync(filePath); // Delete the file after download
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { downloadReport };