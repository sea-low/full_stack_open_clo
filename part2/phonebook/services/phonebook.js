import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const personDTO = {
    name: newPerson.name,
    number: newPerson.number,
    id: newPerson.id,
  };
  const request = axios.post(baseUrl, personDTO);
  return request.then((response) => response.data);
};

const update = (person, newPerson) => {
  const request = axios.put(`${baseUrl}/${person.id}`, newPerson);
  return request.then((response) => response.data);
};

const eliminate = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, eliminate };
