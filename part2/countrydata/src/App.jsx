import { useState, useEffect } from "react";

import countriesService from "./services/countries";

import CountryView from "./components/CountryView";

const App = () => {
  const [query, setQuery] = useState("");
  const [names, setNames] = useState([]);

  const namesToShow = names.filter((country) =>
    country.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    countriesService.getAll().then((countryData) => {
      setNames(countryData.map((country) => country.name.common).sort());
    });
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
        
        <CountryView names={namesToShow} query={query} />
      </div>
    </>
  );
};

export default App;
