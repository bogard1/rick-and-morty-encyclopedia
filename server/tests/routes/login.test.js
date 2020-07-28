const request = require('supertest');
const app = require('../../server');

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'fake',
        password: 'badpassword',
      });

    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
  })

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'summer',
        password: 'smith1111',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
  })
})