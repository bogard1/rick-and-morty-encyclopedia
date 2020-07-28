'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require('cors')

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const redisStore = require('connect-redis')(session);

const usersService = require('./services/users');
const charactersService = require('./services/characters');

const { authMiddleware } = require('./middlewares/auth');

// Constants
const { PORT } = process.env;

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true,
}))

const sess = {
  secret: 'pWfjMvl4QlMsUuJvBzH0seGOvqNjO0Ykhf6J8L1d7aAgmwAebs3NSBzloB5TTBt',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: new redisStore({
    host: process.env.REDIS_UR,
    port: 6379,
    client: redisClient,
    // La session dura 2 minutos.
    ttl: 120,
    disableTouch: true,
  }),
}

app.use(session(sess))

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', usersService);
app.use('/characters', authMiddleware, charactersService);

app.listen(PORT, '0.0.0.0');
console.log('Corriendo');

module.exports = app
