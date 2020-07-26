
const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const deleteSessionCookie = () => deleteCookie('connect.sid');
  
const deleteSession = () => {
  localStorage.removeItem('isLogged');
  deleteSessionCookie();
};

export {
  deleteSession,
}
  