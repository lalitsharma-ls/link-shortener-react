import React from "react";
import Nav from "./Nav.js";
import Info from "./Info.js";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";

function App(){
    return(
          <Router>
            <div>
              <Nav/>
              <Switch>
                <Route />
              </Switch>
            </div>
          </Router>
    );
}

export default App;