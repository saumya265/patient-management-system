const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    email: {type: String, required: true, unique:true},
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum:['admin', 'doctor', 'patient'], required: true },
    specialization: {type: String, enum: ['nerves', 'heart', 'lungs', 'skin']},
    availableDays: [{ type: String, enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }],

});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  module.exports = mongoose.model('User', userSchema);