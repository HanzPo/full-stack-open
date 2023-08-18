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
    let replace = false;
    let replaceId = null;

    const personObject = {
      name: newName,
      number: newNumber,
    };

    persons.forEach((person) => {
      if (JSON.stringify(person.name) === JSON.stringify(personObject.name)) {
        replace = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        replaceId = person.id;
        exists = true;
      }
    });

    setNewName("");
    setNewNumber("");

    if (exists) {
      if (replace) {
        phonebookService
          .update(replaceId, personObject)
          .then((returnedObject) =>
            setPersons(
              persons.map((person) =>
                person.id === replaceId ? returnedObject : person
              )
            )
          );
      }

      return;
    }

    phonebookService
      .create(personObject)
      .then((returnedObject) => setPersons(persons.concat(returnedObject)));
  };

  const removePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      phonebookService.remove(id);

      setPersons(persons.filter((person) => person.id != id));
    }
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

      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
