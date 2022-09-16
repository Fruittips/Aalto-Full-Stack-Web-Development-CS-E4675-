import { useState, useEffect } from "react";
import {
  addDetailsRequest,
  getDetailsRequest,
  putDetailsRequest,
  deleteDetailsRequest,
} from "./AxiosRequests";

const Filter = ({ searchPersons }) => {
  return (
    <>
      <label>filter shown with</label>
      <input onChange={searchPersons} />
    </>
  );
};

const PersonForm = ({
  addDetails,
  setNewNameHandler,
  setNewNumberHandler,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addDetails}>
      <div>
        name:
        <input
          value={newName}
          onChange={(event) => setNewNameHandler(event.target.value)}
        />
        <br />
        number:
        <input
          value={newNumber}
          onChange={(event) => setNewNumberHandler(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({
  persons,
  newSearch,
  setPersonsHandler,
  setIsDeletedHandler,
}) => {
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const onDelete = (event) => {
    const selectedPerson = persons.filter(
      (person) => person.id == event.target.value
    );

    if (window.confirm(`Delete ${selectedPerson[0].name}?`)) {
      deleteDetailsRequest(event.target.value)
        .then(() => {
          let updatedPersons = persons.filter(
            (person) => person.id != event.target.value
          );
          setPersonsHandler(updatedPersons);
          setIsDeletedHandler({ deleted: true, name: selectedPerson[0].name });
        })
        .then(
          setTimeout(() => {
            setIsDeletedHandler({
              deleted: false,
              name: selectedPerson[0].name,
            });
          }, 5000)
        )
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (newSearch.length > 0) {
    return (
      <>
        {filteredPersons.map((person) => (
          <div>
            <label key={person.name}>
              {person.name} {person.number}
            </label>
            <button value={person.id} onClick={onDelete}>
              delete
            </button>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        {persons.map((person) => (
          <div>
            <label key={person.name}>
              {person.name} {person.number}
            </label>
            <button value={person.id} onClick={onDelete}>
              delete
            </button>
          </div>
        ))}
      </>
    );
  }
};

const AddedMessage = ({ name }) => {
  const addedMessageStyle = {
    color: "green",
    fontSize: 24,
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: "5",
    width: "100%",
    padding: 30,
    margin: "5",
    backgroundColor: "grey",
  };
  return (
    <div style={addedMessageStyle}>
      <p>Added {name} </p>
    </div>
  );
};

const DeletedMessage = ({ name }) => {
  const deletedMessageStyle = {
    color: "red",
    fontSize: 24,
    borderStyle: "solid",
    borderColor: "red",
    borderRadius: "5",
    width: "100%",
    margin: "5",
    backgroundColor: "grey",
  };
  return (
    <div style={deletedMessageStyle}>
      <p>Information of {name} has already been removed from server</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [isAdded, setIsAdded] = useState({ added: false, name: "" });
  const [isDeleted, setIsDeleted] = useState({ deleted: false, name: "" });

  const addDetails = (event) => {
    event.preventDefault();
    const existingUser = persons.filter((person) => person.name === newName);
    let isExists = existingUser.length !== 0;
    if (isExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        existingUser[0]["number"] = newNumber;
        putDetailsRequest(existingUser[0].id, existingUser[0])
          .then((response) => {
            persons.map((person) => {
              if (person.id === response.data.id) {
                person["number"] = newNumber;
              }
            });
            setPersons(persons);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    addDetailsRequest(newPerson)
      .then((response) => {
        newPerson["id"] = response.data.id;
        setPersons([...persons, newPerson]);
        setNewName("");
        setNewNumber("");
        setIsAdded({ added: true, name: newPerson.name });
      })
      .then(
        setTimeout(() => {
          setIsAdded({ added: false, name: newPerson.name });
        }, 5000)
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const searchPersons = (event) => {
    setNewSearch(event.target.value);
  };

  useEffect(() => {
    getDetailsRequest(setPersons);
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {isAdded.added ? <AddedMessage name={isAdded.name} /> : null}
      {isDeleted.deleted ? <DeletedMessage name={isDeleted.name} /> : null}
      <Filter searchPersons={searchPersons} />
      <h2>add a new</h2>
      <PersonForm
        addDetails={addDetails}
        setNewNameHandler={setNewName}
        setNewNumberHandler={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newSearch={newSearch}
        setPersonsHandler={setPersons}
        setIsDeletedHandler={setIsDeleted}
      />
    </div>
  );
};

export default App;
