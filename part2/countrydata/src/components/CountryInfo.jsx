import countriesService from "../services/countries";
import { useState, useEffect } from "react";

const CountryInfo = ({ countryName }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getCountry(countryName).then((country) => {
      setSelectedCountry(country);
    });
  }, []);

  if (selectedCountry != null) {
    return (
      <>
        <h1>{selectedCountry.name.common}</h1>
        <div>capital {selectedCountry.capital[0]}</div>
        <div>area {selectedCountry.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(selectedCountry.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} />
      </>
    );
  }

  return <div>Loading...</div>;
};

export default CountryInfo;
