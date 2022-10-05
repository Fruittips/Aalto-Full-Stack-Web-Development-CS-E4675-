import axios from "axios";

const baseUrl = "/api/persons";

export const addDetailsRequest = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

export const getDetailsRequest = (setPersonsHandler) => {
  const promise = axios.get(baseUrl);
  promise.then((response) => {
    setPersonsHandler(response.data);
  });
};

export const putDetailsRequest = (id, newPerson) => {
  return axios.put(baseUrl.concat(`/${id}`), newPerson);
};

export const deleteDetailsRequest = (id) => {
  return axios.delete(baseUrl.concat(`/${id}`));
};

export default {
  addDetailsRequest,
  getDetailsRequest,
  putDetailsRequest,
  deleteDetailsRequest,
};
