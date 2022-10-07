import axios from "axios";

const BASE_URL = "/api/persons";

export const addPersonDetails = (newPerson) => {
  return axios.post(BASE_URL, newPerson);
};

export const getPersonDetails = (setPersonsHandler) => {
  const promise = axios.get(BASE_URL);
  promise.then((response) => {
    setPersonsHandler(response.data);
  });
};

export const putPersonDetails = (id, newNumber) => {
  return axios.put(BASE_URL.concat(`/${id}`), {
    number: newNumber,
  });
};

export const deletePersonDetails = (id) => {
  return axios.delete(BASE_URL.concat(`/${id}`));
};

export default {
  addPersonDetails,
  getPersonDetails,
  putPersonDetails,
  deletePersonDetails,
};
