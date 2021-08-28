import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Header from "./ui/Header";
import React from "react";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./components/UserDashboard";

function App() {
  const [value, setValue] = React.useState(0);
  return (
    <BrowserRouter>
      <Header value={value} setValue={setValue} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/signin"
          render={(props) => <Signin {...props} setValue={setValue} />}
        />
        <Route
          path="/signup"
          render={(props) => <Signup {...props} setValue={setValue} />}
        />
        <PrivateRoute path="/user/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
