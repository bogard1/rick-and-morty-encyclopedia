const axios = require('axios').default;
const express = require('express')

const router = express.Router()

const CHARACTERS_ENDPOINT = `https://rickandmortyapi.com/api/character/`;

router.get('/', async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const url = `${CHARACTERS_ENDPOINT}?page=${page}`;
  console.log(url);
  
  const response = await axios.get(url);

  const results = response.data.results.map(formatCharacter);

  res.json({ characters: results });
});

const formatCharacter = character => {
  const { name, status, species, gender, image } = character;
  return { name, status, species, gender, image };
}

module.exports = router;
