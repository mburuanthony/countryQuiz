import React, { useContext, useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { avatarContext } from "./context/avatarContext";
import { countriesContext } from "./context/countriesContext";
import { resultsContext } from "./context/resultsContext";
import { optionsContext } from "./context/optionsContext";

import Challenge from "./Components/Challenge";
import Results from "./Components/Results";

import "./Assets/Styles/App.css";

function App() {
  const avatars = useContext(avatarContext);

  const [country, setCountry] = useState(null);
  const [result, setResult] = useState(0);

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const random1 = Math.floor(Math.random() * 250);
  const random2 = Math.floor(Math.random() * 250);
  const random3 = Math.floor(Math.random() * 250);

  useEffect(() => {
    const Xhr = new XMLHttpRequest();
    Xhr.open("GET", "https://restcountries.com/v2/all", true);
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
  }, []);

  return (
    <avatarContext.Provider value={avatars}>
      <countriesContext.Provider value={[country, setCountry]}>
        <optionsContext.Provider
          value={[
            option1,
            option2,
            option3,
            setOption1,
            setOption2,
            setOption3,
          ]}
        >
          <resultsContext.Provider value={[result, setResult]}>
            <div className="App">
              <div className="wrapper">
                <div className="intro">
                  <h3>Country quiz</h3>
                  <img
                    src={avatars.adventure}
                    alt="avatar"
                    className="challenge_avt"
                  />
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
          </resultsContext.Provider>
        </optionsContext.Provider>
      </countriesContext.Provider>
    </avatarContext.Provider>
  );
}

export default App;
