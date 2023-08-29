import { useState, useEffect } from "react";

import countriesService from "./services/countries";

import CountryView from "./components/CountryView";

const App = () => {
  const [query, setQuery] = useState("");
  const [names, setNames] = useState([]);
  const [showCountry, setShowCountry] = useState(false);

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
    setShowCountry(false);
  };

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
        
        <CountryView names={namesToShow} query={query} showCountry={showCountry} setShowCountry={setShowCountry}/>
      </div>
    </>
  );
};

export default App;
