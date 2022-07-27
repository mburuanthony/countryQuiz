import React from "react";
import { useHistory } from "react-router-dom";
import { useOptions } from "../context/optionsContext";
import { useResults } from "../context/resultsContext";

import "../Assets/Styles/Challenge.css";
import winner from "../Assets/Images/undraw_winners_ao2o2.svg";

function Results() {
  const history = useHistory();
  const { fetchAnotherCountry, setFetchAnotherCountry } = useOptions();
  const { result, setResult } = useResults();

  const endGame = () => {
    setResult(0);
    setFetchAnotherCountry(!fetchAnotherCountry);
    history.push("/");
  };

  return (
    <div className="results">
      <img src={winner} alt="avatar" className="avt" />
      <p className="title">Results</p>
      <p>
        You got <span className="res">{result}</span> correct answers(s)
      </p>

      <button className="try_again" onClick={endGame}>
        Try again
      </button>
    </div>
  );
}

export default Results;
