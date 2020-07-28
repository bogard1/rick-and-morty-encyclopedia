const charactersService = require('../../services/characters');

const request = require('supertest');
const express = require('express');

const app = express();
app.use('/characters', charactersService);

describe('characters', () => {
  it('should return a list of characters whith name, status, gender and image', async () => {
    const res = await request(app)
      .get('/characters/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('characters');

    res.body.characters.forEach(character => {
      expect(character).toHaveProperty('name');
      expect(character).toHaveProperty('status');
      expect(character).toHaveProperty('gender');
      expect(character).toHaveProperty('image');
    });
  })
})
