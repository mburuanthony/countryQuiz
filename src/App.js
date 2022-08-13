import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { OptionsProvider, useOptions } from "./context/optionsContext";
import { ResultsProvider } from "./context/resultsContext";

import Challenge from "./Components/Challenge";
import Results from "./Components/Results";

import "./Assets/Styles/App.css";
import adventure from "./Assets/Images/undraw_adventure_4hum1.svg";

function App() {
  const {
    setOption1,
    setOption2,
    setOption3,
    setCountry,
    fetchAnotherCountry,
  } = useOptions();

  useEffect(() => {
    const Xhr = new XMLHttpRequest();
    Xhr.open("GET", "https://restcountries.com/v2/all");
    Xhr.onload = function () {
      const res = JSON.parse(this.response);
      localStorage.setItem("countries", JSON.stringify(res));
    };
    Xhr.send();
  }, []);

  const data = JSON.parse(localStorage.getItem("countries"));

  useEffect(() => {
    const random1 = Math.floor(Math.random() * data.length);
    const random2 = Math.floor(Math.random() * data.length);
    const random3 = Math.floor(Math.random() * data.length);
    const random4 = Math.floor(Math.random() * data.length);

    const Country = data[random4];
    setCountry(Country);
    setOption1(data[random3]?.name);
    setOption2(data[random2]?.name);
    setOption3(data[random1]?.name);
  }, [fetchAnotherCountry]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="intro">
          <h3>Country quiz</h3>
          <img src={adventure} alt="avatar" className="challenge_avt" />
        </div>

        <Router>
          <Switch>
            <Route path="/" exact component={Challenge} />
            <Route path="/results" component={Results} />
          </Switch>
        </Router>
      </div>
      <p id="copy">
        &copy; &nbsp;<span id="year">{new Date().getUTCFullYear()}</span> &nbsp;
        <a
          href="https://mburuanthony.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          Antony Mburu
        </a>
      </p>
    </div>
  );
}

function AppProvider() {
  return (
    <OptionsProvider>
      <ResultsProvider>
        <App />
      </ResultsProvider>
    </OptionsProvider>
  );
}

export default AppProvider;
