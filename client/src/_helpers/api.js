import { deleteSession } from './sessions';

const API_URL = 'http://localhost:3000';

const baseRequestOptions = {
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

const postRequest = (url, body) => {
  const requestOptions = {
    ...baseRequestOptions,
    method: 'POST',
    body: JSON.stringify(body),
  };

  return fetch(`${API_URL}${url}`, requestOptions).then(handleResponse);
};

const getRequest = (url, params) => {
  const requestOptions = {
    ...baseRequestOptions,
    method: 'GET',
  };

  const paramsSerialized = serializeParams(params);

  return fetch(`${API_URL}${url}?${paramsSerialized}`, requestOptions).then(handleResponse);
};

const serializeParams = (params) => {
  var str = [];

  for (var p in params) {
    if (params.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
  }
    
  return str.join("&");
}

const handleResponse = (response) => {
  const data = response.json();
  if (!response.ok) {
    console.log(response);

    console.log('[API] response is not ok.');
    if (response.status === 401) {
      deleteSession();
      location.reload(true);
      // return Promise.reject('Sesión expirada');
    }    
  }
  return data;
}

export {
  postRequest,
  getRequest,
};
