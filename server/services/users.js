var crypto = require('crypto-js');

const express = require('express')
const router = express.Router()

const redisClient = require('../utils/redis-client');

const encrypt = (pass) => {
  return crypto.SHA256(pass).toString(crypto.enc.Base64);
};

const createFirstUser = async () => {
  const username = 'summer';
  const summer = await redisClient.get(username);
  if (!summer) {
    const hash = encrypt('smith1111');
    await redisClient.set(username, hash);
  }
}

router.post('/login', async (req, res) => {
  // RGR: Agregamos un primer usuario por defecto para 
  await createFirstUser();

  const { username, password } = req.body;
  const storedPassword = await redisClient.get(username);

  const hash = encrypt(password);

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

  const hash = encrypt(password);

  await redisClient.set(username, hash);

  res.json({
    status: 'Usuario creado',
  });
});

module.exports = router;
