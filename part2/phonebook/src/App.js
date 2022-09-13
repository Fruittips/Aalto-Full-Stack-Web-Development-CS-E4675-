import { useState } from "react";

const Filter = ({ searchPersons }) => {
  return <input onChange={searchPersons} />;
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

const Persons = ({ persons, newSearch }) => {
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  if (newSearch.length > 0) {
    return (
      <>
        {filteredPersons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </>
    );
  } else {
    return (
      <>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </>
    );
  }
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addDetails = (event) => {
    event.preventDefault();
    let isExists =
      persons.filter((person) => person.name === newName).length !== 0;
    if (isExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
  };

  const searchPersons = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
