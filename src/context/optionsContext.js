import { useState, createContext, useContext } from "react";

const optionsContext = createContext({
  option1: "",
  option2: "",
  option3: "",
  setOption1: () => {},
  setOption2: () => {},
  setOption3: () => {},
});

export const OptionsProvider = ({ children }) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const value = {
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
