// import config from 'config';
import { deleteSession, getRequest } from '../_helpers';

const getCharacters = page => {
  if (!page) {
    page = 1;
  }

  return getRequest('/characters', { page });
}

export const charactersService = {
  getCharacters,
};
