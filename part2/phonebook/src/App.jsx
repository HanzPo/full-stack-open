import { useState, useEffect } from "react";
import axios from "axios";

import phonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((phoneNumbers) => setPersons(phoneNumbers));
  }, []);

  const personsToShow =
    nameFilter === ""
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().includes(nameFilter.toLowerCase());
        });

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let exists = false;

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    persons.forEach((person) => {
      if (JSON.stringify(person.name) === JSON.stringify(personObject.name)) {
        alert(`${newName} is already added to phonebook`);
        exists = true;
      }
    });

    setNewName("");
    setNewNumber("");

    if (exists === true) {
      return;
    }

    phonebookService
      .create(personObject)
      .then((returnedObject) => setPersons(persons.concat(returnedObject)));
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
