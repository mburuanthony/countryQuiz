import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../Assets/Styles/Challenge.css";
import { avatarContext } from "../avatarContext";
import { resultsContext } from "../resultsContext";

function Results() {
  const history = useHistory();

  const avatarimg = useContext(avatarContext);
  const [result, setResult] = useContext(resultsContext);

  const endGame = () => {
    setResult(0);
    history.push("/");
  };

  return (
    <div className="results">
      <img src={avatarimg.winner} alt="" className="avt" />
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
