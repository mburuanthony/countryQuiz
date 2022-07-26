import { useState, createContext, useContext } from "react";

const countryContext = createContext({
  country: {},
  setCountry: () => {},
  fetchAnotherCountry: false,
  setFetchAnotherCountry: () => {},
});

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState({});
  const [fetchAnotherCountry, setFetchAnotherCountry] = useState(false);

  const value = {
    country,
    setCountry,
    fetchAnotherCountry,
    setFetchAnotherCountry,
  };

  return (
    <countryContext.Provider value={value}>{children}</countryContext.Provider>
  );
};

export const useCountry = () => useContext(countryContext);
