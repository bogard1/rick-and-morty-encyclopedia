var crypto = require('crypto-js');

const express = require('express')
const router = express.Router()

const redisClient = require('../utils/redis-client');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const storedPassword = await redisClient.get(username);
  
  const hash = crypto.SHA256(password).toString(crypto.enc.Base64);

  if (storedPassword && storedPassword === hash) {
    req.session.isLogged = true;
    return res.json({
      status: 'ok',
    });
  }

  return res.status(400).json({
    error: 'Usuario o password incorrectos',
  });
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await redisClient.get(username);

  if (user) {
    res.status(400).json({
        error: 'Usuario ya existente',
    });
  }

  const hash = crypto.SHA256(password).toString(crypto.enc.Base64);

  await redisClient.set(username, hash);

  res.json({
    status: 'Usuario creado',
  });
});

module.exports = router;
