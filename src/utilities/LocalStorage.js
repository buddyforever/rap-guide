export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, value);
}

export const clearLocalStorage = (name) => {
  return localStorage.removeItem(name);
}

export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
}