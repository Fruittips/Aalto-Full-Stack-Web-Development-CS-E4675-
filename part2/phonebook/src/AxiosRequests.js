import axios from "axios";

export const addDetailsRequest = (newPerson) => {
  return axios.post("http://localhost:3001/persons", newPerson);
};

export const getDetailsRequest = (setPersonsHandler) => {
  const promise = axios.get("http://localhost:3001/persons");
  promise.then((response) => {
    setPersonsHandler(response.data);
  });
};

export const putDetailsRequest = (id, newPerson) => {
  return axios.put(`http://localhost:3001/persons/${id}`, newPerson);
};

export const deleteDetailsRequest = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`);
};

export default {
  addDetailsRequest,
  getDetailsRequest,
  putDetailsRequest,
  deleteDetailsRequest,
};
