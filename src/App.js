import "./App.css";
import SignUp from "./Mycomponents/Sign_Up.js";
import About from "./Mycomponents/About.js";
import Login from "./Mycomponents/Login.js";
import Home from "./Mycomponents/home.js";
import HomeS from "./Mycomponents/HomeS.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

 function App() {
  return (
    <Router>
      <Switch>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/HomeS">
          <HomeS />
        </Route>
        <Route path="/">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
