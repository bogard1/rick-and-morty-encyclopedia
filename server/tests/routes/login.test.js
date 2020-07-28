const request = require('supertest');
const app = require('../../server');

describe('login', () => {
  it('should return an error given bad password and username', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'fake',
        password: 'badpassword',
      });

    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
  })

  it('should return status ok given good credentials', async () => {
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