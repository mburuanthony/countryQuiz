import { useState, createContext, useContext } from "react";

const resultsContext = createContext({
  result: 0,
  setResult: () => {},
});

export const ResultsProvider = ({ children }) => {
  const [result, setResult] = useState(0);

  const value = {
    result,
    setResult,
  };

  return (
    <resultsContext.Provider value={value}>{children}</resultsContext.Provider>
  );
};

export const useResults = () => useContext(resultsContext);
