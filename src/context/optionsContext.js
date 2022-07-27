import { useState, createContext, useContext } from "react";

const optionsContext = createContext({
  country: {},
  setCountry: () => {},
  fetchAnotherCountry: false,
  setFetchAnotherCountry: () => {},
  option1: "",
  option2: "",
  option3: "",
  setOption1: () => {},
  setOption2: () => {},
  setOption3: () => {},
});

export const OptionsProvider = ({ children }) => {
  const [country, setCountry] = useState({});
  const [fetchAnotherCountry, setFetchAnotherCountry] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const value = {
    country,
    setCountry,
    fetchAnotherCountry,
    setFetchAnotherCountry,
    option1,
    option2,
    option3,
    setOption1,
    setOption2,
    setOption3,
  };

  return (
    <optionsContext.Provider value={value}>{children}</optionsContext.Provider>
  );
};

export const useOptions = () => useContext(optionsContext);
