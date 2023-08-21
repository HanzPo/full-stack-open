import CountryInfo from "./CountryInfo";

const CountryView = ({ names, query }) => {
  if (query === "") {
    return <div>Start typing to search for a country</div>;
  }

  if (names.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (names.length > 1) {
    return (
      <>
        {names.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </>
    );
  }

  if (names.length === 0) {
    return <div>No matches</div>;
  }

  return <CountryInfo countryName={names[0]} />;
};

export default CountryView;
