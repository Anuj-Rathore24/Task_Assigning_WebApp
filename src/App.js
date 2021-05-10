import "./App.css";
import Home from "./Mycomponents/home.js"
import About from "./Mycomponents/About.js"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Switch>
      <Route path="/About">
        <About />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
