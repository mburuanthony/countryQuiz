import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { CountryProvider, useCountry } from "./context/countriesContext";
import { OptionsProvider, useOptions } from "./context/optionsContext";
import { ResultsProvider } from "./context/resultsContext";

import Challenge from "./Components/Challenge";
import Results from "./Components/Results";

import "./Assets/Styles/App.css";
import adventure from "./Assets/Images/undraw_adventure_4hum1.svg";

function App() {
  const { setCountry, fetchAnotherCountry } = useCountry();
  const { setOption1, setOption2, setOption3 } = useOptions();

  const random1 = Math.floor(Math.random() * 250);
  const random2 = Math.floor(Math.random() * 250);
  const random3 = Math.floor(Math.random() * 250);

  useEffect(() => {
    const Xhr = new XMLHttpRequest();
    Xhr.open("GET", "https://restcountries.com/v2/all");
    Xhr.onload = function () {
      const data = JSON.parse(this.response);
      const randomNumber = Math.floor(Math.random() * data.length);
      const Country = data[randomNumber];
      setCountry(Country);
      setOption1(data[random3].name);
      setOption2(data[random2].name);
      setOption3(data[random1].name);
    };
    Xhr.send();
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
            <Route
              path="/"
              exact
              component={Challenge}
              setOption1={setOption1}
              setOption2={setOption2}
              setOption3={setOption3}
            />
            <Route path="/results" component={Results} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

function AppProvider() {
  return (
    <CountryProvider>
      <OptionsProvider>
        <ResultsProvider>
          <App />
        </ResultsProvider>
      </OptionsProvider>
    </CountryProvider>
  );
}

export default AppProvider;
