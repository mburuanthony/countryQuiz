import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../Assets/Styles/Challenge.css";
import { avatarContext } from "../avatarContext";
import { countriesContext } from "../countriesContext";
import { optionsContext } from "../optionsContext";
import { resultsContext } from "../resultsContext";

function Challenge() {
  const [count, setCount] = useState(1);

  const avatarimg = useContext(avatarContext);
  const [country, setCountry] = useContext(countriesContext);
  const [option1, option2, option3, setOption1, setOption2, setOption3] =
    useContext(optionsContext);
  const [result, setResult] = useContext(resultsContext);

  const markCorrect = () => {
    document.querySelector(".option3").style.cssText =
      "background-color:#60BF88; border:none; color:#fff;";
    setResult(result + 1);
  };

  const markWrong1 = () => {
    document.querySelector(".option1").style.cssText =
      "background-color:#EA8282; border:none; color:#fff;";

    document.querySelector(".option3").style.cssText =
      "background-color:#60BF88; border:none; color:#fff;";
  };

  const markWrong2 = () => {
    document.querySelector(".option2").style.cssText =
      "background-color:#EA8282;border:none; color:#fff;";

    document.querySelector(".option3").style.cssText =
      "background-color:#60BF88; border:none; color:#fff;";
  };

  const markWrong4 = () => {
    document.querySelector(".option4").style.cssText =
      "background-color:#EA8282; border:none;color:#fff;";

    document.querySelector(".option3").style.cssText =
      "background-color:#60BF88; border:none;color:#fff;";
  };

  const getAnotherCountry = () => {
    setCount(count + 1);

    document.querySelector(".option1").style.cssText =
      "background-color:transparent;border: 2px solid rgba(96, 102, 208, 0.7);";

    document.querySelector(".option2").style.cssText =
      "background-color:transparent;border: 2px solid rgba(96, 102, 208, 0.7);";

    document.querySelector(".option3").style.cssText =
      "background-color:transparent;border: 2px solid rgba(96, 102, 208, 0.7);";

    document.querySelector(".option4").style.cssText =
      "background-color:transparent;border: 2px solid rgba(96, 102, 208, 0.7);";

    const Xhr = new XMLHttpRequest();
    Xhr.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all",
      true
    );
    Xhr.onload = function () {
      const data = JSON.parse(this.response);
      const randomNumber = Math.floor(Math.random() * data.length);
      const Country = data[randomNumber];
      setCountry(Country);
      setOption1(data[Math.floor(Math.random() * data.length)].name);
      setOption2(data[Math.floor(Math.random() * data.length)].name);
      setOption3(data[Math.floor(Math.random() * data.length)].name);
    };
    Xhr.send();
  };

  if (count === 3) {
    document.querySelector("#capital").style.display = "none";
    document.querySelector("#flag").style.display = "block";
  }

  if (count === 5) {
    document.querySelector(".next").style.display = "none";
    document.querySelector(".see_res").style.display = "block";
  }

  return (
    <div className="challenge">
      <img src={avatarimg.adventure} alt="" className="challenge_avt" />

      <div className="question">
        <div id="capital">
          <p>{country.capital} is the capital of</p>
        </div>

        <div id="flag">
          <img src={country.flag} alt="" />
          <p>Which country does this flag belong to?</p>
        </div>
      </div>

      <div className="options">
        <p className="option1" onClick={markWrong1}>
          <span>A</span>
          <span>{option1}</span>
          <i className="far fa-times-circle"></i>
        </p>
        <p className="option2" onClick={markWrong2}>
          <span>B</span>
          <span>{option2}</span>
          <i className="far fa-times-circle"></i>
        </p>
        <p className="option3" onClick={markCorrect}>
          <span>C</span>
          <span>{country.name}</span>
          <i className="far fa-check-circle" id="check"></i>
        </p>
        <p className="option4" onClick={markWrong4}>
          <span>D</span>
          <span>{option3}</span>
          <i className="far fa-times-circle"></i>
        </p>
      </div>

      <button className="next" onClick={getAnotherCountry}>
        next
      </button>

      <Link to="/results" className="see_res" style={{ display: "none" }}>
        next
      </Link>
    </div>
  );
}

export default Challenge;
