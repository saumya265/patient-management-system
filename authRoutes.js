const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;

const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password', role: 'patient' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User registered successfully');
  });

  it('should login a user', async () => {
    await request(app)
      .post('/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password', role: 'patient' });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});