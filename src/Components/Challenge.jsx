import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useOptions } from "../context/optionsContext";
import { useResults } from "../context/resultsContext";
import "../Assets/Styles/Challenge.css";

function Challenge() {
  const [count, setCount] = useState(0);
  const [shuffled, setShuffled] = useState([]);
  const { country, fetchAnotherCountry, setFetchAnotherCountry } = useOptions();
  const { name, capital, flag } = { ...country };
  const { option1, option2, option3 } = useOptions();
  const { result, setResult } = useResults();

  const history = useHistory();
  const capitalRef = useRef();
  const flagRef = useRef();
  const option1Ref = useRef();
  const option2Ref = useRef();
  const option3Ref = useRef();
  const option4Ref = useRef();
  const option1SpanRef = useRef();
  const option2SpanRef = useRef();
  const option3SpanRef = useRef();
  const option4SpanRef = useRef();

  const disableOPtions = (option) => {
    option1Ref.current.disabled = option;
    option2Ref.current.disabled = option;
    option3Ref.current.disabled = option;
    option4Ref.current.disabled = option;
  };

  const getAnotherCountry = () => {
    setFetchAnotherCountry(!fetchAnotherCountry);
    disableOPtions(false);

    option1Ref.current.style.cssText = styles.cleared;
    option2Ref.current.style.cssText = styles.cleared;
    option3Ref.current.style.cssText = styles.cleared;
    option4Ref.current.style.cssText = styles.cleared;

    setCount(count + 1);
  };

  const goToResults = () => {
    setCount(0);
    history.push("/results");
  };

  if (count === 3) {
    capitalRef.current.style.display = "none";
    flagRef.current.style.display = "block";
  }

  useEffect(() => {
    const answers = [name, option1, option2, option3];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    setShuffled(shuffledAnswers.reverse());
  }, [name, option1, option2, option3]);

  option1SpanRef.current = shuffled[0];
  option2SpanRef.current = shuffled[1];
  option3SpanRef.current = shuffled[2];
  option4SpanRef.current = shuffled[3];

  const checkAnswer = (answerRef) => {
    if (answerRef.current?.childNodes[1].textContent === name) {
      answerRef.current.style.cssText = styles.correct;
      answerRef.current.childNodes[2].className = "far fa-check-circle";
      setResult(result + 1);
    } else {
      setResult((prevRes) => prevRes);

      answerRef.current.style.cssText = styles.fail;
      answerRef.current.childNodes[2].className = "far fa-times-circle";
    }

    disableOPtions(true);
  };

  return (
    <div className="challenge">
      <div className="question">
        <div id="capital" ref={capitalRef}>
          <p>{capital} is the capital of ?</p>
        </div>

        <div id="flag" ref={flagRef}>
          <img src={flag} alt="flag" />
          <p>Which country does this flag belong to?</p>
        </div>
      </div>

      <div className="options">
        <button
          className="option1"
          ref={option1Ref}
          onClick={() => checkAnswer(option1Ref)}
        >
          <span>A</span>
          <span>{option1SpanRef.current}</span>
          <i></i>
        </button>
        <button
          className="option2"
          ref={option2Ref}
          onClick={() => checkAnswer(option2Ref)}
        >
          <span>B</span>
          <span>{option2SpanRef.current}</span>
          <i></i>
        </button>
        <button
          className="option3"
          ref={option3Ref}
          onClick={() => checkAnswer(option3Ref)}
        >
          <span>C</span>
          <span>{option3SpanRef.current}</span>
          <i id="check"></i>
        </button>
        <button
          className="option4"
          ref={option4Ref}
          onClick={() => checkAnswer(option4Ref)}
        >
          <span>D</span>
          <span>{option4SpanRef.current}</span>
          <i></i>
        </button>
      </div>

      <button
        className="next"
        onClick={count === 4 ? goToResults : getAnotherCountry}
      >
        next
      </button>
    </div>
  );
}

const styles = {
  cleared:
    "background-color:transparent;border: 2px solid rgba(96, 102, 208, 0.7);",
  correct: "background-color:#60BF88; border:none; color:#fff;",
  fail: "background-color:#EA8282; border:none;color:#fff;",
};

export default Challenge;
