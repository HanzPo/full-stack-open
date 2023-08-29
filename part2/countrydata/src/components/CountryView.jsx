import CountryInfo from "./CountryInfo";
import { useEffect, useState } from "react";

const CountryView = ({ names, query, showCountry, setShowCountry }) => {

  const [selectedName, setSelectedName] = useState("");
  

  const handleShowClick = (currentName) => {
    setSelectedName(currentName);
    setShowCountry(true);
  }

  if (showCountry == true) {
    return <CountryInfo countryName={selectedName} />;
  }

  if (query === "") {
    return <div>Start typing to search for a country</div>;
  }

  if (names.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (names.length > 0) {
    return (
      <>
        {names.map((name) => (
          <div key={name}>
            {name}
            <button onClick={() => handleShowClick(name)} >show</button>
          </div>
        ))}
      </>
    );
  }

  return <div>No matches</div>;
};

export default CountryView;
