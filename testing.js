const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'John', email: 'john@example.com', password: 'password', role: 'patient' });
    expect(res.statusCode).toEqual(201);
  });
});