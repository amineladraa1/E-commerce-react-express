import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Header from "./ui/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
